import React, { useEffect, useState } from "react";
import { Image, ImageBackground, Text, View, TouchableOpacity, Alert, TextInput, KeyboardAvoidingView, Platform, Keyboard, FlatList, Animated, StyleSheet } from "react-native";
import { images, icons, fontSizes, colors } from "../../theme";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { UIButton, UIHeader } from '../../component';
import FriendItems from "./FriendItems";
import AddFriendItems from "./AddFriendItems";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SwipeListView } from "react-native-swipe-list-view";
import {
    auth,
    firebaseDatabase,
    createUserWithEmailAndPassword,
    firebaseDatabaseRef,
    firebaseDatabaseSet,
    sendEmailVerification,
    child,
    get, onValue
} from "../../firebase/firebase";

const Friend_List = "Friend_List";
const Add_Friends = "Add_Friends";


function Friends(props) {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(Friend_List);
    const [friendships, setFriendships] = useState();

    useEffect(() => {
        onValue(firebaseDatabaseRef(firebaseDatabase, 'users'), async snapshot => {
            if (snapshot.exists()) {

                let snapshotObject = snapshot.val();
                let stringUser = await AsyncStorage.getItem('user');
                let myUserId = JSON.parse(stringUser).uid;

                setUsers(Object.keys(snapshotObject)
                    .filter(eachKey => eachKey != myUserId).map((eachKey) => {
                        let eachObject = snapshotObject[eachKey]
                        return {
                            //default profile url
                            url: 'https://randomuser.me/api/portraits/men/80.jpg',
                            name: eachObject.email,
                            email: eachObject.email,
                            accessToken: eachObject.accessToken,
                            numberUnreadMessages: 0,
                            userId: eachKey
                        }
                    }))

            }
        })

        onValue(firebaseDatabaseRef(firebaseDatabase, 'friendships'), async (friendshipSnapshot) => {
            if (friendshipSnapshot.exists()) {

                let snapshotObject = friendshipSnapshot.val();

                const friendStatus = Object.keys(snapshotObject)
                    .map((eachKey) => {
                        let eachObject = snapshotObject[eachKey];
                        return {
                            userReceiver: eachObject.userReceiver,
                            userSender: eachObject.userSender,
                            status: eachObject.status,
                        };
                    });
                setFriendships(friendStatus);
            }
        });
    }, [])

    const { navigation, route } = props
    //function of navigate to/back
    const { navigate, goBack } = navigation
    return <View style={{ backgroundColor: 'white' }}>
        <UIHeader
            title="Friends"
            leftIcon="chevron-left"
            onPressLeft={() => {
                props.navigation.goBack()
            }}
        />
        <TitleComponent page={page} setPage={setPage} />

        {page === "Friend_List" ? <List_FriendComponent users={users} setUsers={setUsers} navigation={navigation} friendShips={friendships} /> : null}
        {page === "Add_Friends" ? <Add_FriendsComponent users={users} setUsers={setUsers} friendShips={friendships} setFriendships={setFriendships} /> : null}



    </View>;
}

export default Friends;

const TitleComponent = ({ page, setPage }) => {
    return <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    }}>
        <TouchableOpacity style={{ width: "50%", justifyContent: "center", alignItems: "center" }}
            onPress={() => {
                setPage(Friend_List);
            }}
        >
            <Text style={{ color: "black" }}>Danh sách bạn</Text>
            {page === "Friend_List" ? <View style={{ width: "100%", height: 3, backgroundColor: colors.primary, borderRadius: 5, marginTop: 8 }} /> : null}
        </TouchableOpacity>
        <TouchableOpacity style={{ width: "50%", justifyContent: "center", alignItems: "center" }}
            onPress={() => {
                setPage(Add_Friends);
            }}
        >
            <Text style={{ color: "black" }}>Thêm bạn mới</Text>
            {page === "Add_Friends" ? <View style={{ width: "100%", height: 3, backgroundColor: colors.primary, borderRadius: 5, marginTop: 8 }} /> : null}
        </TouchableOpacity>

    </View>
}

const Add_FriendsComponent = ({ users, setUsers, friendShips, setFriendships }) => {


    const handleAddFriend = async (myFriendUserId) => {
        let stringUser = await AsyncStorage.getItem("user");
        let myUserId = JSON.parse(stringUser).uid;

        let timestamp = new Date().getTime();

        let newFriendShip = {
            userSender: myUserId,
            userReceiver: myFriendUserId,
            status: "pending",
            timestamp: timestamp,
        };
        let messagePath = `friendships/${myUserId}-${myFriendUserId}`;
        firebaseDatabaseSet(
            firebaseDatabaseRef(firebaseDatabase, messagePath),
            newFriendShip
        );
    }

    const handleUnFriend = async (userId,myFriendUserId) => {
        const chatRef = firebaseDatabaseRef(firebaseDatabase, 'friendships');
        const friendSnapshot = await get(child(chatRef, `${userId}-${myFriendUserId}`));

        if (friendSnapshot.exists()) {

            const friendShipData = friendSnapshot.val();
            friendShipData.status = "friend";

            await firebaseDatabaseSet(child(chatRef, `${userId}-${myFriendUserId}`), friendShipData);
            setFriendships("pending");
        }


       

    };

    const friendshipStatus = async (myFriendUserId) => {
       
       
        if (!friendShips) {
            return "pending";
        }    
        const friendStatus =  friendShips.find((friendship) => {
            return (
                (friendship.userSender === myFriendUserId && friendship.status === "friend") ||
                (friendship.userReceiver === myFriendUserId && friendship.status === "friend")

            );
        });   
        return friendStatus ? "friend" : "pending";  
       
    };

    const calculateFriendStatuses = async (users, friendShips) => {
        const friendStatuses = {};
        for (const user of users) {
            friendStatuses[user.userId] = await friendshipStatus(user.userId, friendShips);
        }
        return friendStatuses;
    }
    
    const [userFriendStatuses, setUserFriendStatuses] = useState({});
    
    useEffect(() => {
        if (users && friendShips) {
            calculateFriendStatuses(users, friendShips).then((statuses) => {
                setUserFriendStatuses(statuses);
            });
        }
    }, [users, friendShips]);

    return <View>

        <FlatList
            style={{}}
            data={users}
            renderItem={({ item }) => {   
                          
                const friendStatus = userFriendStatuses[item.userId];
                return (
                    <AddFriendItems
                        onPressAdd={() => handleAddFriend(item.userId)}
                        onPressDelete={() => handleUnFriend(auth.currentUser.uid,item.userId)}
                        user={item}
                        friendshipStatus={friendStatus}
                        key={item.name}
                    />
                );
               
                
            }}
        />
    </View>
}

const List_FriendComponent = ({ users, setUsers, navigation, friendShips }) => {

    const friendshipStatus = (myUserId, friendShips) => {
        if (!Array.isArray(friendShips)) {
            return "pending";
        }
    
        const friendship = friendShips.find((friendship) => {
            return (
                (friendship.userSender === myUserId && friendship.status === "friend") ||
                (friendship.userReceiver === myUserId && friendship.status === "friend")
            );
        });
    
        return friendship ? "friend" : "pending";
    };


    const friendUsers = users.filter((users) => {
        const status = friendshipStatus(users.userId, friendShips);
        return status === 'friend';
    });

    return <View>
        <FlatList
            style={{
            }}
            data={friendUsers}
            renderItem={({ item }) => <FriendItems
                onPress={() => {
                    navigation.navigate('Messenger', { users: item })
                }}
                user={item}
                key={item.name}
            />}
        />
    </View>
}
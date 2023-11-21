import React, { useEffect, useState } from "react";
import { useRecoilValue } from 'recoil';
import { Image, ImageBackground, Text, View, TouchableOpacity, Alert, TextInput, KeyboardAvoidingView, Platform, Keyboard, FlatList, Animated, StyleSheet } from "react-native";
import { images, icons, fontSizes, colors } from "../../theme";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { UIButton, UIHeader } from '../../component';
import ChatItem from './ChatItems';
import Friends from "../Friends/FriendScreen";
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
import { backgroundColorState } from './../../recoid/index';

function ChatScreens(props) {
    const [users, setUsers] = useState([]);
    const [chatToHide, setChatToHide] = useState(null);
    const [isDelete, setIsDelete] = useState(false);
    const [chatUsers, setChatUsers] = useState([]);
    const [chatHistory, setChatHistory] = useState([]);
    const [searchText, setSearchText] = useState('');

    const backgroundColor = useRecoilValue(backgroundColorState);

    //get last message
    // const getLastMessage = async (myUserId, otherUserId) => {
    //     debugger
    //     const snapshot = await get(child(firebaseDatabaseRef(firebaseDatabase, 'messages')));
    //     if (snapshot.exists()) {
    //         const snapshotObject = snapshot.val();
    //         const messages = Object.keys(snapshotObject)
    //             .fill(item => item.includes(myUserId) && item.includes(otherUserId))
    //             .sort((item1, item2) => item1.timestamp - item2.timestamp);
    //         const lastMessageKey = messages.length > 0 ? messages[messages.length - 1] : null;
    //         return snapshotObject[lastMessageKey];
    //     } else {
    //         console.log('No data in messages node');
    //         return null;
    //     }
    //     debugger
    // };

    const fillterList = (text) => chatUsers.filter(eachUsers => eachUsers.name.toLowerCase().includes(searchText.toLowerCase()))
    useEffect(() => {
        async function fetchData() {
            const stringUser = await AsyncStorage.getItem('user');
            const myUserId = JSON.parse(stringUser).uid;
    
            onValue(firebaseDatabaseRef(firebaseDatabase, 'chat'), async (chatSnapshot) => {
               
                if (chatSnapshot.exists()) {
                    const chatData = chatSnapshot.val();
                    const chatUsersArray = [];
                    const lastMessage = [];
                    
                    for (const chatKey in chatData) {
                        if (chatKey.includes(myUserId)) {
                            const chatInfo = chatData[chatKey];
                            const chatKeyParts = chatKey.split('-');
                            const otherUserId = chatKeyParts.find(userId => userId !== myUserId);

                            
                           
                            if (!chatInfo.isHidden) {
                                const userSnapshot = await get(child(firebaseDatabaseRef(firebaseDatabase, 'users'), otherUserId));
                                if (userSnapshot.exists()) {
                                    const userObject = userSnapshot.val();
                                    chatUsersArray.push({
                                        url: 'https://randomuser.me/api/portraits/men/50.jpg',
                                        name: userObject.email,
                                        email: userObject.email,
                                        accessToken: userObject.accessToken,
                                        numberUnreadMessages: 0,
                                        userId: otherUserId,
                                        lastMessage: chatInfo.lastMessage,
                                    });
                                   
                                }
                               
                               
                            }   
                            
                        }
                    }   
                    setChatUsers(chatUsersArray);
                    
                }
                
            });
        }
    
        fetchData();
    }, [isDelete]);
    

    const { navigation, route } = props
    const { navigate, goBack } = navigation


    const hideChat = async (fromUserId, toUserId) => {

        const chatRef = firebaseDatabaseRef(firebaseDatabase, 'chat');
        const chatSnapshot = await get(child(chatRef, `${fromUserId}-${toUserId}`));

        if (chatSnapshot.exists()) {

            const chatData = chatSnapshot.val();
            chatData.isHidden = true;

            await firebaseDatabaseSet(child(chatRef, `${fromUserId}-${toUserId}`), chatData);
            setIsDelete(false);
        }

    };

    return (
        <View style={{ backgroundColor: backgroundColor, flex: 1 }}>
            <UIHeader
                title="Notifications"
                leftIcon="chevron-left"
                rightIcon="address-book"
                onPressLeft={() => {
                    props.navigation.goBack()
                }}
                onPressRight={() => {
                    props.navigation.navigate('Friends')
                }}
            />


            <View style={{ height: 60, flexDirection: 'row' }}>
                <Icon name="search"
                    size={18}
                    color='black'
                    style={{ position: 'absolute', marginHorizontal: 10, justifyContent: 'center', alignSelf: 'center', marginLeft: 20 }}
                />
                <TextInput
                    autoCorrect={false}
                    placeholder="Search"
                    onChangeText={text =>
                        setSearchText(text)
                    }
                    style={{
                        backgroundColor: colors.grey,
                        marginHorizontal: 10,
                        height: 40,
                        marginVertical: 10,
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 5,
                        paddingStart: 39,
                        opacity: 0.8,


                    }} />

            </View>

            {fillterList().length > 0 ? <FlatList
                style={{ flex: 1 }}
                data={fillterList()}
                renderItem={({ item }) => (
                    <ChatItem
                        onPress={() => {
                            navigate('Messenger', { users: item })
                        }}
                        onLongPress={() => {
                            Alert.alert(
                                "Thông báo!",
                                "Bạn có muốn xóa đoạn tin nhắn này?",
                                [
                                    {
                                        text: 'Cancel',
                                        onPress: () => null,
                                        style: 'cancel',
                                    },
                                    {
                                        text: 'Có',
                                        onPress: () => {

                                            setChatToHide(item);
                                            setIsDelete(true);
                                            hideChat(auth.currentUser.uid, item.userId);
                                        },
                                    }
                                ]
                            )
                        }}
                        user={item}
                        key={item.name}
                    />
                )}
            /> : <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text style={{ color: 'black', fontSize: fontSizes.h2 }}>Not found</Text>
            </View>}
        </View>
    );
}

export default ChatScreens;

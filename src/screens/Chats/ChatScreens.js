import React, { useEffect, useState } from "react";
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

function ChatScreens(props) {
    const [users, setUsers] = useState([]);
    const [chatToHide, setChatToHide] = useState(null);
    const [isDelete, setIsDelete] = useState(false);
    const [chatUsers, setChatUsers] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const stringUser = await AsyncStorage.getItem('user');
            const myUserId = JSON.parse(stringUser).uid;

            onValue(firebaseDatabaseRef(firebaseDatabase, 'chat'), chatSnapshot => {

                if (chatSnapshot.exists()) {
                    const chatData = chatSnapshot.val();
                    const chatUsersArray = [];

                    for (const chatKey in chatData) {
                        if (chatKey.includes(myUserId)) { 
                            const chatInfo = chatData[chatKey];
                            const chatKeyParts = chatKey.split('-');
                            const otherUserId = chatKeyParts.filter(userId => userId !== myUserId)[0];


                           
                            if (!chatInfo.isHidden) {
                                onValue(firebaseDatabaseRef(firebaseDatabase, `users/${otherUserId}`), userSnapshot => {
                                    
                                    if (userSnapshot.exists()) {
                                        const userObject = userSnapshot.val();
                                        chatUsersArray.push({
                                            url: 'https://randomuser.me/api/portraits/men/80.jpg',
                                            name: userObject.email,
                                            email: userObject.email,
                                            accessToken: userObject.accessToken,
                                            numberUnreadMessages: 0,
                                            userId: otherUserId,
                                        });
                                    }
                                    
                                });
                            }
                            

                        }
                    }

                    setChatUsers(chatUsersArray);
                }

            });
        }
        fetchData();
    }, []);


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
        <View style={{ backgroundColor: 'white', flex: 1 }}>
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

            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginStart: 10,
                marginTop: 15
            }}>
                <Text style={{
                    color: 'black',
                    fontSize: fontSizes.h5,
                    paddingStart: 10
                }}> 6 unread message </Text>
                <Icon
                    name={"search"}
                    size={20} color="black"
                    style={{ marginRight: 15 }}
                    onPress={() => {
                        alert('hello')
                    }}
                />
            </View>

            <FlatList

                style={{ flex: 1 }}
                data={chatUsers}
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
            />
        </View>
    );
}

export default ChatScreens;

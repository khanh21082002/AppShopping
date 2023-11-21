
import React, { useEffect, useState, useRef } from "react";
import { useRecoilValue } from 'recoil';
import { Image, ImageBackground, Text, View, TouchableOpacity, Alert, TextInput, KeyboardAvoidingView, Platform, Keyboard, FlatList, Modal, Button } from "react-native";
import { images, icons, fontSizes, colors } from "../../theme";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { UIButton, UIHeader } from '../../component';
import MessengerItems from "./MessengerItems";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    auth,
    firebaseDatabase,
    createUserWithEmailAndPassword,
    firebaseDatabaseRef,
    firebaseDatabaseSet,
    sendEmailVerification,
    child,
    get, onValue, remove,

} from "../../firebase/firebase";
import { set } from "firebase/database";

import { backgroundColorState, textColorState } from './../../recoid/index';


function MessengerScreen(props) {

    const flatListRef = useRef(null);

    const scrollToBottom = () => {
        if (flatListRef.current) {
            flatListRef.current.scrollToEnd({ animated: true });
        }
    };

    const [typedText, setTypedText] = useState('');

    const [chatHistory, setChatHistory] = useState([]);

    const [showDialog, setShowDialog] = useState(false);

    const [selectedChat, setSelectedChat] = useState("");

    const [isHidden, setIsHidden] = useState(false);

    const backgroundColor = useRecoilValue(backgroundColorState);
    const textColor = useRecoilValue(textColorState);

    useEffect(() => {
        onValue(firebaseDatabaseRef(firebaseDatabase, 'messages'), async snapshot => {
            if (snapshot.exists()) {
                let snapshotObject = snapshot.val();
                let stringUser = await AsyncStorage.getItem('user');
                let myUserId = JSON.parse(stringUser).uid;
                let myFriendUserId = props.route.params.users.userId;
                let updatedChatHistory = Object.keys(snapshotObject).filter(item => item.includes(myUserId) && item.includes(myFriendUserId))
                    .map(eachKey => {
                        let eachObject = snapshotObject[eachKey]
                        return {
                            ...eachObject,
                            isSender: eachKey.split('-')[0] == myFriendUserId,
                            url: 'https://randomuser.me/api/portraits/men/70.jpg',

                        }
                    })
                    .sort((item1, item2) => {
                        return item1.timetamp - item2.timetamp
                    })
                for (let i = 0; i < updatedChatHistory.length; i++) {
                    let item = updatedChatHistory[i];

                    item.showUrl = (i == 0) ? true : (item.isSender != updatedChatHistory[i - 1].isSender)

                }
                setChatHistory(updatedChatHistory);

            } else {
                console.log('no data')
            }

        })
    }, [])



    const { url, name, userId } = props.route.params.users;

    //delete message
    const handleDeleteMessage = async (message) => {

        let newKeyMessenger = message.timetamp;
        let stringUser = await AsyncStorage.getItem('user');
        let myUserId = JSON.parse(stringUser).uid;
        let myFriendUserId = props.route.params.users.userId;
        const messagePath = `messages/${myUserId}-${myFriendUserId}-${newKeyMessenger}`;

        remove(firebaseDatabaseRef(firebaseDatabase, messagePath))
            .then(() => {
                console.log('Successfully deleted message');
            })
            .catch((error) => {
                console.log('Error deleting message', error);
            });

    };


    return <View style={{ backgroundColor: backgroundColor, flex: 1 }}>
        <UIHeader
            title={name}
            leftIcon="chevron-left"
            rightIcon="ellipsis-v"
            onPressLeft={() => {
                props.navigation.goBack()
            }}
            onPressRight={() => {
            }}
        />


        <FlatList
            ref={flatListRef}
            style={{
                flex: 1,
            }}
            data={chatHistory}
            renderItem={({ item }) => <MessengerItems
                onPress={async () => {
                    setSelectedChat(item)
                    setShowDialog(true)
                }}
                onDelete={handleDeleteMessage}
                item={item}
                key={`${item.timetamp}`}

            />}


        />


        <View style={{
            backgroundColor: colors.grey,
            height: 40,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: 10,
            marginBottom: 5,

        }}>
            <TextInput

                onChangeText={(typedText) => {
                    setTypedText(typedText);
                }}
                style={{
                    color: colors.black,
                    paddingStart: 10,
                }}

                placeholder="Enter your message here"
                value={typedText}
                placeholderTextColor={colors.placehoder}
            />


            <TouchableOpacity
                onPress={async () => {
                    if (typedText.trim().length == 0) {
                        return;
                    };
                    let stringUser = await AsyncStorage.getItem('user');
                    let myUserId = JSON.parse(stringUser).uid;
                    let myFriendUserId = props.route.params.users.userId;
                    let newKeyMessenger = new Date().getTime();
                    //save data to firebase
                    let newMessengerObject = {
                        //fake
                        url: 'https://randomuser.me/api/portraits/men/70.jpg',
                        showUrl: false,
                        messenger: typedText,
                        timetamp: newKeyMessenger,
                        userReceiver: myFriendUserId
                    };

                    let newChatObject = {
                        isHidden: false,
                        userSender: myUserId,
                        userReceiver: myFriendUserId,
                        lastMessage: typedText,
                        timetamp: newKeyMessenger
                    }
                    scrollToBottom();
                    Keyboard.dismiss();


                    let messagePath = `messages/${myUserId}-${myFriendUserId}-${newKeyMessenger}`;
                    let chatPath = `chat/${myUserId}-${myFriendUserId}`;

                    // Lưu tin nhắn vào Firebase tại đường dẫn đã xác định
                    firebaseDatabaseSet(
                        firebaseDatabaseRef(firebaseDatabase, messagePath),
                        newMessengerObject
                    ).then(() => {
                        setTypedText('');
                    })

                    // Lưu chat
                    firebaseDatabaseSet(
                        firebaseDatabaseRef(firebaseDatabase, chatPath),
                        newChatObject
                    );

                }}>

                <Icon
                    name="paper-plane"
                    style={{
                        padding: 10,
                    }}
                    size={20}
                    color={colors.primary}

                />
            </TouchableOpacity>
            <Modal
                transparent={true}
                animationType="slide"
                visible={showDialog}

            >
                <View
                    style={{
                        alignSelf: 'center', margin: 20, padding: 20, marginTop: 250,
                        backgroundColor: 'white', borderRadius: 20, width: '90%',
                        alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.25, shadowRadius: 4, elevation: 5
                    }}
                >
                    <Text style={{ color: 'black', fontSize: fontSizes.h4, fontWeight: 'bold' }}>Bạn có muốn xóa tin nhắn này?</Text>
                    <TouchableOpacity
                        style={{ margin: 10, padding: 10 }}
                        onPress={() => {
                            setShowDialog(false);
                            handleDeleteMessage(selectedChat);
                        }}
                    >
                        <Text style={{ color: 'black', fontSize: fontSizes.h4 }}>
                            Xóa
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ margin: 10, padding: 10 }} onPress={() => setShowDialog(false)} >
                        <Text style={{ color: 'black', fontSize: fontSizes.h4 }}>Hủy</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>


    </View>
}

export default MessengerScreen
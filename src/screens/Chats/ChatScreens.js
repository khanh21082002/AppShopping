
import React, { useEffect, useState } from "react";
import { Image, ImageBackground, Text, View, TouchableOpacity, Alert, TextInput, KeyboardAvoidingView, Platform, Keyboard, FlatList } from "react-native";
import { images, icons, fontSizes, colors } from "../../theme";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { UIButton, UIHeader } from '../../component';
import  ChatItem  from './ChatItems';

function ChatScreens(props) {
    const [users, setUsers] = useState([
        {
            url: 'https://randomuser.me/api/portraits/men/70.jpg',
            name: 'John Doe',
            message: 'Hello',
            numberUnreadMessages: 3,
        },
        {
            url: 'https://randomuser.me/api/portraits/men/30.jpg',
            name: 'Nguyen Van X',
            message: 'Hello',
            numberUnreadMessages: 2,
        },
        {
            url: 'https://randomuser.me/api/portraits/men/40.jpg',
            name: 'Nguyen Van C',
            message: 'Hello',
            numberUnreadMessages: 10,
        },
        {
            url: 'https://randomuser.me/api/portraits/men/50.jpg',
            name: 'Nguyen Van A',
            message: 'Hello',
            numberUnreadMessages: 0,
        },
        {
            url: 'https://randomuser.me/api/portraits/men/80.jpg',
            name: 'Nguyen Van B',
            message: 'Hello',
            numberUnreadMessages: 0,
        },
        {
            url: 'https://randomuser.me/api/portraits/men/80.jpg',
            name: 'Nguyen Van E',
            message: 'Hello',
            numberUnreadMessages: 100,
        },
    ])

    const {navigation , route} = props
    //function of navigate to/back
    const{navigate, goBack} = navigation
    return <View style={{ backgroundColor: 'white', flex: 1 }}>
        <UIHeader
            title="Notifications"
            leftIcon="chevron-left"
            rightIcon="search"
            onPressLeft={() => {
                props.navigation.goBack()
            }}
            onPressRight={() => {

            }}
        />

        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginStart: 10,
            marginTop:15
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
            style={{
                flex: 1,
                
                              
            }}
            data={users}
            renderItem={({ item }) => <ChatItem
                onPress={() => {
                    navigate('Messenger', {users : item})
                }}
                user={item}
                key={item.name}
            />}
        />
    </View>
}

export default ChatScreens
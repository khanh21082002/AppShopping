
import React, { useEffect, useState } from "react";
import { Image, ImageBackground, Text, View, TouchableOpacity, Alert, TextInput, KeyboardAvoidingView, Platform, Keyboard, FlatList } from "react-native";
import { images, icons, fontSizes, colors } from "../../theme";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { UIButton, UIHeader } from '../../component';
import MessengerItems from "./MessengerItems";

function MessengerScreen(props) {
    const [chatHistory, setChatHistory] = useState([
        {
            url: 'https://randomuser.me/api/portraits/men/70.jpg',
            isSender: true,
            timetamp: 1696221440000,
            messenger: 'hello'
        },
        {
            url: 'https://randomuser.me/api/portraits/men/70.jpg',
            isSender: true,
            timetamp: 1696221560000,
            messenger: 'How are you?'
        },
        {
            url: 'https://randomuser.me/api/portraits/men/70.jpg',
            isSender: true,
            timetamp: 1696221620000,
            messenger: 'How about your work? asdkjaldnaskjdnaskjdnakdnaldasjdabssssssssssssssssssssssssss dlasdnkja'
        },
        {
            url: 'https://randomuser.me/api/portraits/men/50.jpg',
            isSender: false,
            timetamp: 1696221620000,
            messenger: 'Yes'
        },
        {
            url: 'https://randomuser.me/api/portraits/men/50.jpg',
            isSender: false,
            timetamp: 1696221680000,
            messenger: 'I am fine.'
        },
        {         
            url: 'https://randomuser.me/api/portraits/men/70.jpg',
            isSender: true,
            timetamp: 1696221720000,
            messenger: "Let's go for a walk"
        },

        

    ]);
    const { url, name } = props.route.params.users;
    return <View style={{ backgroundColor: 'white', flex: 1 }}>
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
            style={{
                flex: 1,


            }}
            data={chatHistory}
            renderItem={({ item }) => <MessengerItems

                item={item}
                key={`${item.timetamp}`}
            />}
        />
    </View>
}

export default MessengerScreen
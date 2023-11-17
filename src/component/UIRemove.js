import React, { useState } from "react";
import { Image, ImageBackground, Text, View, TouchableOpacity, Alert, Touchable } from "react-native";
import { images, icons, fontSizes, colors } from "../theme";
import Icon from 'react-native-vector-icons/FontAwesome';


function UIRemove(props) {
    const { nameIcon1, title, text = '', nameIcon2 = '' , onPress } = props
    return <View style={{
        flexDirection: 'row',
        paddingVertical: 10,
        alignItems: 'center',
    }}>
        <Icon
            name={nameIcon1}
            style={{
                marginStart: 10
            }}
            size={25}
            color="black"
        />
        <Text style={{
            color: "black",
            fontSize: fontSizes.h3,
            marginStart: 10
        }}>{title}</Text>

        <View style={{ flex: 1 }} />

        <Text style={{
            color: "back",
            fontSize: fontSizes.h3,
            marginEnd: 10,
            opacity: 0.6
        }}>{text}</Text>
        <TouchableOpacity  
            onPress={onPress}
        >
            <Icon
                name={nameIcon2}
                style={{
                    marginEnd: 10,
                    opacity: 0.6
                }}
                size={20}
                color="black"

            />
        </TouchableOpacity>
    </View>
}

export default UIRemove
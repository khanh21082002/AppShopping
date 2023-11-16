import React, { useState } from "react";
import { Image, ImageBackground, Text, View, TouchableOpacity, Alert, Touchable } from "react-native";
import { images, icons, fontSizes, colors } from "../theme";
import Icon from 'react-native-vector-icons/FontAwesome';


function UIHeader(props) {
    const { title,
        leftIcon = '',
        rightIcon = '',
        onPressLeft,
        onPressRight ,
        data } = props
    return <View style={{
        height: 70,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }}>
        <TouchableOpacity onPress={onPressLeft}>
            <Icon name={leftIcon} size={20} color="white" style={{ marginLeft: 15 }} />
        </TouchableOpacity>
        <Text style={{
            color: 'white',
            fontSize: fontSizes.h1
        }}>{title}</Text>
        <TouchableOpacity onPress={onPressRight}>
            <Icon name={rightIcon} size={20} color="white" style={{ marginRight: 15 }} />           
        </TouchableOpacity>
    </View>
}

export default UIHeader


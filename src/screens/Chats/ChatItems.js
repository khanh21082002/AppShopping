
import React, { useEffect, useState } from "react";
import { useRecoilValue } from 'recoil';
import { Image, ImageBackground, Text, View, TouchableOpacity, Alert, TextInput, KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import { images, icons, fontSizes, colors } from "../../theme";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { UIButton } from '../../component';
import { backgroundColorState , textColorState } from './../../recoid/index';


// function _getColorFromStatus(status) {
//     return status.toLowerCase().trim() === "opening soon" ? colors.openingSoon :
//         status.toLowerCase().trim() === "opening now" ? colors.openingNow :
//             status.toLowerCase().trim() === "closing soon" ? colors.cloingSoon : colors.openingSoon


// }

function ChatItems(props) {
    let { name,
        url,
        lastMessage,
        numberUnreadMessages,
        key,
    } = props.user
    const { onPress, onLongPress } = props
    const backgroundColor = useRecoilValue(backgroundColorState);
    const textColor = useRecoilValue(textColorState);

    return <View style={{
        backgroundColor: backgroundColor,
        margin: 5,
        borderRadius: 5,
        height: 80,
        justifyContent: 'center',
    }}>
        <TouchableOpacity
            onPress={onPress}
            onLongPress={onLongPress}
        >
            <View style={{
                height: 100,
                paddingTop: 20,
                paddingStart: 10,
                flexDirection: 'row',
                marginTop: 10,

            }}>
                <View >
                    <Image
                        style={{
                            width: 50,
                            height: 50,
                            resizeMode: 'cover',
                            borderRadius: 25,
                            marginRight: 15,
                            marginStart: 10
                        }}
                        source={{
                            uri: url
                        }}
                    />
                    {numberUnreadMessages > 0 && <Text style={{
                        backgroundColor: 'red',
                        position: 'absolute',
                        right: 5,
                        height: 20,
                        width: 20,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: numberUnreadMessages > 9 ? 2 : 4,
                        fontSize: fontSizes.h6,
                        color: 'white',

                    }}>

                        {numberUnreadMessages}
                    </Text>}
                </View>

                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',

                }}>
                    <View style={{
                        flexDirection: 'column',
                        marginBottom: 30,


                    }}>

                        <Text style={{
                            color: textColor,
                            fontSize: fontSizes.h5,
                            fontWeight: 'bold'
                        }}>{name}</Text>

                        <Text style={{
                            color: textColor,
                            fontSize: fontSizes.h5,
                        }}>{lastMessage}</Text>
                    </View>
                    <View style={{ marginBottom: 30 }}>
                        <Text style={{
                            color: textColor,
                            fontSize: fontSizes.h6,
                            marginRight: 8

                        }}> 5 minutes agos</Text>
                    </View>

                </View>

            </View>
        </TouchableOpacity>
    </View>

}
export default ChatItems

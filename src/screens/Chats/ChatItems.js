
import React, { useEffect, useState } from "react";
import { Image, ImageBackground, Text, View, TouchableOpacity, Alert, TextInput, KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import { images, icons, fontSizes, colors } from "../../theme";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { UIButton } from '../../component';

// function _getColorFromStatus(status) {
//     return status.toLowerCase().trim() === "opening soon" ? colors.openingSoon :
//         status.toLowerCase().trim() === "opening now" ? colors.openingNow :
//             status.toLowerCase().trim() === "closing soon" ? colors.cloingSoon : colors.openingSoon


// }

function ChatItems(props) {
    let { name,
        url,
        message,
        numberUnreadMessages
    } = props.user
    const { onPress } = props

    return <TouchableOpacity
        onPress={onPress}
    >
        <View style={{
            height: 100,
            paddingTop: 20,
            paddingStart: 10,
            flexDirection: 'row',
            marginTop: 10,

        }}>
            <View>
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
                
            }}>
                <View style={{
                    flexDirection: 'column',
                }}>
                    <Text style={{
                        color: 'black',
                        fontSize: fontSizes.h5,
                        fontWeight: 'bold'
                    }}>{name}</Text>
                    <Text style={{
                        color: 'black',
                        fontSize: fontSizes.h6,
                    }}>{message}</Text>
                </View>
                <Text style={{
                    color: colors.disabled,
                    fontSize: fontSizes.h6,
                    marginRight:8
                    
                }}> 4 minutes agos</Text>

            </View>

        </View>
    </TouchableOpacity>

}
export default ChatItems

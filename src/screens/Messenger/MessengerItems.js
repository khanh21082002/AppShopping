
import React, { useEffect, useState } from "react";
import { Image, ImageBackground, Text, View, TouchableOpacity, Alert, TextInput, KeyboardAvoidingView, Platform, Keyboard, Dimensions } from "react-native";
import { images, icons, fontSizes, colors } from "../../theme";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { UIButton } from '../../component';

// function _getColorFromStatus(status) {
//     return status.toLowerCase().trim() === "opening soon" ? colors.openingSoon :
//         status.toLowerCase().trim() === "opening now" ? colors.openingNow :
//             status.toLowerCase().trim() === "closing soon" ? colors.cloingSoon : colors.openingSoon


// }

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


function MessengerItems(props) {
    const { onPress } = props
    const { url, isSender, timetamp, messenger } = props.item

    return (isSender == true ? <TouchableOpacity
        onPress={onPress}
        style={{
            paddingStart: 10,
            flexDirection: 'row',
            marginTop: 10,
            justifyContent: 'center',
            alignItems: 'center'

        }}>
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
        <View style={{
            flex: 1,
            flexDirection: 'row',
        }}>
            <View>
                <Text style={{
                    color: 'black',
                    fontSize: fontSizes.h5,
                    paddingVertical: 5,
                    paddingHorizontal: 7,
                    backgroundColor: colors.messenger,
                    borderRadius: 10,
                }}>{messenger}</Text>
            </View>

        </View>

    </TouchableOpacity> : <TouchableOpacity
        onPress={onPress}
        style={{
            paddingStart: 10,
            flexDirection: 'row',
            marginTop: 10,
            justifyContent: 'flex-end',
            alignItems: 'center',

        }}>

        <View style={{ width: 40 }} />

        <View style={{

        }}>
            <Text style={{
                color: 'black',
                fontSize: fontSizes.h5,
                paddingVertical: 5,
                paddingHorizontal: 7,
                backgroundColor: colors.repley,
                borderRadius: 10,
                justifyContent: 'flex-end'

            }}>{messenger}</Text>
        </View>


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

    </TouchableOpacity>)

}
export default MessengerItems
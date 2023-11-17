
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

function FriendItems(props) {
    let { name,
        url,
    } = props.user
    const { onPress } = props

    return <View style={{
       backgroundColor: 'white',
       margin: 5,
       borderRadius: 5,
       height: 80,
       justifyContent: 'center',
    }}>
        <TouchableOpacity
            onPress={onPress}
        >
            <View style={{
                height: 100,
                paddingTop: 20,
                paddingStart: 10,
                flexDirection: 'row',
                marginTop: 10,

            }}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
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
                </View>

                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <View style={{
                        flexDirection: 'column',
                    }}>
                        <Text style={{
                            color: 'black',
                            fontSize: fontSizes.h5,
                            fontWeight: 'bold'
                        }}>{name}</Text>
                       
                    </View>
                    

                </View>

            </View>
        </TouchableOpacity>
    </View>

}
export default FriendItems

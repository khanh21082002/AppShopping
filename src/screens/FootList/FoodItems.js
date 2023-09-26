
import React, { useEffect, useState } from "react";
import { Image, ImageBackground, Text, View, TouchableOpacity, Alert, TextInput, KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import { images, icons, fontSizes, colors } from "../../theme";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { UIButton } from '../../component';

function _getColorFromStatus(status) {
    return status.toLowerCase().trim() === "opening soon" ? colors.openingSoon :
        status.toLowerCase().trim() === "opening now" ? colors.openingNow :
            status.toLowerCase().trim() === "closing soon" ? colors.cloingSoon : colors.openingSoon


}

function FoodItems(props) {
    let { name,
        price,
        socialNetworks,
        status,
        url,
        website,
    } = props.food
    const { onPress } = props

    return <TouchableOpacity
        onPress={onPress} >
        <View style={{
            height: 160,

            paddingTop: 20,
            paddingStart: 10,
            flexDirection: 'row',
        }}>
            <Image
                style={{
                    width: 100,
                    height: 100,
                    resizeMode: 'cover',
                    borderRadius: 10,
                    marginRight: 15
                }}
                source={{
                    uri: url
                }}
            />
            <View style={{

                flex: 1,
                marginRight: 10,
            }}>
                <Text
                    style={{
                        color: 'black',
                        fontSize: fontSizes.h5,
                        fontWeight: 'bold',
                    }}>{name}
                </Text>
                <View style={{
                    height: 1,
                    backgroundColor: 'black',
                }} />
                <View style={{
                    flexDirection: 'row',
                }}>
                    <Text style={{
                        color: colors.disabled,
                        fontSize: fontSizes.h5,

                    }}>Status: </Text>
                    <Text style={{
                        color: _getColorFromStatus(status),
                        fontSize: fontSizes.h6,
                    }}>{status} </Text>
                </View>
                <Text style={{
                    color: colors.disabled,
                    fontSize: fontSizes.h5,

                }}>Price: {price} $ </Text>
                <Text style={{
                    color: colors.disabled,
                    fontSize: fontSizes.h5,

                }}>Food Type: Pizza </Text>
                <Text style={{
                    color: colors.disabled,
                    fontSize: fontSizes.h5,

                }}>Website: {website}</Text>

                <View style={{ flexDirection: 'row' }}>
                    {socialNetworks["facebook"] !== undefined && <Icon
                        name="facebook"
                        size={15}
                        color={colors.disabled}
                        style={{
                            paddingEnd: 10
                        }} />}
                    {socialNetworks["twitter"] !== undefined && <Icon
                        name="twitter"
                        size={15}
                        color={colors.disabled}
                        style={{
                            paddingEnd: 10
                        }} />}
                    {socialNetworks["instagram"] !== undefined && <Icon
                        name="instagram"
                        size={15}
                        color={colors.disabled}
                        style={{
                            paddingEnd: 10
                        }} />}
                </View>
            </View>

        </View>
    </TouchableOpacity>

}
export default FoodItems
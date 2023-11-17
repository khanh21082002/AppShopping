
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

function AddFriendItems(props) {
    let { name,
        url,
    } = props.user
    const { onPress , onPressAdd ,friendshipStatus, onPressDelete } = props

    return <View style={{
        backgroundColor: 'white',
        margin: 5,
        borderRadius: 5,
        height: 100,
        justifyContent: 'center',
    }}>
        <TouchableOpacity
            onPress={onPress}
        >
            {/* chứa cả ảnh */}
            <View style={{
                height: 100,
                paddingTop: 20,
                paddingStart: 10,
                flexDirection: 'row',
                marginTop: 10,

            }}>
                <Image
                    style={{
                        width: 60,
                        height: 60,
                        resizeMode: 'cover',
                        borderRadius: 25,
                        marginRight: 15,
                        marginStart: 10
                    }}
                    source={{
                        uri: url
                    }}
                />

                {/* Tên và các bottom */}
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    

                }}>
                    <View style={{

                    }}>
                        <Text style={{
                            color: 'black',
                            fontSize: fontSizes.h3,
                            fontWeight: 'bold',
                            marginBottom: 7
                        }}>{name}</Text>
                    </View>
                    {/* 2 cái bottom */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' , flex:1 }}>
                        <TouchableOpacity
                        onPress={ friendshipStatus === "pending" ? onPressDelete : onPressAdd} 
                        style={{
                            backgroundColor: "#0099FF",
                            padding: 10,
                            borderRadius: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '49%',
                            marginBottom: 5
                        }}>
                            <Text style={{
                                color: 'white',
                                fontSize: fontSizes.h4,
                                fontWeight: 'bold'
                            }} >
                                {friendshipStatus === "friend" ? "Hủy kết bạn" : "Thêm bạn"}
                                
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            backgroundColor: "#BBBBBB",
                            padding: 10,
                            borderRadius: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '49%',
                            marginBottom: 5
                        }}>
                            <Text style={{
                                color: 'black',
                                fontSize: fontSizes.h4,
                                fontWeight: 'bold'
                            }} >
                                Xóa
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>



            </View>
        </TouchableOpacity>
    </View>

}
export default AddFriendItems

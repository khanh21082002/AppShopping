import React, { useState } from "react";
import { Image, ImageBackground, Text, View, TouchableOpacity, Alert, Touchable } from "react-native";
import { images, icons, fontSizes, colors } from "../theme";
import Icon from 'react-native-vector-icons/FontAwesome';
import { UIButton } from '../component';

function WelcomeScreen() {
    //state => khi ma thay doi thi UI chay lai

    const [accountTypes, setAccountTypes] = useState([
        {
            name: 'Influencer',
            isSelected: true
        },
        {
            name: 'Bussiness',
            isSelected: false
        },
        {
            name: 'Individual',
            isSelected: false
        }
    ]);

    return (
        <View style={{ backgroundColor: 'white', flex: 100 }}>
            <ImageBackground source={images.background}
                resizeMode="cover"
                style={{
                    flex: 100,

                }}
            >

                {/* Header */}
                <View style={{
                    flex: 20,

                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',

                    }}>
                        <Image source={icons.fire}
                            style={{ width: 40, height: 40, margin: 10 }}
                        />
                        <Text style={{ fontSize: fontSizes.h2, fontWeight: 'bold', color: 'black' }}>SHOPPINGAPP.COM</Text>
                        <View style={{ flex: 1 }} />

                        <Icon name="comment" size={30} color="white" style={{ marginRight: 15 }} />
                        {/* <Image source={require("../../assets/chat.png")}
                            style={{ width: 30, height: 30, marginRight: 10 }}
                        /> */}
                    </View>
                </View>


                <View style={{
                    flex: 20,

                    justifyContent: 'center',
                    alignItems: 'center',
                }}>

                    <Text style={{
                        marginBottom: 7,
                        color: 'black',
                        fontSize: fontSizes.h5
                    }}>
                        Welcome to ShoppingApp
                    </Text>
                    <Text style={{
                        marginBottom: 7,
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: fontSizes.h2
                    }}>
                        ShoppingApp.COM
                    </Text>
                    <Text style={{
                        marginBottom: 7,
                        color: 'black',
                        fontSize: fontSizes.h5
                    }}>
                        Please select your account type
                    </Text>
                </View>

                <View style={{
                    flex: 40,

                }}>


                    {/* Button */}
                    {accountTypes.map(accountType =>
                        <UIButton
                            onPress={() => {
                                setAccountTypes(accountTypes.map(item => {
                                    return {
                                        ...item,
                                        isSelected: item.name === accountType.name
                                    }
                                }))

                            }}
                            title={accountType.name}
                            isSelected={accountType.isSelected}
                        />)
                    }
                </View>

                <View style={{
                    flex: 20,


                }}>
                    <UIButton
                        title={"Login".toLocaleUpperCase()}
                    />
                    <Text style={{
                        color: 'white',
                        fontSize: fontSizes.h5,
                        alignSelf: 'center',
                    }}>
                        Want to create an account?
                    </Text>
                    <TouchableOpacity style={{
                        margin:10
                    }}>
                        <Text style={{
                            color: colors.primary,
                            fontSize: fontSizes.h5,
                            alignSelf: 'center',
                            textDecorationLine: 'underline',
                        }}>
                            Register
                        </Text>
                    </TouchableOpacity>

                </View>
            </ImageBackground>
        </View>
    )
}

export default WelcomeScreen;
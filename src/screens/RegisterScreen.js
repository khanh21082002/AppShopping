
import React, { useEffect, useState } from "react";
import { Image, ImageBackground, Text, View, TouchableOpacity, Alert, TextInput, KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import { images, icons, fontSizes, colors } from "../theme";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { UIButton } from '../component';
import { isValidationEmail, isValiatePassword } from "../utilies/Validation";

function RegisterScreen() {
    const [keyboardIsShow, setKeyboardIsShow] = useState(false);
    //states for validating
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    //states to store email/password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const isValidationOk = () => email.length > 0 && password.length > 0
        && isValidationEmail(email) == true && isValiatePassword(password) == true

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardIsShow(true);
        });
        Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardIsShow(false);
        });
    })

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{
                flex: 100,
                backgroundColor: colors.primary,
            }}>
            {/* Header */}
            <View style={{
                height: 250,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 25

            }}>
                <Text style={{
                    color: 'black',
                    fontSize: fontSizes.h1,
                    fontWeight: 'bold',
                    width: "50%",

                }}>Already have an Account?</Text>
                <Image

                    source={images.Login}
                    style={{
                        width: 150,
                        height: 150,
                        alignSelf: 'center',

                    }}
                />
            </View>

            {/* Input */}
            <View style={{
                flex: 55,
                backgroundColor: 'white',
                borderRadius:20,
                padding: 10,
                margin:10
            }}>
                {/*Email */}
                <View style={{
                    marginHorizontal: 20,                   
                }}>
                    <Text style={{
                        color: colors.primary,
                        fontSizes: fontSizes.h5
                    }}>Email: </Text>
                    <TextInput
                        onChangeText={(text) => {
                            setErrorEmail(isValidationEmail(text) == true ? '' : 'Invalid Email')
                            setEmail(text)
                        }}
                        style={{
                            color: 'black',
                        }}
                        placeholder="example@gmail.com"
                        placeholderTextColor={colors.placehoder}
                    />
                    <View style={{ height: 1, backgroundColor: colors.primary, marginBottom: 15 }} />
                    <Text style={{ color: 'red', fontSize: fontSizes.h5, marginBottom: 5 }}>
                        {errorEmail}</Text>
                </View>

                {/*Password */}
                <View style={{
                    marginHorizontal: 20,
                    marginBottom: 10
                }}>
                    <Text style={{
                        color: colors.primary,
                        fontSizes: fontSizes.h5
                    }}>Password: </Text>
                    <TextInput
                        onChangeText={(text) => {
                            setErrorPassword(isValiatePassword(text) == true ? '' : 'Invalid Password')
                            setPassword(text)
                        }}
                        style={{
                            color: 'black',
                        }}
                        secureTextEntry={true}
                        placeholder="Enter Password"
                        placeholderTextColor={colors.placehoder}
                    />
                    <View style={{ height: 1, backgroundColor: colors.primary }} />
                    <Text style={{ color: 'red', fontSize: fontSizes.h5, marginBottom: 5 }}>
                        {errorPassword}</Text>
                </View>
                {/*Retype Password */}
                <View style={{
                    marginHorizontal: 20,
                    marginBottom: 10
                }}>
                    <Text style={{
                        color: colors.primary,
                        fontSizes: fontSizes.h5
                    }}>Retype Password: </Text>
                    <TextInput
                        onChangeText={(text) => {
                            setErrorPassword(isValiatePassword(text) == true ? '' : 'Invalid Password')
                            setPassword(text)
                        }}
                        style={{
                            color: 'black',
                        }}
                        secureTextEntry={true}
                        placeholder="Re-Enter Password"
                        placeholderTextColor={colors.placehoder}
                    />
                    <View style={{ height: 1, backgroundColor: colors.primary }} />
                    <Text style={{ color: 'red', fontSize: fontSizes.h5, marginBottom: 5 }}>
                        {errorPassword}</Text>
                </View>

                {/*Button register */}
                {keyboardIsShow == false && <View style={{
                    marginTop:15
                }}>
                    <TouchableOpacity
                        disabled={!isValidationOk()}
                        onPress={() => {
                            Alert.alert(`Email: ${email}`, `Password: ${password}`)
                        }}
                        style={{
                            backgroundColor: isValidationOk() ? colors.primary : colors.disabled,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '60%',
                            alignSelf: 'center',
                            borderRadius: 10
                        }}>
                        <Text style={{
                            padding: 10,
                            fontSize: fontSizes.h2,
                            color: 'white',
                        }}>Register</Text>
                    </TouchableOpacity>

                </View>}
            </View>

            {/* Login */}



            {/* Footer */}
            {keyboardIsShow == false && <View style={{
                flex: 20,
            }}>
                <View style={{
                    height: 40,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 10
                }}>
                    <View style={{ height: 1, backgroundColor: 'black', flex: 1 }} />
                    <Text style={{
                        padding: 10,
                        fontSize: fontSizes.h6,
                        color: 'black',
                        flex: 1,
                        marginHorizontal: 5,

                    }}>User orther method?</Text>
                    <View style={{ height: 1, backgroundColor: 'black', flex: 1 }} />
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',

                }}>
                    <Icon name="facebook" size={35} color={colors.facebook} />
                    <View style={{ width: 30 }} />
                    <Icon name="google" size={35} color={colors.google} />
                </View>
            </View>}

        </KeyboardAvoidingView>
    )
}

export default RegisterScreen
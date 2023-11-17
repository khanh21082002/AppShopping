
import React, { useEffect, useState } from "react";
import { Image, ImageBackground, Text, View, TouchableOpacity, Alert, TextInput, KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import { images, icons, fontSizes, colors } from "../theme";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { UIButton } from '../component';
import { isValidationEmail, isValiatePassword } from "../utilies/Validation";
import {
    auth,
    onAuthStateChanged,
    firebaseDatabaseRef,
    firebaseDatabaseSet,
    firebaseDatabase,
    signInWithEmailAndPassword
} from '../firebase/firebase'

function LoginScreen(props) {
    const [keyboardIsShow, setKeyboardIsShow] = useState(false);
    //states for validating
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    //states to store email/password
    const [email, setEmail] = useState('khanhnv@gmail.com');
    const [password, setPassword] = useState('123456abc');
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

    const { navigation, route } = props
    //function of navigate to/back
    const { navigate, goBack } = navigation

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{
                flex: 100,
                backgroundColor: 'white',
            }}>
            {/* Header */}
            <View style={{
                height: 250,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 35

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
                flex: 25
            }}>
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
                        value={email}
                        placeholderTextColor={colors.placehoder}
                    />
                    <View style={{ height: 1, backgroundColor: colors.primary, marginBottom: 15 }} />
                    <Text style={{ color: 'red', fontSize: fontSizes.h5, marginBottom: 5 }}>{errorEmail}</Text>
                </View>
                <View style={{
                    marginHorizontal: 20
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
                        value={password}
                        placeholderTextColor={colors.placehoder}
                    />
                    <View style={{ height: 1, backgroundColor: colors.primary }} />
                    <Text style={{ color: 'red', fontSize: fontSizes.h5, marginBottom: 5 }}>{errorPassword}</Text>
                </View>
            </View>

            {/* Login */}

            {keyboardIsShow == false && <View style={{
                flex: 15
            }}>
                <TouchableOpacity
                    disabled={!isValidationOk()}
                    onPress={() => {
                        signInWithEmailAndPassword(auth, email, password)
                            .then((userCredential) => {

                                const user = userCredential.user;
                                navigate('UITab')
                            })
                            .catch((error) => {
                                debugger
                                const errorCode = error.code;
                                const errorMessage = error.message;
                                // ..
                            });
                        
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
                    }}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigate('Register')
                    }}
                    style={{
                        padding: 5,
                        alignSelf: 'center',
                    }}>
                    <Text style={{
                        padding: 10,
                        fontSize: fontSizes.h5,
                        color: colors.primary,
                        alignSelf: 'center',
                    }}>New user? Register now</Text>
                </TouchableOpacity>
            </View>}

            {/* Footer */}
            {keyboardIsShow == false && <View style={{
                flex: 25,
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

export default LoginScreen
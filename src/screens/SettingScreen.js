import React, { useState } from "react";
import {useRecoilState} from "recoil";
import { Image, ImageBackground, Text, View, TouchableOpacity, Alert, Touchable, ScrollView, Switch } from "react-native";
import { images, icons, fontSizes, colors } from "../theme";
import Icon from 'react-native-vector-icons/FontAwesome';
import { UIHeader, UIRemove } from "../component/index"
import {
    auth , 
    firebaseDatabase , 
    firebaseDatabaseRef , 
    firebaseDatabaseSet
} from "../firebase/firebase"

import {backgroundColorState} from "./../recoid/index"

function SettingScreen(porps) {
    const [isEnabledLockApp, setIsEnabledLockApp] = useState(true);
    const [isUseFingerPrint, setIsUseFingerPrint] = useState(true);
    const [isEnabledChangePassword, setIsEnabledChangePassword] = useState(true);
    const [backgroundColor, setBackgroundColor] = useRecoilState(backgroundColorState);

    const { navigation, route } = porps
    //function of navigate to/back
    const { navigate, goBack } = navigation
    return <View style={{
        flex: 1,
        backgroundColor: 'white'
    }}>
        <UIHeader title="Settings" />
        <ScrollView style={{ flex: 1 }}>
            <View style={{
                height: 50,
                backgroundColor: "rgba(0,0,0,0.2)",
                justifyContent: 'center',

            }}>
                <Text style={{
                    color: colors.primary,
                    fontSize: fontSizes.h3,
                    marginStart: 10
                }}>Common</Text>
            </View>


            <UIRemove
                nameIcon1="globe"
                title="Language"
                text="English"
                nameIcon2="chevron-right"
            />
            <UIRemove
                nameIcon1="cloud"
                title="Environment"
                text="Production"
                nameIcon2="chevron-right"
            />

            <View style={{
                height: 50,
                backgroundColor: "rgba(0,0,0,0.2)",
                justifyContent: 'center',

            }}>

                <Text style={{
                    color: colors.primary,
                    fontSize: fontSizes.h3,
                    marginStart: 10
                }}>Account</Text>
            </View>
            <UIRemove
                nameIcon1="phone"
                title="Phone number"
                nameIcon2="chevron-right"
            />
            <UIRemove
                nameIcon1="envelope"
                title="Email"
                nameIcon2="chevron-right"
            />
            <UIRemove
                nameIcon1="sign-out"
                title="Sign out"
                nameIcon2="chevron-right"
                onPress={() => {
                    auth.signOut()
                    Alert.alert('Sign Out', 'Comfirm sign out?', [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                        { text: 'OK', onPress: () => navigate('Welcome') },
                    ]);
                }}
            />

            <View style={{
                height: 50,
                backgroundColor: "rgba(0,0,0,0.2)",
                justifyContent: 'center',

            }}>

                <Text style={{
                    color: colors.primary,
                    fontSize: fontSizes.h3,
                    marginStart: 10
                }}>Security</Text>
            </View>

            <View style={{
                flexDirection: 'row',
                paddingVertical: 10,
                alignItems: 'center'
            }}>
                <Icon
                    name='lock'
                    style={{
                        marginStart: 10
                    }}
                    size={25}
                    color="black"
                />
                <Text style={{
                    color: "black",
                    fontSize: fontSizes.h3,
                    marginStart: 10
                }}>Settings background</Text>
                <View style={{ flex: 1 }} />
                <Switch
                    trackColor={{ false: '#767577', true: colors.primary }}
                    thumbColor={isEnabledLockApp ? colors.primary : colors.disabled}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={(value) => setIsEnabledLockApp(value)}
                    value={isEnabledLockApp}
                    style={{
                        marginEnd: 10,
                    }}
                />
            </View>

            <View style={{
                flexDirection: 'row',
                paddingVertical: 10,
                alignItems: 'center'
            }}>
                <Icon
                    name='wifi'
                    style={{
                        marginStart: 10
                    }}
                    size={25}
                    color="black"
                />
                <Text style={{
                    color: "black",
                    fontSize: fontSizes.h3,
                    marginStart: 10
                }}>Use finger print</Text>
                <View style={{ flex: 1 }} />
                <Switch
                    trackColor={{ false: '#767577', true: colors.primary }}
                    thumbColor={isUseFingerPrint ? colors.primary : colors.disabled}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={(value) => setIsUseFingerPrint(value)}
                    value={isUseFingerPrint}
                    style={{
                        marginEnd: 10,
                    }}
                />
            </View>
            <View style={{
                flexDirection: 'row',
                paddingVertical: 10,
                alignItems: 'center'
            }}>
                <Icon
                    name='lock'
                    style={{
                        marginStart: 10
                    }}
                    size={25}
                    color="black"
                />
                <Text style={{
                    color: "black",
                    fontSize: fontSizes.h3,
                    marginStart: 10
                }}>Change Password</Text>
                <View style={{ flex: 1 }} />
                <Switch
                    trackColor={{ false: '#767577', true: colors.primary }}
                    thumbColor={isEnabledChangePassword ? colors.primary : colors.disabled}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={(value) => setIsEnabledChangePassword(value)}
                    value={isEnabledChangePassword}
                    style={{
                        marginEnd: 10,
                    }}
                />
            </View>

            <View style={{
                height: 50,
                backgroundColor: "rgba(0,0,0,0.2)",
                justifyContent: 'center',

            }}>

                <Text style={{
                    color: colors.primary,
                    fontSize: fontSizes.h3,
                    marginStart: 10
                }}>Misc</Text>
            </View>
            <UIRemove
                nameIcon1="file"
                title="Term of Service"
                nameIcon2="chevron-right"
            />
            <UIRemove
                nameIcon1="folder-open"
                title="Open source license"
                nameIcon2="chevron-right"
            />


        </ScrollView>
    </View>
}
export default SettingScreen


import React, { useEffect, useState } from "react";
import { Image, ImageBackground, Text, View, TouchableOpacity, Alert, TextInput, KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import { images, icons, fontSizes, colors } from "../../theme";
import Icon from 'react-native-vector-icons/FontAwesome5';
import FiveStars from "./FiveStars";

function GridItems(props) {
    const {item, index , onPress} = props
    return <View
        style={{

            flex: 0.5,
            marginLeft: index % 2 == 0 ? 10 : 0,
            marginTop: 5,
            marginRight: 10,
            marginBottom: 5,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: colors.disabled

        }}>

        <View style={{ flexDirection: 'row', marginTop: 10 }}>

            <Image
                style={{
                    width: 90,
                    height: 80,
                    resizeMode: 'cover',
                    borderRadius: 20,
                    marginRight: 15
                }}
                source={{
                    uri: item.url
                }} />
            <Text style={{
                fontSize: fontSizes.h2,
                color: 'black',
                flex: 1,
                textAlign: 'right',
                marginRight: 5
            }}>$ {item.price}</Text>
        </View>
        <Text style={{
            fontSize: fontSizes.h4,
            color: colors.primary,
        }}>* {item.productName}</Text>

        {
            item.specifications.map((item, index) => {
                return <Text key={index} style={{
                    fontSize: fontSizes.h5,
                    color: 'black',
                    flex: 1,
                    textAlign: 'left',
                    padding: 6
                }}> * {item}</Text>
            })
        }

        <View style={{ flexDirection: 'row', padding: 10 }}>
            <TouchableOpacity style={{ flexDirection: 'row' }}
                onPress={onPress}
            >
                <Icon name="heart"
                    size={22}
                    color={item.isSaved == undefined || item.isSaved == false ? colors.disabled : 'red'}
                    style={{
                        marginEnd: 5
                    }}
                />
                <Text style={{
                    fontSize: fontSizes.h6,
                    color: item.isSaved == undefined || item.isSaved == false ? colors.disabled : 'red',
                    width: 50,

                }}> Save for later</Text>
            </TouchableOpacity>

            <View style={{
                flex: 1,
                flexDirection: 'column',
            }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', }}>
                    <FiveStars numberofStars={item.stars} />
                </View>

                <Text style={{
                    fontSize: fontSizes.h6,
                    color: colors.openingNow,
                    textAlign: 'right',
                }}> {item.reviews} reviews</Text>


            </View>

        </View>

    </View>
}
export default GridItems
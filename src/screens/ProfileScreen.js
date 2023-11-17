import React, { useEffect, useState } from "react";
import { Image, ImageBackground, Text, View, TouchableOpacity, Alert, TextInput, KeyboardAvoidingView, Platform, Keyboard, SafeAreaView } from "react-native";
import { images, icons, fontSizes, colors } from "../theme";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Dimensions } from "react-native";

import {
    user as UserRepository,
    population as PopulationRepository

} from '../repositories/index'

import { convertDateToString } from '../utilies/DateTime'

import {
    LineChart
} from "react-native-chart-kit";

function ProfileScreen(props) {
    const [user, setUser] = useState({})
    const [populations, setPopulations] = useState({})
    const screenWidth = Dimensions.get("window").width;
    const screenHeight = Dimensions.get("window").height;
    const chartConfig = {
        backgroundGradientFrom: "white",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "white",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 3, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    //call when component loaded
    useEffect(() => {
        UserRepository.getUserDetail().then(responseUser => setUser(responseUser))
        PopulationRepository.getPopulation({
            drilldown: 'Nation',
            measure: 'Population'
        }).then(resonsePopulations => setPopulations(resonsePopulations))

        .catch((error) => {
            // Xử lý lỗi nếu có
            console.error('Error fetching user data:', error);
          });
    }, [])
    //UserRepository.getUserDetail()

    const { email, dateOfBirth,
        gender, userName,
        address, url,
        phone, registerDate } = user
    return <SafeAreaView style={{
        flex: 1,
        backgroundColor: 'white',
        paddingStart: 20
    }}>
        <Image
            style={{
                width: 160,
                height: 160,
                resizeMode: 'cover',
                borderRadius: 80,
                marginRight: 15,
                alignSelf: 'center',
                marginBottom: 25
            }}
            source={{
                uri: url
            }} />
        <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: 'bold', fontSize: fontSizes.h4, color: 'black' }}>UserName :</Text>
            <Text style={{ fontSize: fontSizes.h5, color: 'black' }}> {userName}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: 'bold', fontSize: fontSizes.h4, color: 'black' }}>Email :</Text>
            <Text style={{ fontSize: fontSizes.h5, color: 'black' }}> {email}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: 'bold', fontSize: fontSizes.h4, color: 'black' }}>DateOfBirth :</Text>
            <Text style={{ fontSize: fontSizes.h5, color: 'black' }}> {convertDateToString(dateOfBirth)}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: 'bold', fontSize: fontSizes.h4, color: 'black' }}>Gender :</Text>
            <Text style={{ fontSize: fontSizes.h5, color: 'black' }}> {gender}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: 'bold', fontSize: fontSizes.h4, color: 'black' }}>Address :</Text>
            <Text style={{ fontSize: fontSizes.h5, color: 'black' }}> {address}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: 'bold', fontSize: fontSizes.h4, color: 'black' }}>Phone :</Text>
            <Text style={{ fontSize: fontSizes.h5, color: 'black' }}> {phone}</Text>
        </View>

        {/* <LineChart
            data={{
                labels: populations.map(item => item.year),
                datasets: [
                    {
                        data: populations.map(item => Math.floor(item.population/100000,0)),
                        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                        strokeWidth: 2 // optional
                    }
                ],
                legend: ["Population/Year"]

            }}
            width={screenWidth}
            height={200}
            chartConfig={chartConfig}
        /> */}
    </SafeAreaView>

}

export default ProfileScreen
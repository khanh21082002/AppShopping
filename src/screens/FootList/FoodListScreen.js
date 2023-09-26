import React, { useEffect, useState } from "react";
import { Image, ImageBackground, Text, View, TouchableOpacity, Alert, TextInput, KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import { ScrollView, FlatList } from "react-native";
import { images, icons, fontSizes, colors } from "../../theme";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { UIButton } from '../../component';
import FoodItems from "./FoodItems";


function FootListScreen(props) {
    //list of Food
    const [foods, setFoods] = useState([
        {
            name: 'Paella Valenciana, with rabbit and chicken; and seafood paella',
            url: 'https://www.bluristorante.com/wp-content/uploads/2019/03/9-Traditional-Italian-Food-Dishes-You-Will-Love-1080x700.jpg',
            status: 'Opening soon',
            price: 5223.56,
            website: 'https://edition.cnn.com',
            socialNetworks: {
                facebook: 'https://www.facebook.com/duyvu91',
                twitter: 'https://twitter.com/LostInBrittany',
                instagram: 'https://www.instagram.com/nghiatran__/'
            }
        },
        {
            name: 'Gazpacho',
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK4gjyk-VN438EkSnwwAcCRVgzW6F_MmeH-A&usqp=CAU',
            status: 'Opening Now',
            price: 1124.56,
            website: 'https://huands.abc.com',
            socialNetworks: {
                twitter: 'https://twitter.com/LostInBrittany',
                instagram: 'https://www.instagram.com/nghiatran__/'
            }
        },
        {
            name: 'Gazpacho abcsd',
            url: 'https://i.insider.com/5f340aab5af6cc63ab37bf14?width=1000&format=jpeg&auto=webp',
            status: 'Opening Now',
            price: 1124.56,
            website: 'https://huands.abc.com',
            socialNetworks: {
                twitter: 'https://twitter.com/LostInBrittany',
                instagram: 'https://www.instagram.com/nghiatran__/'
            }
        },
        {
            name: 'Pimientos de Padron',
            url: 'https://www.thatsmags.com/image/view/201807/favorita-1.jpg',
            status: 'Closing soon',
            price: 2342.56,
            website: 'https://www.uiuds.com',
            socialNetworks: {
                facebook: 'https://www.facebook.com/duyvu91',
            }
        },
        {
            name: 'Albondigas',
            url: 'https://149366112.v2.pressablecdn.com/wp-content/uploads/2016/09/lead7.jpg',
            status: 'Comming soon',
            price: 2354.56,
            website: 'https://edition.sabc.com',
            socialNetworks: {
                instagram: 'https://www.instagram.com/nghiatran__/'
            }
        },
        {
            name: 'Abc xyz',
            url: 'https://blogs.biomedcentral.com/on-medicine/wp-content/uploads/sites/6/2019/09/iStock-1131794876.t5d482e40.m800.xtDADj9SvTVFjzuNeGuNUUGY4tm5d6UGU5tkKM0s3iPk-620x342.jpg',
            status: 'Closing soon',
            price: 5568.11,
            website: 'https://www.food.com/',
            socialNetworks: {
                instagram: 'https://www.instagram.com/aeisinger/'
            }
        },
        {
            name: 'Albondigassasd',
            url: 'https://149366112.v2.pressablecdn.com/wp-content/uploads/2016/09/lead7.jpg',
            status: 'Comming soon',
            price: 2354.56,
            website: 'https://edition.sabc.com',
            socialNetworks: {
                instagram: 'https://www.instagram.com/nghiatran__/'
            }
        },
    ])
    const [categories, setCategories] = useState([
        {
            name: 'BBQ',
            url: 'https://images.foody.vn/BlogsContents/46444498_1785582584898023_6834569445101273088_n(1).jpg'
        },
        {
            name: 'Breakfast',
            url: 'https://images.foody.vn/BlogsContents/46444498_1785582584898023_6834569445101273088_n(1).jpg'
        },
        {
            name: 'Coffee',
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR12qcjgUCbektxgkXY2cgWu_MfPCG3-eDfWruf19VOdo45be0Xzo6pUJTQx0hW4QrO_FU&usqp=CAU'
        },
        {
            name: 'Noodles',
            url: 'https://static.toiimg.com/photo/52467119.cms'
        },
        {
            name: 'Hot dogs',
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYNjeiTctEE8JCDkPBzQ9ymmBS1zMt3Mws-xo25gnbVFByCZ0NVuwiL2VZicgbS49jz7c&usqp=CAU'
        },
        {
            name: 'Dinner',
            url: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2020/01/22/12/dinner-table.jpg?width=1200'
        },
        {
            name: 'Beverages',
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHzVkc-LPuqE-DXVUkTznfkCadCqCYzcfoBA&usqp=CAU'
        },
        {
            name: 'Dessert',
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW08jAcTeGjQRVr9NAITfKF3nbRB5RPef2VA&usqp=CAU'
        },
        {
            name: 'Wine',
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUB_gxlZAGsGjHOwSU6mIc_L4X18yTAffJT-ocG6Y-5WqZSORqytoBaMkA5qcgeC2FeZA&usqp=CAU'
        },
        {
            name: 'Barbecue',
            url: 'https://m.media-amazon.com/images/I/81s-rWYsoKL._SX466_.jpg'
        },
    ])


    return <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View>
            <View style={{ height: 60 }}></View>
            <View style={{
                height: 100,
            }}>
                <View style={{ height: 1, backgroundColor: colors.disabled }} />
                <FlatList
                    horizontal={true}
                    data={categories}
                    keyExtractor={item => item.name}
                    renderItem={(item) => {
                        return <TouchableOpacity
                        onPress={() => {
                            alert(`${item.item.name}`)
                        }} 
                         style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <Image
                                style={{
                                    width: 50,
                                    height: 50,
                                    resizeMode: 'cover',
                                    borderRadius: 25,
                                    margin: 10
                                }}

                                source={{
                                    uri: item.item.url
                                }}
                            />
                            <Text>{item.item.name}</Text>
                        </TouchableOpacity>
                    }}
                    style={{
                        flex: 1
                    }}></FlatList>
                <View style={{ height: 1, backgroundColor: colors.disabled }} />
            </View>




            {/* <ScrollView>
                {foods.map(eachfoods =><FoodItems food={eachfoods} key={eachfoods.name}/>)}
            </ScrollView> */}

            <FlatList
                data={foods}
                renderItem={({ item }) => <FoodItems
                    onPress={() => { alert(`${item.name}`) }}
                    food={item}
                />}
                keyExtractor={item => item.name}
            />


        </View>
    </View>
}

export default FootListScreen
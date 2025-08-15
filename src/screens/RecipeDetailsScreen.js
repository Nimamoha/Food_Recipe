import React, { use, useEffect, useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { CachedImage } from '../helpers/image'
import { ChevronLeftIcon, ClockIcon, FireIcon } from 'react-native-heroicons/outline'
import { HeartIcon, Square3Icon, UsersIcon } from 'react-native-heroicons/solid'
import { widthpercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import YoutubeFrame from 'react-native-youtube-iframe';
import { FadeInDown } from 'react-native-reanimated'


export default function RecipeDetailsScreen(props) {
    let item = props.route.params;
    const [isFavourite, setIsFavourite] = useState(false);
    const navigation = useNavigation();
    const [meals, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        getMealData(item.idMeal);

    }, []);

    const getMealData = async (id) => {
        try {
            const response = await axios.get('https://themealdb.com/api/json/v1/1/lookup.php?i=${id}');
            // console.log('got recipes:', response.data);
            if (response && response.data) {
                setMeal(response.data.meals[0]);
                setLoading(false);

            }
        } catch (err) {
            console.log('error:', err.message)
        }
    }

    const ingredientsIndexes = (meal) => {
        if (!meal) return [];
        const indexes = [];
        for (let i = 1; i <= 20; i++) {
            if (meal['strIngredient' + { i }]) {
                indexes.push(i);
            }
        }
        return indexes;
    }

    const getYoutubeVideoId = (url) => {
        const regex = /[?&]v=([^&]+)/;
        const match = url.match(regex);
        if (match && match[1]) {

            return match[1];
        }
        return null;
    }


    return (
        <ScrollView
            className="flex-1 bg-white"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }}
        >
            <StatusBar style="light" />
            {/*recipe image*/}
            <View className="flex-row justify-center">
                <CachedImage
                    uri={item.strMealThumb}
                    sharedTransitionTag={item.strMeal}
                    style={{ width: wp(98), height: hp(50), borderRadius: 53, borderBottomLeftRadius: 40, borderBottomRightRadius: 40, marginTop: 4 }}
                />
            </View>

            {/*Back button */}
            <Animated.View entering={FadeIn.delay(200).duration(1000)} className="w-full absolute flex-row justify-between items-center pt-14">
                <TouchableOpacity onPress={() => navigation.goBack()} className="p-2  rounded-full ml-5 bg-white">
                    <ChevronLeftIcon size={hp(3.5)} strokewidth={4.5} color="#ba24fbff" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)} className="p-2  rounded-full mr-5 bg-white">
                    <HeartIcon size={hp(3.5)} strokewidth={4.5} color={isFavorite ? "red" : "gray"} />
                </TouchableOpacity>
            </Animated.View>

            {/*Meal description*/}
            {
                loading ? (
                    <ActivityIndicator size="large" className="mt-16" />
                ) : (
                    <View className="px-4 flex justify-between space-y-4 pt-8">
                        {/*Meal name and area*/}
                        <Animated.View entering={FadeInDown.duration(700).springify().damping(12)} className="space-y-2">
                            <Text style={{ fontSize: hp(3) }} className="font-bold flex-1 text-neutral-700">
                                {meals.strMeal}
                            </Text>
                            <Text style={{ fontSize: hp(2) }} className="font-medium flex-1 text-neutral-500">
                                {meals.strArea}
                            </Text>
                        </Animated.View>
                    </View>

                    {/*other details*/}
            <Animated.View entering={FadeInDown.duration(700).springify().damping(12)} className="flex-row justify-around">
                <View className="flex rounded-full bg-purple-200 p-2">
                    <View
                        style={{ height: hp(6.5), width: wp(6.5) }}
                        className="bg-white rounded-full items-center justify-center">
                        <ClockIcon size={hp(4)} strokewidth={2.5} color="gray" />
                    </View>
                    <View className="flex items-center py-2 space-y-1">
                        <Text style={{ fontSize: hp(2) }} className="font-bold text-neutral-700">
                            35
                        </Text>
                        <Text style={{ fontSize: hp(1.3) }} className="font-bold text-neutral-700">
                            Mins
                        </Text>
                    </View>
                </View>

                <View className="flex rounded-full bg-purple-200 p-2">
                    <View
                        style={{ height: hp(6.5), width: wp(6.5) }}
                        className="bg-white rounded-full items-center justify-center">
                        <UsersIcon size={hp(4)} strokewidth={2.5} color="lightpurple" />
                    </View>
                    <View className="flex items-center py-2 space-y-1">
                        <Text style={{ fontSize: hp(2) }} className="font-bold text-neutral-700">
                            3
                        </Text>
                        <Text style={{ fontSize: hp(1.3) }} className="font-bold text-neutral-700">
                            Servings
                        </Text>
                    </View>
                </View>
                <View className="flex rounded-full bg-purple-200 p-2">
                    <View
                        style={{ height: hp(6.5), width: wp(6.5) }}
                        className="bg-white rounded-full items-center justify-center">
                        <FireIcon size={hp(4)} strokewidth={2.5} color="lightpurple" />
                    </View>
                    <View className="flex items-center py-2 space-y-1">
                        <Text style={{ fontSize: hp(2) }} className="font-bold text-neutral-700">
                            103
                        </Text>
                        <Text style={{ fontSize: hp(1.3) }} className="font-bold text-neutral-700">
                            Cals
                        </Text>
                    </View>
                </View>
                <View className="flex rounded-full bg-purple-200 p-2">
                    <View
                        style={{ height: hp(6.5), width: wp(6.5) }}
                        className="bg-white rounded-full items-center justify-center">
                        <Square3Stack3DIcon size={hp(4)} strokewidth={2.5} color="lightpurple" />
                    </View>
                    <View className="flex items-center py-2 space-y-1">
                        <Text style={{ fontSize: hp(2) }} className="font-bold text-neutral-700">
                            35
                        </Text>
                        <Text style={{ fontSize: hp(1.3) }} className="font-bold text-neutral-700">
                            Easy
                        </Text>
                    </View>
                </View>
            </Animated.View>

            {/*Ingredients */}
            <Animated.View entering={FadeInDown.delay(200).duration(700).springify().damping(12)} className="space-y-4">
                <Text style={{ fontSize: hp(1.5) }} className="font-semibold flex-1 text-neutral-700">
                    Ingredients
                </Text>
                <View className="space-y-2 ml-3">
                    {ingredientsIndexes(meals).map(i => {
                        return (
                            <View key={i} className="flex-row space-x-4">
                                <View style={{ height: hp(4), width: hp(4) }}
                                    className="bg-purple-200 rounded-full" />
                                <View className="flex-row space-x-2">
                                    <Text style={{ fontSize: hp(1.7) }} className="font-extrabold text-neutral-600">
                                        {meal['strMeasure' + i]} </Text>
                                    <Text style={{ fontSize: hp(1.7) }} className="font-medium text-neutral-600">
                                        {meal['strIngredient' + i]}
                                    </Text>
                                </View>
                            </View>
                        )
                    }
                    )}
                </View>
            </Animated.View>

            {/*Instructions */}
            <Animated.View entering={FadeInDown.delay(200).duration(700).springify().damping(12)} className="space-y-4">
                <Text style={{ fontSize: hp(2.5) }} className="font-bold flex-1 text-neutral-700">
                    Instructions
                </Text>
                <Text style={{ fontSize: hp(1.6) }} className="font-medium text-neutral-700">
                    {meals?.strInstructions}
                </Text>
            </Animated.View>
            {/*Video for recipe */}
            {
                meal.strYoutube && (
                    <Animated.View entering={FadeInDown.delay(200).duration(700).springify().damping(12)} className="space-y-4">
                        <Text style={{ fontSize: hp(2.5) }} className="font-bold flex-1 text-neutral-700">
                            Recipe Video
                        </Text>
                        <View>
                            <YoutubeFrame
                                height={hp(30)}
                                videoId={getYoutubeVideoId(meal.strYoutube)}

                            />
                        </View>
                    </Animated.View>
                   )   }
        )}

     </ScrollView>
)}

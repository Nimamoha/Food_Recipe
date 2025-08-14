import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {categoryData} from '../constants'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { CachedImage } from '../helpers/image';

export default function Categories({categories, activeCategory, setActiveCategory}) {
    return(
        <Animated.View entering={FadeInDown.duration(500).springify()}>
        <View>
            <ScrollView
            horizontal
            howsHorizontalScrollIndicator={false}
            className="space-x-4"
            contentContainerStyle={{paddingHorizontal: 15}} 
            >
                {
                categoryData.map((item, index) =>{
                    let isActive = item.name == activeCategory;
                    let activeButtonClass = isActive ? 'bg-amber-400' : 'bg-white';
                    return(
                        <TouchableOpacity
                        key={index}
                        onPress={()=> setActiveCategory(item.name)}
                        className="flex items-center space-y-1"
                        >
                            <View className= {"rounded-fill p-[6px]" +activeButtonClass}>
                                {/*<Image
                                source={item.image}
                                style={{width: hp(6), height: hp(6)}}
                                className="rounded-full"
                                />*/}

                                <CachedImage
                                    uri={item.strCategoryThumb}
                                    style={{ width: hp(6), height: hp(6) }}
                                    className="rounded-full"
                                />

                                </View>
                                    <Text className="text-neutral-600" style={{fontSize: hp(1.6)}}>
                                        {item.name}
                                    </Text>

                        </TouchableOpacity>
                    )
                })
                }
            </ScrollView>
        </View>
        </Animated.View>
    )
}

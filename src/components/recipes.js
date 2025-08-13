import {View, Text} from 'react-native';
import React from 'react';
import MasonryList from '@react-native-seoul/masonry-list';
import { Pressable } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function Categories({categories ,activeCategory, handleChangeCategory}) {
    return(
        <Animated.View entering={FadeInDown.delay(index*100).duration(600).springify().damping(20)}>
        <View className="ma-4 space-y-3">
            <Text style={{fontSize: hp(3)}} className="font-semibold text-neutral-600"></Text>
            <View>
                {
                    categories.length==0 || meals.length==0? (
                        <Loading size="large" className="mt-20"/>
                    ):(
                       <MasonryList
                            data={meals}
                            keyExtractor={(item) => item.idMeal}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            renderItem={({item, index}) => <RecipeCard item={item} index={i} />}
                            //refreshing={isLoadingNext}
                            //onRefresh={() => refetch({first: ITEM_CNT})}
                            onEndReachedThreshold={0.1}
                            //onEndReached={() => loadNext(ITEM_CNT)} 
                         />
                    )
                }
                
            </View>
        </View>
        </Animated.View>
    )
}

const RecipeCard=({ item, index})=>{
    let isEven = index % 2 === 0;

    return(
        <View>
         <Pressable
             style={{width: '100%', paddingLeft: isEven? 0 : 10, paddingRight: isEven? 8 : 0}}
className="flex justify-center mb-4 space-y-1" 
        >
        { /*   <Image
                source={{ uri: item.strMealThumb }}
                style={{ width: '100%', height:index%3==0? hp(25): hp(35), borderRadius:35 }}
                className=" bg-black/5"
            />*/}
            <CachedImage
                uri={item.strMealThumb}
                style={{ width: '100%', height:index%3==0? hp(25): hp(35), borderRadius:35 }}
               className=" bg-black/5"
            />

            <Text style={{fontSize: hp(1.5)}} className="font-semibold ml-2 text-neutral-600">
                {
                  item.strMeal.length>20? item.strMeal.slice(0, 20) + '...' : item.strMeal
                }
            </Text>
         </Pressable>
        </View>
    )
}
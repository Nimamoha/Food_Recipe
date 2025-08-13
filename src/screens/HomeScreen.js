import {Veiw, Text} from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {bellIcon} from 'react-native-heroicons/outline' ;
import { TextInput, View } from 'react-native-web';

import axios from 'axios';

export default function WelcomeScreen() {

    const [activeCategory, setActiveCategory] = useState(Beef);
    const [categories, setCategories] = useState([]);
    const [meals,setMeals] = useState([]);

    useEffect(() => {
        getCategories();
        getRecipes();
    }, []);

    const handleChangeCategory = category=>{
        getRecipes();
        setActiveCategory(category);
        setMeals([]);
    }

    const getCategories = async() => {
        try{
            const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php');
           // console.log('got categories:', response.data);
            if(response && response.data){
                setMeals(response.data.meals);
            }

        }catch(err){
            console.log('error:', err.message)
        }
    }
     const getRecipes = async(category="Beef") => {
        try{
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);
           // console.log('got categories:', response.data);
            if(response && response.data){
                setRecipes(response.data.meals);
            }

        }catch(err){
            console.log('error:', err.message)
        }
    }


    return(
   <View className="flex-1 bg-white">
    <StatusBar style="dark" />
    <ScrollView
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{ paddingBottom: 50 }}
    className="space-y-6 pt-14"
    >

    {/* avatar and bell icon */}
    <View className="mx-4 flex-row justify-between items-center mb-2">
        <Image source={require('../../assets/images/avatar.png')} style={{height: hp(5), width: hp(5.5)}} />
        <bellIcon size={hp(4)} color="gray"/>
    </View>

    {/** greetings and punchline */}
    <View className="mx-4 space-y-2 mb-2">
        <Text style={{fontSize: hp(1.7)}} className="text-neutral-600">Hello, Nima!</Text>
    </View>

    <View className="mx-4">
        <Text style={{fontSize: hp(3.8)}} className="font-semibold text-neutral-600">Make your own food</Text>
    </View>
    <View>
        <Text style={{fontSize: hp(3.8)}} className="font-semibold text-neutral-600">
           stay at <Text className="text-amber-400">home</Text>
        </Text>
    </View>

    {/*Search bar */}
    <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
        <TextInput
            placeholder="Search Any recipe"
            placeholderTextColor="gray"
            style={{fontSize:hp(1.7)}}
            className="flex-1 text-base mb-1 tracking-wider"
        />
    </View>
    {/* Search icon */}
    <View className="bg-white rounded-full p-3">
        <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray"/>
    </View>

    {/* Categories Function */}
    <View className="mx-4">
       {categories.length>0 &&  <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} />}
    </View>

    {/* recipes*/}
    <View>
        <Recipes meals={meals} categories={categories} />
    </View>
    </ScrollView>
   </View>
    )

}







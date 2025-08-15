import { useNavigation } from 'expo-router';
import {View, Text, Touchable} from 'react-native';
import Animated, { FadeIn, FadeInUp, FadeOut } from 'react-native-reanimated';

export default function LoginScreen() {
    const navigation=useNavigation();
  return (
    <View className="bg-white h-full w-full" style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <StatusBar style="light"/>
        <Image className="h-full w-full absolute" source={require('../assets/images/background.png')} />

        {/* Light */}
        <View className="flex-row justify-around w-full absolute ">
            <Animated.Image entering={FadeInUp.delay(200).duration(1000).springify().damping(3)} className="h-[255] w-[99] " source={require('../assets/images/light.png')} />
            <Animated.Image entering={FadeInUp.delay(400).duration(1000).springify().damping(3)} className="h-[165] w-[65] " source={require('../assets/images/light.png')} />
        </View>

        {/*title and form */}
        <View className="w-full h-full flex justify-around pt-40 pb-10">
            {/* title */}
            <View className="flex items-center ">
                <Animated.Text entering={FadeInUp.duration(1000).springify().damping(3)} className="text-white  font-bold tracking-wide text-5xl">
                    Login
                </Animated.Text>
            </View>

            {/* Form */}
            <View className="flex item-center mx-4 space-y-4 ">
                <Animated.View  entering={FadeInDown.duration(1000).springify().damping(3)} className="bg-black/5 p-5 rounded-2xl w-full">
                    <TextInput placeholder="Email" placeholderTextColor={'gray'} />
                </Animated.View>
                <Animated.View  entering={FadeInDown.delay(200).duration(1000).springify().damping(3)} className="bg-black/5 p-5 rounded-2xl w-full mb-3">
                    <TextInput placeholder="Password" placeholderTextColor={'gray'} secureTextEntry />
                </Animated.View>
                <Animated.View  entering={FadeInDown.delay(400).duration(1000).springify().damping(3)} className="w-full">
                    <TouchableOpacity
                    className="w-full bg-sky-400 p-3 rounded-2xl mb-3">
                        <Text className="text-xl text-white text-center font-bold">Login</Text>
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View  entering={FadeInDown.delay(600).duration(1000).springify().damping(3)} className="flex-row justify-center">
                    <Text>don't have an account?</Text>
                    <TouchableOpacity onpress={()=> navigation.push('singUp')}>
                        <Text className="text-sky-600">SignUp</Text>
                    </TouchableOpacity>

                </Animated.View>
            </View>
         </View>

    </View>
  );
}
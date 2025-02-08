import {View, Text, ImageBackground} from "react-native";
import {router} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import AppIntroSlider from "react-native-app-intro-slider";

import {onboardingSwiperData} from "@/constants";

interface OnboardingDataType {
  id: number;
  title: string;
  description: string;
  sortDescription: string;
  image: any;
}

export default function OnboardingScreen() {
  const renderItem = ({item}: {item: OnboardingDataType}) => (
    <SafeAreaView>
      <ImageBackground
        source={item.image}
        className="h-screen flex items-center justify-center"
      >
        <View className="flex gpa-4 w-[80%] mx-auto bg-black/70 p-5 rounded-md">
          <Text className="text-center text-3xl font-bold capitalize text-white">
            {item.title}
          </Text>
          <Text className="text-center text-lg font-medium capitalize text-white my-4">
            {item.description}
          </Text>
          <Text className="text-center text-base font-medium capitalize text-white">
            {item.sortDescription}
          </Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );

  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={onboardingSwiperData}
      onDone={() => router.push("/login")}
      onSkip={() => router.push("/login")}
      renderNextButton={() => (
        <View className="bg-blue-700 rounded-xl py-2.5 px-4 flex flex-row justify-center items-center mb-5">
          <Text className="text-white font-semibold text-lg">Next</Text>
        </View>
      )}
      renderDoneButton={() => (
        <View className="bg-blue-700 rounded-xl py-2.5 px-4 flex flex-row justify-center items-center">
          <Text className="text-white font-semibold text-lg">Done</Text>
        </View>
      )}
      renderSkipButton={() => (
        <View className="bg-blue-700 rounded-xl py-2.5 px-4 flex flex-row justify-center items-center">
          <Text className="text-white font-semibold text-lg">Skip</Text>
        </View>
      )}
      showSkipButton={true}
      bottomButton={true}
      dotStyle={{backgroundColor: "gray"}}
      activeDotStyle={{backgroundColor: "#1D4ED8"}}
    />
  );
}

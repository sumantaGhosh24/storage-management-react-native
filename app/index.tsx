import {View, Text} from "react-native";
import React from "react";
import {SafeAreaView} from "react-native-safe-area-context";

const Home = () => {
  return (
    <SafeAreaView>
      <View className="bg-red-700">
        <Text className="p-3 text-white">Home</Text>
      </View>
    </SafeAreaView>
  );
};

export default Home;

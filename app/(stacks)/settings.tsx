import {View, Text} from "react-native";

import DarkMode from "@/components/dark-mode";

const SettingsScreen = () => {
  return (
    <View className="px-3 min-h-screen dark:bg-black">
      <Text className="text-2xl font-bold my-5 text-black dark:text-white">
        Settings
      </Text>
      <DarkMode />
    </View>
  );
};

export default SettingsScreen;

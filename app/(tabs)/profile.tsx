import {useState} from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import {router} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import {FontAwesome} from "@expo/vector-icons";
import {useColorScheme} from "nativewind";

import {getCurrentUser} from "@/lib/appwrite";
import {useAppwrite} from "@/lib/useAppwrite";

const ProfileScreen = () => {
  const {data: user, refetch} = useAppwrite({fn: getCurrentUser});

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch({});
    setRefreshing(false);
  };

  const {colorScheme} = useColorScheme();

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {user && (
          <View className="bg-white dark:bg-black px-5 min-h-screen">
            {user.avatar && (
              <View className="flex-row items-center justify-center mt-5">
                <Image
                  source={{uri: user.avatar}}
                  className="w-[250px] h-[250px] rounded-full"
                />
              </View>
            )}
            <View className="flex-row items-center justify-center my-5">
              <Text className="text-xl font-bold dark:text-white">
                {user.name || user.username}
              </Text>
            </View>
            <View className="flex-row items-center justify-center mb-10">
              <Text className="text-xl font-bold dark:text-white">
                {user.email}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => router.push("/profile-details")}
              className="mb-3 flex flex-row items-center justify-between"
            >
              <View className="flex flex-row items-center gap-3">
                <FontAwesome
                  name="user"
                  size={20}
                  color={colorScheme === "dark" ? "white" : "black"}
                />
                <Text className="font-bold dark:text-white">
                  Profile Details
                </Text>
              </View>
              <FontAwesome
                name="arrow-right"
                size={20}
                color={colorScheme === "dark" ? "white" : "black"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/profile-update-image")}
              className="mb-3 flex flex-row items-center justify-between"
            >
              <View className="flex flex-row items-center gap-3">
                <FontAwesome
                  name="image"
                  size={20}
                  color={colorScheme === "dark" ? "white" : "black"}
                />
                <Text className="font-bold dark:text-white">
                  Profile Update Image
                </Text>
              </View>
              <FontAwesome
                name="arrow-right"
                size={20}
                color={colorScheme === "dark" ? "white" : "black"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/profile-update-details")}
              className="mb-3 flex flex-row items-center justify-between"
            >
              <View className="flex flex-row items-center gap-3">
                <FontAwesome
                  name="user"
                  size={20}
                  color={colorScheme === "dark" ? "white" : "black"}
                />
                <Text className="font-bold dark:text-white">
                  Profile Update Details
                </Text>
              </View>
              <FontAwesome
                name="arrow-right"
                size={20}
                color={colorScheme === "dark" ? "white" : "black"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/settings")}
              className="mb-3 flex flex-row items-center justify-between"
            >
              <View className="flex flex-row items-center gap-3">
                <FontAwesome
                  name="cog"
                  size={20}
                  color={colorScheme === "dark" ? "white" : "black"}
                />
                <Text className="font-bold dark:text-white">Settings</Text>
              </View>
              <FontAwesome
                name="arrow-right"
                size={20}
                color={colorScheme === "dark" ? "white" : "black"}
              />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

import {useState} from "react";
import {View, Text, ScrollView, Image, RefreshControl} from "react-native";

import {getCurrentUser} from "@/lib/appwrite";
import {useAppwrite} from "@/lib/useAppwrite";

const ProfileDetailsScreen = () => {
  const {data: user, refetch} = useAppwrite({fn: getCurrentUser});

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch({});
    setRefreshing(false);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
    >
      {user && (
        <View className="dark:bg-black px-5 min-h-screen">
          {user.avatar && (
            <View className="flex-row items-center justify-center">
              <Image
                source={{uri: user.avatar}}
                className="w-[250px] h-[250px] rounded-full my-5"
              />
            </View>
          )}
          <View className="flex flex-row mb-5">
            <Text className="text-black dark:text-white">User ID: </Text>
            <Text className="capitalize font-bold text-black dark:text-white">
              {user.$id}
            </Text>
          </View>
          <View className="flex flex-row mb-5">
            <Text className="text-black dark:text-white">Account ID: </Text>
            <Text className="capitalize font-bold text-black dark:text-white">
              {user.accountId}
            </Text>
          </View>
          {user.name && (
            <View className="flex flex-row mb-5">
              <Text className="text-black dark:text-white">Name: </Text>
              <Text className="capitalize font-bold text-black dark:text-white">
                {user.name}
              </Text>
            </View>
          )}
          <View className="flex flex-row mb-5">
            <Text className="text-black dark:text-white">Email Address: </Text>
            <Text className="font-bold text-black dark:text-white">
              {user.email}
            </Text>
          </View>
          <View className="flex flex-row mb-5">
            <Text className="text-black dark:text-white">Mobile Number: </Text>
            <Text className="font-bold text-black dark:text-white">
              {user.mobileNumber}
            </Text>
          </View>
          <View className="flex flex-row mb-5">
            <Text className="text-black dark:text-white">Username: </Text>
            <Text className="font-bold text-black dark:text-white">
              {user.username}
            </Text>
          </View>
          {user.gender && (
            <View className="flex flex-row mb-5">
              <Text className="text-black dark:text-white">Gender: </Text>
              <Text className="capitalize font-bold text-black dark:text-white">
                {user.gender}
              </Text>
            </View>
          )}
          {user.country && (
            <View className="flex flex-row mb-5">
              <Text className="text-black dark:text-white">Country: </Text>
              <Text className="capitalize font-bold text-black dark:text-white">
                {user.country}
              </Text>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default ProfileDetailsScreen;

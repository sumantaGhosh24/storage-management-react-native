import {useState} from "react";
import {View, Text, ScrollView, Image, RefreshControl} from "react-native";

import {getCurrentUser} from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";

const ProfileDetailsScreen = () => {
  const {data: user, refetch} = useAppwrite(() => getCurrentUser());

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const typedUser = user as unknown as UserDetailsProps;

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
    >
      <View className="dark:bg-black px-5 min-h-screen">
        {typedUser.avatar && (
          <View className="flex-row items-center justify-center">
            <Image
              source={{uri: typedUser.avatar}}
              className="w-[250px] h-[250px] rounded-full my-5"
            />
          </View>
        )}
        <View className="flex flex-row mb-5">
          <Text className="text-black dark:text-white">User ID: </Text>
          <Text className="capitalize font-bold text-black dark:text-white">
            {typedUser.$id}
          </Text>
        </View>
        <View className="flex flex-row mb-5">
          <Text className="text-black dark:text-white">Account ID: </Text>
          <Text className="capitalize font-bold text-black dark:text-white">
            {typedUser.accountId}
          </Text>
        </View>
        {typedUser.name && (
          <View className="flex flex-row mb-5">
            <Text className="text-black dark:text-white">Name: </Text>
            <Text className="capitalize font-bold text-black dark:text-white">
              {typedUser.name}
            </Text>
          </View>
        )}
        <View className="flex flex-row mb-5">
          <Text className="text-black dark:text-white">Email Address: </Text>
          <Text className="font-bold text-black dark:text-white">
            {typedUser.email}
          </Text>
        </View>
        <View className="flex flex-row mb-5">
          <Text className="text-black dark:text-white">Mobile Number: </Text>
          <Text className="font-bold text-black dark:text-white">
            {typedUser.mobileNumber}
          </Text>
        </View>
        <View className="flex flex-row mb-5">
          <Text className="text-black dark:text-white">Username: </Text>
          <Text className="font-bold text-black dark:text-white">
            {typedUser.username}
          </Text>
        </View>
        {typedUser.gender && (
          <View className="flex flex-row mb-5">
            <Text className="text-black dark:text-white">Gender: </Text>
            <Text className="capitalize font-bold text-black dark:text-white">
              {typedUser.gender}
            </Text>
          </View>
        )}
        {typedUser.country && (
          <View className="flex flex-row mb-5">
            <Text className="text-black dark:text-white">Country: </Text>
            <Text className="capitalize font-bold text-black dark:text-white">
              {typedUser.country}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default ProfileDetailsScreen;

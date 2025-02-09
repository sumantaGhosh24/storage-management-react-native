import {useState} from "react";
import {
  View,
  Text,
  ToastAndroid,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {FontAwesome5} from "@expo/vector-icons";

import {getCurrentUser, updateUserImage} from "@/lib/appwrite";
import {useAppwrite} from "@/lib/useAppwrite";
import CustomButton from "@/components/custom-button";

const ProfileUpdateImageScreen = () => {
  const {data: user, refetch} = useAppwrite({fn: getCurrentUser});

  const [uploading, setUploading] = useState(false);
  const [avatar, setAvatar] = useState<any>();

  const openPicker = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access photos was denied");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (pickerResult.canceled === true) {
      return;
    }

    setAvatar(pickerResult.assets[0]);
  };

  const takePicture = async () => {
    let cameraResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (cameraResult.canceled === true) {
      return;
    }

    setAvatar(cameraResult.assets[0]);
  };

  const handleSubmit = async () => {
    if (!avatar || !user)
      return ToastAndroid.showWithGravityAndOffset(
        "First select an image",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );

    setUploading(true);

    try {
      if (user.avatarId) {
        await updateUserImage({
          userId: user.$id,
          avatar,
          avatarId: user.avatarId,
        });
      } else {
        await updateUserImage({userId: user.$id, avatar});
      }

      await refetch({});

      ToastAndroid.showWithGravityAndOffset(
        "Profile image updated successfully!",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    } catch (error) {
      ToastAndroid.showWithGravityAndOffset(
        "Something went wrong, try again later!",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <ScrollView
      className="h-full dark:bg-black px-5"
      showsVerticalScrollIndicator={false}
    >
      <Text className="text-2xl font-bold my-5 text-black dark:text-white">
        Profile Update User Image
      </Text>
      {user && user.avatar && (
        <Image
          source={{uri: user.avatar}}
          alt="avatar"
          className="h-48 w-full rounded"
        />
      )}
      <View className="my-5 space-y-2">
        <Text className="text-base font-bold text-black dark:text-white mb-5">
          User Image
        </Text>
        {avatar && (
          <Image
            source={{uri: avatar.uri}}
            resizeMode="cover"
            className="w-full h-64 rounded-2xl mb-5"
          />
        )}
        <View>
          <TouchableOpacity onPress={() => openPicker()} className="mb-5">
            <View className="w-full h-16 px-4 rounded-2xl border-2 bg-gray-700 flex justify-center items-center flex-row space-x-2">
              <FontAwesome5 name="cloud-upload-alt" size={24} color="white" />
              <Text className="text-sm font-bold text-white">
                Choose a File
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => takePicture()}>
            <View className="w-full h-16 px-4 rounded-2xl border-2 bg-gray-700 flex justify-center items-center flex-row space-x-2">
              <FontAwesome5 name="cloud-upload-alt" size={24} color="white" />
              <Text className="text-sm font-bold text-white">Open Camera</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <CustomButton
        title="Update Image"
        handlePress={handleSubmit}
        containerStyles="bg-blue-700 disabled:bg-blue-300 mb-5"
        isLoading={uploading}
      />
    </ScrollView>
  );
};

export default ProfileUpdateImageScreen;

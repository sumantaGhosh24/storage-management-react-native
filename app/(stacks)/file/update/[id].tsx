import {useEffect, useState} from "react";
import {View, Text, ToastAndroid, ScrollView} from "react-native";
import {useLocalSearchParams} from "expo-router";

import {getFile, updateFile} from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import CustomButton from "@/components/custom-button";
import FormField from "@/components/form-field";

interface FileParams {
  $id: string;
  name: string;
  extension: string;
}

const FileUpdateScreen = () => {
  const {id} = useLocalSearchParams();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const {data: file, refetch} = useAppwrite(() => getFile({id: id as string}));

  const typedFile = file as unknown as FileParams;

  useEffect(() => {
    setName(typedFile.name.split(".")[0]);
  }, [typedFile]);

  const handleSubmit = async () => {
    if (name === "") {
      return ToastAndroid.showWithGravityAndOffset(
        "Fill all fields!",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    }

    setLoading(true);

    try {
      await updateFile({
        id: id as string,
        name,
        extension: typedFile.extension,
      });

      await refetch();

      ToastAndroid.showWithGravityAndOffset(
        "File updated successfully.",
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
      setLoading(false);
    }
  };

  return (
    <View>
      <ScrollView>
        <View className="w-full flex justify-start h-screen px-4 bg-white dark:bg-black">
          <Text className="text-2xl font-bold my-5 text-black dark:text-white">
            Update File
          </Text>
          <FormField
            title="File Name"
            placeholder="Enter file name"
            value={name}
            handleChangeText={(text: any) => setName(text)}
            otherStyles="mb-3"
          />
          <CustomButton
            title="Update File"
            handlePress={handleSubmit}
            containerStyles="bg-blue-700 disabled:bg-blue-300"
            isLoading={loading}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default FileUpdateScreen;

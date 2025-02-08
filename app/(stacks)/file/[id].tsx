import {useState} from "react";
import {
  View,
  Text,
  ToastAndroid,
  ScrollView,
  TouchableOpacity,
  Share,
} from "react-native";
import {router, Stack, useLocalSearchParams} from "expo-router";
import {FontAwesome} from "@expo/vector-icons";
import {useColorScheme} from "nativewind";

import {deleteFile, getFile} from "@/lib/appwrite";
import {constructFileUrl} from "@/lib/utils";
import useAppwrite from "@/lib/useAppwrite";
import FileThumbnail from "@/components/file-thumbnail";
import IconButton from "@/components/icon-button";

interface FileParams {
  $id: string;
  name: string;
  extension: string;
  size: number;
  type: string;
  url: string;
  fileId: string;
  $createdAt: string;
  $updatedAt: string;
  folder: {
    $id: string;
    name: string;
    tags: string[];
    $createdAt: string;
    $updatedAt: string;
  };
}

const FileScreen = () => {
  const {id} = useLocalSearchParams();
  if (!id) return null;

  const [loading, setLoading] = useState(false);

  const {colorScheme} = useColorScheme();

  const {data: file, refetch} = useAppwrite(() => getFile({id: id as string}));

  const typedFile = file as unknown as FileParams;

  const handleDelete = async () => {
    setLoading(true);

    try {
      await deleteFile({id: id as string, fileId: typedFile.fileId});

      ToastAndroid.showWithGravityAndOffset(
        "File deleted successfully!",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );

      router.back();
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

  const handleShare = async () => {
    const options = {
      title: `Share File ${typedFile.name}`,
      message: constructFileUrl(typedFile.fileId),
      url: constructFileUrl(typedFile.fileId),
    };

    try {
      await Share.share(options);
    } catch (error) {
      ToastAndroid.showWithGravityAndOffset(
        "Something went wrong, try again later!",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    }
  };

  return (
    <ScrollView>
      <Stack.Screen options={{title: typedFile.name}} />
      <View className="flex flex-row items-start justify-end gap-5 p-5 bg-blue-600">
        <IconButton
          icon={<FontAwesome name="pencil" size={24} color="white" />}
          handlePress={() => router.push(`/file/update/${id}`)}
          isLoading={loading}
          containerStyles="bg-green-700 h-12 w-12 rounded-full"
        />
        <IconButton
          icon={<FontAwesome name="trash" size={24} color="white" />}
          handlePress={() => handleDelete()}
          isLoading={loading}
          containerStyles="bg-red-700 h-12 w-12 rounded-full"
        />
        <IconButton
          icon={<FontAwesome name="share" size={24} color="white" />}
          handlePress={() => handleShare()}
          isLoading={loading}
          containerStyles="bg-blue-700 h-12 w-12 rounded-full"
        />
      </View>
      <View className="dark:bg-black px-5 min-h-screen">
        <View>
          <View className="flex flex-row items-center justify-between">
            <View className="flex flex-row items-center gap-1">
              <Text className="text-2xl font-bold my-5 dark:text-white">
                File
              </Text>
            </View>
            <TouchableOpacity onPress={() => refetch()}>
              <FontAwesome
                name="refresh"
                size={24}
                color={colorScheme === "dark" ? "white" : "black"}
              />
            </TouchableOpacity>
          </View>
          <View>
            <FileThumbnail file={typedFile} key={typedFile.$id} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default FileScreen;

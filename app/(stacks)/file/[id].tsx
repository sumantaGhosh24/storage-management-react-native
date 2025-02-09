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
import {useAppwrite} from "@/lib/useAppwrite";
import {constructFileUrl} from "@/lib/utils";
import FileThumbnail from "@/components/file-thumbnail";
import IconButton from "@/components/icon-button";

const FileScreen = () => {
  const {id} = useLocalSearchParams();
  if (!id) return null;

  const [loading, setLoading] = useState(false);

  const {colorScheme} = useColorScheme();

  const {data: file, refetch} = useAppwrite({
    fn: getFile,
    params: {id: id as string},
  });

  const handleDelete = async () => {
    setLoading(true);

    if (!file) return;

    try {
      await deleteFile({id: id as string, fileId: file.fileId});

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
    if (!file) return;

    const options = {
      title: `Share File ${file.name}`,
      message: constructFileUrl(file.fileId),
      url: constructFileUrl(file.fileId),
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
      <Stack.Screen options={{title: file && file.name}} />
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
            <TouchableOpacity onPress={() => refetch({id: id as string})}>
              <FontAwesome
                name="refresh"
                size={24}
                color={colorScheme === "dark" ? "white" : "black"}
              />
            </TouchableOpacity>
          </View>
          {file && (
            <View>
              <FileThumbnail file={file as any} key={file.$id} />
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default FileScreen;

import {View, Text, TouchableOpacity} from "react-native";
import {router} from "expo-router";

import {formatDateTime} from "@/lib/utils";
import {FontAwesome} from "@expo/vector-icons";
import {useColorScheme} from "nativewind";

interface FolderThumbnailProps {
  folder: {
    $id: string;
    name: string;
    tags: string[];
    files: any[];
    $createdAt: string;
  };
}

const FolderThumbnail = ({folder}: FolderThumbnailProps) => {
  const {colorScheme} = useColorScheme();

  return (
    <View className="mb-3 bg-gray-200 dark:bg-gray-700 rounded p-3 w-full">
      <TouchableOpacity
        onPress={() => {
          router.push(`/folder/${folder.$id}`);
        }}
        className="flex flex-row items-center justify-between"
      >
        <FontAwesome
          name="folder"
          size={24}
          color={colorScheme === "dark" ? "white" : "black"}
        />
        <View>
          <Text
            className="text-xl font-bold my-3 dark:text-white w-[150px] text-ellipsis capitalize"
            numberOfLines={1}
          >
            {folder.name}
          </Text>
          <Text className="font-extrabold dark:text-white">
            {folder.files.length}
          </Text>
        </View>
        <Text className="dark:text-white mt-3 font-light text-sm">
          {formatDateTime(folder.$createdAt)}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FolderThumbnail;

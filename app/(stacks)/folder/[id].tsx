import {useState} from "react";
import {
  View,
  Text,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import {router, Stack, useLocalSearchParams} from "expo-router";
import {FontAwesome} from "@expo/vector-icons";
import {useColorScheme} from "nativewind";

import {deleteFolder, getFolder} from "@/lib/appwrite";
import {useAppwrite} from "@/lib/useAppwrite";
import EmptyState from "@/components/empty-state";
import FileThumbnail from "@/components/file-thumbnail";
import IconButton from "@/components/icon-button";

const FolderScreen = () => {
  const {id} = useLocalSearchParams();
  if (!id) return null;

  const [loading, setLoading] = useState(false);

  const {colorScheme} = useColorScheme();

  const {
    data: folder,
    loading: folderLoading,
    refetch,
  } = useAppwrite({fn: getFolder, params: {id: id as string}});

  const handleDelete = async () => {
    setLoading(true);

    try {
      await deleteFolder({id: id as string});

      ToastAndroid.showWithGravityAndOffset(
        "Folder deleted successfully!",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );

      router.push("/home");
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
    <ScrollView>
      <Stack.Screen options={{title: folder && folder.name}} />
      {!folderLoading && (
        <>
          <View className="flex flex-row items-start justify-end gap-5 p-5 bg-blue-600">
            <IconButton
              icon={<FontAwesome name="upload" size={24} color="white" />}
              handlePress={() => router.push(`/folder/upload/${id}`)}
              isLoading={loading}
              containerStyles="bg-blue-700 h-12 w-12 rounded-full"
            />
            <IconButton
              icon={<FontAwesome name="pencil" size={24} color="white" />}
              handlePress={() => router.push(`/folder/update/${id}`)}
              isLoading={loading}
              containerStyles="bg-green-700 h-12 w-12 rounded-full"
            />
            <IconButton
              icon={<FontAwesome name="trash" size={24} color="white" />}
              handlePress={() => handleDelete()}
              isLoading={loading}
              containerStyles="bg-red-700 h-12 w-12 rounded-full"
            />
          </View>
          <View className="dark:bg-black px-5 min-h-screen">
            <View>
              <View className="flex flex-row items-center justify-between">
                <View className="flex flex-row items-center gap-1">
                  <Text className="text-2xl font-bold my-5 dark:text-white">
                    Files
                  </Text>
                  {folder &&
                    typeof folder.tags !== "undefined" &&
                    folder.tags.map((tag: string) => (
                      <View
                        key={tag}
                        className="bg-gray-200 dark:bg-gray-700 p-1.5 rounded-lg"
                      >
                        <Text className="dark:text-white uppercase font-bold">
                          {tag}
                        </Text>
                      </View>
                    ))}
                </View>
                <TouchableOpacity onPress={() => refetch({id: id as string})}>
                  <FontAwesome
                    name="refresh"
                    size={24}
                    color={colorScheme === "dark" ? "white" : "black"}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <View>
                  {folder &&
                  typeof folder.files !== "undefined" &&
                  folder.files.length > 0 ? (
                    folder?.files.map((file: any) => (
                      <FileThumbnail
                        file={{
                          ...file,
                          folder: {
                            $id: folder.$id,
                            name: folder.name,
                            tags: folder.tags,
                            $createdAt: folder.$createdAt,
                            $updatedAt: folder.$updatedAt,
                          },
                        }}
                        key={file.$id}
                      />
                    ))
                  ) : (
                    <EmptyState
                      title="No files found"
                      subtitle="Please try again"
                      buttonTitle="Upload File"
                      handlePress={() => router.push(`/folder/upload/${id}`)}
                    />
                  )}
                </View>
              </View>
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default FolderScreen;

import {useState, useEffect} from "react";
import {
  View,
  Text,
  ToastAndroid,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  TextInput,
} from "react-native";
import {useLocalSearchParams} from "expo-router";
import {useColorScheme} from "nativewind";
import {FontAwesome} from "@expo/vector-icons";

import {getFolder, updateFolder} from "@/lib/appwrite";
import {useAppwrite} from "@/lib/useAppwrite";
import FormField from "@/components/form-field";
import CustomButton from "@/components/custom-button";

interface FolderParams {
  $id: string;
  name: string;
  tags: string[];
}

const UpdateFolderScreen = () => {
  const {id} = useLocalSearchParams();

  const [name, setName] = useState("");
  const [tags, setTags] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [editIndex, setEditIndex] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const {colorScheme} = useColorScheme();

  const {data: folder, refetch} = useAppwrite({
    fn: getFolder,
    params: {id: id as string},
  });

  useEffect(() => {
    if (!folder) return;

    setName(folder.name);
    setTags(folder.tags);
  }, [folder]);

  const addTag = () => {
    if (text.trim() !== "") {
      if (editIndex !== null) {
        const newTags = [...tags];
        newTags[editIndex] = text.trim();
        setTags(newTags);
        setEditIndex(null);
      } else {
        setTags([...tags, text.trim()]);
      }
      setText("");
    }
  };

  const removeTag = (index: number) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const editTag = (index: number) => {
    const tagToEdit = tags[index];
    setText(tagToEdit);
    setEditIndex(index);
  };

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
      await updateFolder({id: id as string, name, tags});

      await refetch({id: id as string});

      ToastAndroid.showWithGravityAndOffset(
        "Folder updated successfully.",
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
            Update Folder
          </Text>
          <FormField
            title="Folder Name"
            placeholder="Enter folder name"
            value={name}
            handleChangeText={(text: any) => setName(text)}
            otherStyles="mb-3"
          />
          <View className="w-full">
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className="space-y-2 mb-3">
                  <Text className="text-base font-bold text-black dark:text-white">
                    Folder Tags
                  </Text>
                  <View className="flex-row flex-wrap mb-2.5 gap-2 mt-3">
                    {typeof tags !== "undefined" &&
                      tags.map((tag, index) => (
                        <View
                          key={index}
                          className="flex-row items-center bg-gray-200 dark:bg-gray-700 rounded p-1.5"
                        >
                          <TouchableOpacity
                            onPress={() => editTag(index)}
                            className="rounded-[20px] mr-1"
                          >
                            <Text className="font-bold text-[17px] dark:text-white">
                              {tag}
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => removeTag(index)}
                            className="rounded-full bg-[#E53935]"
                          >
                            <FontAwesome name="times" size={18} color="white" />
                          </TouchableOpacity>
                        </View>
                      ))}
                  </View>
                  <View className="w-full px-4 bg-white dark:bg-slate-500 rounded-2xl border-2 border-black-200 flex flex-row items-center h-16">
                    <TextInput
                      className="flex-1 font-semibold text-base text-black dark:text-white"
                      placeholder="Add tags"
                      value={text}
                      placeholderTextColor="#000"
                      onChangeText={(text) => setText(text)}
                      style={{verticalAlign: "top"}}
                      onSubmitEditing={addTag}
                    />
                    <TouchableOpacity onPress={addTag}>
                      <FontAwesome
                        name={editIndex !== null ? "pencil" : "plus"}
                        size={24}
                        color={colorScheme === "dark" ? "white" : "black"}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
          </View>
          <CustomButton
            title="Update Folder"
            handlePress={handleSubmit}
            containerStyles="bg-blue-700 disabled:bg-blue-300"
            isLoading={loading}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateFolderScreen;

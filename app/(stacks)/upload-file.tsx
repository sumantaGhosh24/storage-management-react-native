import {useState} from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import {FontAwesome5} from "@expo/vector-icons";

import {uploadFiles} from "@/lib/appwrite";
import CustomButton from "@/components/custom-button";
import Thumbnail from "@/components/thumbnail";

const UploadFileScreen = () => {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<any[]>([]);

  const openPicker = async () => {
    const document = await DocumentPicker.getDocumentAsync({multiple: true});
    if (document.canceled === false) {
      setFiles(document.assets);
    }
  };

  const handleSubmit = async () => {
    if (files.length < 1) {
      return ToastAndroid.showWithGravityAndOffset(
        "Please select a file!",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    }

    setLoading(true);

    try {
      await uploadFiles({files, folder: null});

      ToastAndroid.showWithGravityAndOffset(
        "Files uploaded successfully!",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );

      setFiles([]);
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
    <SafeAreaView>
      <ScrollView>
        <View className="w-full flex justify-start px-4 bg-white dark:bg-black min-h-screen">
          <Text className="text-2xl font-bold my-5 text-black dark:text-white">
            Upload Files
          </Text>
          <View className="my-5 space-y-2">
            <Text className="text-base font-bold text-black dark:text-white mb-3">
              Select Files
            </Text>
            <TouchableOpacity onPress={() => openPicker()}>
              <View className="w-full h-16 px-4 rounded-2xl border-2 bg-gray-700 flex justify-center items-center flex-row space-x-2">
                <FontAwesome5 name="cloud-upload-alt" size={24} color="white" />
                <Text className="text-sm font-bold text-white">
                  Choose a file
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View className="my-5 space-y-2">
            <Text className="text-base font-bold text-black dark:text-white mb-3">
              Selected Files
            </Text>
            <>
              {files?.map(async (file, i) => (
                <Thumbnail file={file} key={i} />
              ))}
            </>
          </View>
          <CustomButton
            title="Upload Files"
            handlePress={handleSubmit}
            containerStyles="bg-blue-700 disabled:bg-blue-300 mb-5"
            isLoading={loading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UploadFileScreen;

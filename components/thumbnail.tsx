import {View, Text, TouchableOpacity} from "react-native";
import {router} from "expo-router";

import {convertFileSize, formatDateTime, getFileType} from "@/lib/utils";
import FilePdfIcon from "@/assets/images/icons/file-pdf";
import FileDocIcon from "@/assets/images/icons/file-doc";
import FileDocxIcon from "@/assets/images/icons/file-docx";
import FileCsvIcon from "@/assets/images/icons/file-csv";
import FileTxtIcon from "@/assets/images/icons/file-txt";
import FileDocumentIcon from "@/assets/images/icons/file-document";
import FileImageIcon from "@/assets/images/icons/file-image";
import FileVideoIcon from "@/assets/images/icons/file-video";
import FileAudioIcon from "@/assets/images/icons/file-audio";
import FileOtherIcon from "@/assets/images/icons/file-other";

interface ThumbnailProps {
  file: {
    $id?: string;
    mimeType: string;
    uri: string;
    name: string;
    size: number;
    $createdAt?: string;
  };
}

interface IconProps {
  type: string;
  extension: string;
}

const Icon = ({type, extension}: IconProps) => {
  switch (extension) {
    // Document
    case "pdf":
      return <FilePdfIcon />;
    case "doc":
      return <FileDocIcon />;
    case "docx":
      return <FileDocxIcon />;
    case "csv":
      return <FileCsvIcon />;
    case "txt":
      return <FileTxtIcon />;
    case "xls":
    case "xlsx":
      return <FileDocumentIcon />;
    // Image
    case "svg":
      return <FileImageIcon />;
    // Video
    case "mkv":
    case "mov":
    case "avi":
    case "wmv":
    case "mp4":
    case "flv":
    case "webm":
    case "m4v":
    case "3gp":
      return <FileVideoIcon />;
    // Audio
    case "mp3":
    case "mpeg":
    case "wav":
    case "aac":
    case "flac":
    case "ogg":
    case "wma":
    case "m4a":
    case "aiff":
    case "alac":
      return <FileAudioIcon />;

    default:
      switch (type) {
        case "image":
          return <FileImageIcon />;
        case "document":
          return <FileDocumentIcon />;
        case "video":
          return <FileVideoIcon />;
        case "audio":
          return <FileAudioIcon />;
        default:
          return <FileOtherIcon />;
      }
  }
};

const Thumbnail = ({file}: ThumbnailProps) => {
  const fileType = getFileType(file.name);

  return (
    <View className="mb-3 bg-gray-200 dark:bg-gray-700 rounded p-3 w-full">
      <TouchableOpacity
        onPress={() => {
          file?.$id ? router.push(`/file/${file.$id}`) : null;
        }}
        className="flex flex-row items-center justify-between"
      >
        <Icon extension={fileType.extension} type={fileType.type} />
        <View>
          <Text
            className="text-xl font-bold my-3 dark:text-white w-[150px] text-ellipsis"
            numberOfLines={1}
          >
            {file.name}
          </Text>
          <Text className="font-extrabold dark:text-white">
            {convertFileSize(file.size)}
          </Text>
        </View>
        {file.$createdAt ? (
          <Text className="dark:text-white mt-3 font-light text-sm">
            {formatDateTime(file.$createdAt)}
          </Text>
        ) : (
          <View></View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Thumbnail;

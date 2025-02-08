import {View, Text, TouchableOpacity} from "react-native";
import {router} from "expo-router";

import {convertFileSize, formatDateTime} from "@/lib/utils";
import FileDocumentIcon from "@/assets/images/icons/file-document";
import FileImageIcon from "@/assets/images/icons/file-image";
import FileAudioIcon from "@/assets/images/icons/file-audio";
import FileVideoIcon from "@/assets/images/icons/file-video";
import FileOtherIcon from "@/assets/images/icons/file-other";
import FilePdfIcon from "@/assets/images/icons/file-pdf";
import FileDocIcon from "@/assets/images/icons/file-doc";
import FileDocxIcon from "@/assets/images/icons/file-docx";
import FileCsvIcon from "@/assets/images/icons/file-csv";
import FileTxtIcon from "@/assets/images/icons/file-txt";

interface FileThumbnailProps {
  file: {
    $id: string;
    name: string;
    extension: string;
    size: number;
    type: string;
    url: string;
    $createdAt: string;
    $updatedAt: string;
    folder: {
      $id: string;
      name: string;
      tags: string[];
      $createdAt: string;
      $updatedAt: string;
    } | null;
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

const FileThumbnail = ({file}: FileThumbnailProps) => {
  return (
    <View className="mb-3 bg-gray-200 dark:bg-gray-700 rounded p-3 w-full">
      <View>
        {file.folder && (
          <TouchableOpacity
            onPress={() => router.push(`/folder/${file?.folder?.$id}`)}
          >
            <Text className="text-sm font-bold text-blue-700 dark:text-white capitalize">
              {file.folder.name} /
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => router.push(`/file/${file.$id}`)}>
          <Text className="text-sm font-bold text-blue-700 dark:text-white">
            {file.name}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => router.push(`/file/${file.$id}`)}
        className="flex flex-row items-center justify-between"
      >
        <Icon type={file.type} extension={file.extension} />
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
          <Text className="dark:text-white mt-3 font-light text-sm">
            {formatDateTime(file.$createdAt)}
          </Text>
        </View>
        <View></View>
      </TouchableOpacity>
    </View>
  );
};

export default FileThumbnail;

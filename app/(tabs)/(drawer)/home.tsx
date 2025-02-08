import {useState, useEffect} from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {Link, router} from "expo-router";
import {FontAwesome} from "@expo/vector-icons";
import {useColorScheme} from "nativewind";

import useAppwrite from "@/lib/useAppwrite";
import {getFiles, getFolders, getTotalSpaceUsed} from "@/lib/appwrite";
import {
  calculatePercentage,
  convertFileSize,
  formatDateTime,
} from "@/lib/utils";
import IconButton from "@/components/icon-button";
import FormField from "@/components/form-field";
import SelectDropdown from "react-native-select-dropdown";
import EmptyState from "@/components/empty-state";
import FolderThumbnail from "@/components/folder-thumbnail";
import Thumbnail from "@/components/thumbnail";
import FileDocumentLightIcon from "@/assets/images/icons/file-document-light";
import FileImageLightIcon from "@/assets/images/icons/file-image-light";
import FileOtherLightIcon from "@/assets/images/icons/file-other-light";
import FileVideoLightIcon from "@/assets/images/icons/file-video-light";

interface TotalSpacePrams {
  all: number;
  audio: {latestDate: string; size: number};
  document: {latestDate: string; size: number};
  image: {latestDate: string; size: number};
  video: {latestDate: string; size: number};
  other: {latestDate: string; size: number};
  used: number;
}

interface FolderParams {
  folders: {
    $id: string;
    name: string;
    tags: string[];
    files: any[];
    $createdAt: string;
  }[];
  total: number;
  hasMore: boolean;
}

interface FileParams {
  files: {
    $id: string;
    name: string;
    url: string;
    size: number;
    type: string;
    extension: string;
    $createdAt: string;
    $updatedAt: string;
  }[];
  total: number;
  hasMore: boolean;
}

const LIMIT = 5;

const sortData = [
  {title: "Created At(desc)", value: "$createdAt-desc"},
  {title: "Created At(asc)", value: "$createdAt-asc"},
];

const typeData = [
  {title: "All", value: []},
  {
    title: "Document",
    value: [
      "pdf",
      "doc",
      "docx",
      "txt",
      "xls",
      "xlsx",
      "csv",
      "rtf",
      "ods",
      "ppt",
      "odp",
      "md",
      "html",
      "htm",
      "epub",
      "pages",
      "fig",
      "psd",
      "ai",
      "indd",
      "xd",
      "sketch",
      "afdesign",
      "afphoto",
      "afphoto",
      "document",
    ],
  },
  {
    title: "Image",
    value: ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp", "image"],
  },
  {
    title: "Media",
    value: [
      "mp4",
      "avi",
      "mov",
      "mkv",
      "webm",
      "video",
      "mp3",
      "wav",
      "ogg",
      "flac",
      "audio",
    ],
  },
];

const HomeScreen = () => {
  const {colorScheme} = useColorScheme();

  const [filter, setFilter] = useState({
    page: 1,
    search: "",
    sort: "$createdAt-desc",
    types: [],
  });

  const [page, setPage] = useState(1);

  const {data: files, refetch} = useAppwrite(() =>
    getFiles({
      limit: LIMIT,
      page: filter.page,
      types: filter.types,
      root: true,
      searchText: filter.search,
      sort: filter.sort,
    })
  );
  const {data: folders, refetch: refetchFolders} = useAppwrite(() =>
    getFolders({limit: LIMIT, page})
  );
  const {
    data: totalSpace,
    loading,
    refetch: refetchTotalSpace,
  } = useAppwrite(() => getTotalSpaceUsed());

  const typedFolders = folders as unknown as FolderParams;

  const typedFiles = files as unknown as FileParams;

  const typedTotalSpace = totalSpace as unknown as TotalSpacePrams;

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      await refetch();
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [filter]);

  return (
    <ScrollView>
      <View className="flex flex-row items-center gap-5 p-5 bg-blue-600">
        <Text className="text-3xl font-bold text-white">Manage Assets</Text>
        <IconButton
          icon={<FontAwesome name="folder" size={24} color="white" />}
          handlePress={() => router.push("/create-folder")}
          isLoading={false}
          containerStyles="bg-blue-700 h-12 w-12 rounded-full"
        />
        <IconButton
          icon={<FontAwesome name="upload" size={24} color="white" />}
          handlePress={() => router.push("/upload-file")}
          isLoading={false}
          containerStyles="bg-blue-700 h-12 w-12 rounded-full"
        />
      </View>
      <View className="dark:bg-black px-5 min-h-screen">
        <View>
          <View className="flex flex-row items-center justify-between">
            <Text className="text-2xl font-bold my-5 dark:text-white">
              Folders
            </Text>
            <TouchableOpacity onPress={() => refetchFolders()}>
              <FontAwesome
                name="refresh"
                size={24}
                color={colorScheme === "dark" ? "white" : "black"}
              />
            </TouchableOpacity>
          </View>
          <View>
            <View>
              {typedFolders.total > 0 ? (
                typedFolders?.folders.map((folder) => (
                  <FolderThumbnail folder={folder} key={folder.$id} />
                ))
              ) : (
                <EmptyState
                  title="No folders found"
                  subtitle="Please try again"
                  buttonTitle="Create Folder"
                  handlePress={() => router.push("/create-folder")}
                />
              )}
            </View>
            {typedFolders.total > 0 && (
              <View className="flex flex-row items-center gap-3 my-5 flex-wrap">
                {[...Array(Math.ceil(typedFolders.total / LIMIT))]
                  .fill(0)
                  .map((c, i) => (
                    <TouchableOpacity
                      key={i + 1}
                      onPress={() => setPage(i + 1)}
                      className={`p-3 rounded ${
                        i + 1 === page
                          ? "bg-blue-700"
                          : "bg-black dark:bg-white"
                      }`}
                    >
                      <Text className="font-bold text-white dark:text-black">
                        {i + 1}
                      </Text>
                    </TouchableOpacity>
                  ))}
              </View>
            )}
          </View>
        </View>
        <View>
          <View className="flex flex-row items-center justify-between">
            <Text className="text-2xl font-bold my-5 dark:text-white">
              Files
            </Text>
            <TouchableOpacity onPress={() => refetch()}>
              <FontAwesome
                name="refresh"
                size={24}
                color={colorScheme === "dark" ? "white" : "black"}
              />
            </TouchableOpacity>
          </View>
          <View>
            <FormField
              title="Search files"
              placeholder="Search files..."
              handleChangeText={(text: any) =>
                setFilter({...filter, search: text})
              }
              value={filter.search}
              otherStyles="mb-3"
            />
            <SelectDropdown
              data={sortData}
              onSelect={(selectedItem) => {
                setFilter({...filter, sort: selectedItem.value});
              }}
              renderButton={(selectedItem, isOpened) => {
                return (
                  <View style={styles.dropdownButtonStyle}>
                    <Text style={styles.dropdownButtonTxtStyle}>
                      {(selectedItem && selectedItem.title) || "Select a sort"}
                    </Text>
                    <FontAwesome
                      name={isOpened ? "chevron-up" : "chevron-down"}
                      style={styles.dropdownButtonArrowStyle}
                    />
                  </View>
                );
              }}
              renderItem={(item, index, isSelected) => {
                return (
                  <View
                    style={{
                      ...styles.dropdownItemStyle,
                      ...(isSelected && {backgroundColor: "#D2D9DF"}),
                    }}
                  >
                    <Text style={styles.dropdownItemTxtStyle}>
                      {item.title}
                    </Text>
                  </View>
                );
              }}
              showsVerticalScrollIndicator={false}
              dropdownStyle={styles.dropdownMenuStyle}
            />
            <SelectDropdown
              data={typeData}
              onSelect={(selectedItem) => {
                setFilter({...filter, types: selectedItem.value});
              }}
              renderButton={(selectedItem, isOpened) => {
                return (
                  <View style={styles.dropdownButtonStyle}>
                    <Text style={styles.dropdownButtonTxtStyle}>
                      {(selectedItem && selectedItem.title) || "Select a type"}
                    </Text>
                    <FontAwesome
                      name={isOpened ? "chevron-up" : "chevron-down"}
                      style={styles.dropdownButtonArrowStyle}
                    />
                  </View>
                );
              }}
              renderItem={(item, index, isSelected) => {
                return (
                  <View
                    style={{
                      ...styles.dropdownItemStyle,
                      ...(isSelected && {backgroundColor: "#D2D9DF"}),
                    }}
                  >
                    <Text style={styles.dropdownItemTxtStyle}>
                      {item.title}
                    </Text>
                  </View>
                );
              }}
              showsVerticalScrollIndicator={false}
              dropdownStyle={styles.dropdownMenuStyle}
            />
          </View>
          <View>
            <View>
              {typedFiles.total > 0 ? (
                typedFiles?.files.map((file) => (
                  <Thumbnail
                    file={{...file, mimeType: file.type, uri: file.url}}
                    key={file.$id}
                  />
                ))
              ) : (
                <EmptyState
                  title="No files found"
                  subtitle="Please try again"
                  buttonTitle="Upload File"
                  handlePress={() => router.push("/upload-file")}
                />
              )}
            </View>
            {typedFiles.total > 0 && (
              <View className="flex flex-row items-center gap-3 my-5 flex-wrap">
                {[...Array(Math.ceil(typedFiles.total / LIMIT))]
                  .fill(0)
                  .map((c, i) => (
                    <TouchableOpacity
                      key={i + 1}
                      onPress={() => setFilter({...filter, page: i + 1})}
                      className={`p-3 rounded ${
                        i + 1 === filter.page
                          ? "bg-blue-700"
                          : "bg-black dark:bg-white"
                      }`}
                    >
                      <Text className="font-bold text-white dark:text-black">
                        {i + 1}
                      </Text>
                    </TouchableOpacity>
                  ))}
              </View>
            )}
          </View>
        </View>
        <View className="flex flex-row items-center justify-between">
          <Text className="text-2xl font-bold my-5 dark:text-white">
            Statistic
          </Text>
          <TouchableOpacity onPress={() => refetchTotalSpace()}>
            <FontAwesome
              name="refresh"
              size={24}
              color={colorScheme === "dark" ? "white" : "black"}
            />
          </TouchableOpacity>
        </View>
        {!loading && (
          <View className="bg-gray-200 dark:bg-gray-700 p-3 rounded my-3">
            <Text className="text-xl font-bold dark:text-white mb-3">
              Total Used: {calculatePercentage(typedTotalSpace.used)}%
            </Text>
            <Text className="text-xl font-bold dark:text-white">
              Total Size: {convertFileSize(typedTotalSpace.used)}
            </Text>
          </View>
        )}
        {!loading && (
          <View>
            <Link
              href="/documents"
              className="bg-gray-200 dark:bg-gray-700 p-3 rounded mb-3"
            >
              <View>
                <View className="flex justify-between gap-3">
                  <FileDocumentLightIcon />
                  <Text className="text-sm font-extrabold dark:text-white">
                    {convertFileSize(typedTotalSpace.document.size) || "0 Byte"}
                  </Text>
                </View>
                <Text className="text-xl font-bold dark:text-white">
                  Documents
                </Text>
                <Text className="font-light dark:text-white">
                  {formatDateTime(typedTotalSpace.document.latestDate)}
                </Text>
              </View>
            </Link>
            <Link
              href="/images"
              className="bg-gray-200 dark:bg-gray-700 p-3 rounded mb-3"
            >
              <View>
                <View className="flex justify-between gap-3">
                  <FileImageLightIcon />
                  <Text className="text-sm font-extrabold dark:text-white">
                    {convertFileSize(typedTotalSpace.image.size) || "0 Byte"}
                  </Text>
                </View>
                <Text className="text-xl font-bold dark:text-white">
                  Images
                </Text>
                <Text className="font-light dark:text-white">
                  {formatDateTime(typedTotalSpace.image.latestDate)}
                </Text>
              </View>
            </Link>
            <Link
              href="/media"
              className="bg-gray-200 dark:bg-gray-700 p-3 rounded mb-3"
            >
              <View>
                <View className="flex justify-between gap-3">
                  <FileVideoLightIcon />
                  <Text className="text-sm font-extrabold dark:text-white">
                    {convertFileSize(
                      typedTotalSpace.video.size + typedTotalSpace.audio.size
                    ) || "0 Byte"}
                  </Text>
                </View>
                <Text className="text-xl font-bold dark:text-white">Media</Text>
                <Text className="font-light dark:text-white">
                  {formatDateTime(
                    typedTotalSpace.video.latestDate >
                      typedTotalSpace.audio.latestDate
                      ? typedTotalSpace.video.latestDate
                      : typedTotalSpace.audio.latestDate
                  )}
                </Text>
              </View>
            </Link>
            <Link
              href="/others"
              className="bg-gray-200 dark:bg-gray-700 p-3 rounded mb-3"
            >
              <View>
                <View className="flex justify-between gap-3">
                  <FileOtherLightIcon />
                  <Text className="text-sm font-extrabold dark:text-white">
                    {convertFileSize(typedTotalSpace.other.size) || "0 Byte"}
                  </Text>
                </View>
                <Text className="text-xl font-bold dark:text-white">
                  Others
                </Text>
                <Text className="font-light dark:text-white">
                  {formatDateTime(typedTotalSpace.other.latestDate)}
                </Text>
              </View>
            </Link>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    height: 50,
    backgroundColor: "#E9ECEF",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
    textTransform: "capitalize",
  },
  dropdownItemIconStyle: {
    fontSize: 24,
    marginRight: 8,
  },
});

export default HomeScreen;

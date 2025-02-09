import {useState, useEffect} from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {router} from "expo-router";
import SelectDropdown from "react-native-select-dropdown";
import {FontAwesome} from "@expo/vector-icons";
import {useColorScheme} from "nativewind";

import {getFiles} from "@/lib/appwrite";
import {getFileTypesParams} from "@/lib/utils";
import EmptyState from "@/components/empty-state";
import FileThumbnail from "@/components/file-thumbnail";
import FormField from "@/components/form-field";
import IconButton from "@/components/icon-button";
import {useAppwrite} from "@/lib/useAppwrite";

const LIMIT = 5;

const sortData = [
  {title: "Created At(desc)", value: "$createdAt-desc"},
  {title: "Created At(asc)", value: "$createdAt-asc"},
];

const MediaFileScreen = () => {
  const {colorScheme} = useColorScheme();

  const [filter, setFilter] = useState({
    page: 1,
    search: "",
    sort: "$createdAt-desc",
  });

  const types = getFileTypesParams("media");

  const {data: media, refetch} = useAppwrite({
    fn: getFiles,
    params: {
      types,
      limit: LIMIT,
      page: filter.page,
      sort: filter.sort,
      searchText: filter.search,
      root: false,
    },
  });

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      await refetch({
        types,
        limit: LIMIT,
        page: filter.page,
        sort: filter.sort,
        searchText: filter.search,
        root: false,
      });
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [filter]);

  return (
    <ScrollView>
      <View className="flex flex-row items-center gap-5 p-5 bg-blue-600">
        <Text className="text-3xl font-bold text-white">All Media</Text>
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
              Media
            </Text>
            <TouchableOpacity
              onPress={() =>
                refetch({
                  types,
                  limit: LIMIT,
                  page: filter.page,
                  sort: filter.sort,
                  searchText: filter.search,
                  root: false,
                })
              }
            >
              <FontAwesome
                name="refresh"
                size={24}
                color={colorScheme === "dark" ? "white" : "black"}
              />
            </TouchableOpacity>
          </View>
          <View>
            <FormField
              title="Search media"
              placeholder="Search media..."
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
          </View>
          <View>
            <View>
              {media && media.total > 0 ? (
                media?.files.map((file) => (
                  <FileThumbnail file={file as any} key={file.$id} />
                ))
              ) : (
                <EmptyState
                  title="No media found"
                  subtitle="Please try again"
                  buttonTitle="Upload File"
                  handlePress={() => router.push("/upload-file")}
                />
              )}
            </View>
            {media && media.total > 0 && (
              <View className="flex flex-row items-center gap-3 my-5 flex-wrap">
                {[...Array(Math.ceil(media.total / LIMIT))]
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

export default MediaFileScreen;

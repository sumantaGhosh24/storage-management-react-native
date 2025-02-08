import {useState, useEffect} from "react";
import {View, Text, ToastAndroid, ScrollView, StyleSheet} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import {FontAwesome} from "@expo/vector-icons";

import {getCurrentUser, updateUser} from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import FormField from "@/components/form-field";
import CustomButton from "@/components/custom-button";

const genderData = [{title: "male"}, {title: "female"}];

const ProfileUpdateDetailsScreen = () => {
  const {data: user, refetch} = useAppwrite(() => getCurrentUser());

  const typedUser = user as unknown as UserDetailsProps;

  const [form, setForm] = useState({
    name: "",
    username: "",
    gender: "",
    country: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm({
      name: typedUser.name || "",
      username: typedUser.username,
      gender: typedUser.gender || "",
      country: typedUser.country || "",
    });
  }, [typedUser]);

  const handleSubmit = async () => {
    if (
      form.name === "" ||
      form.username === "" ||
      form.gender === "" ||
      form.country === ""
    ) {
      ToastAndroid.showWithGravityAndOffset(
        "Please fill all the fields!",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
      return;
    }

    setLoading(true);

    try {
      await updateUser({
        userId: typedUser.$id,
        name: form.name,
        username: form.username,
        gender: form.gender,
        country: form.country,
      });

      await refetch();

      ToastAndroid.showWithGravityAndOffset(
        "Profile details updated successfully!",
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
    <ScrollView
      className="h-full dark:bg-black px-5"
      showsVerticalScrollIndicator={false}
    >
      <Text className="text-2xl font-bold my-5 text-black dark:text-white">
        Profile Update User Details
      </Text>
      <FormField
        title="Name"
        placeholder="Enter your name"
        value={form.name}
        handleChangeText={(text: any) => setForm({...form, name: text})}
        otherStyles="mb-3"
      />
      <FormField
        title="Username"
        placeholder="Enter your username"
        value={form.username}
        handleChangeText={(text: any) => setForm({...form, username: text})}
        otherStyles="mb-3"
      />
      <SelectDropdown
        data={genderData}
        defaultValue={{title: form.gender}}
        onSelect={(selectedItem) => {
          setForm({...form, gender: selectedItem.title});
        }}
        renderButton={(selectedItem, isOpened) => {
          return (
            <View style={styles.dropdownButtonStyle}>
              <Text style={styles.dropdownButtonTxtStyle}>
                {(selectedItem && selectedItem.title) || "Select your gender"}
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
                ...(isSelected && {backgroundColor: "#0486f9"}),
              }}
            >
              <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        dropdownStyle={styles.dropdownMenuStyle}
      />
      <FormField
        title="Country"
        placeholder="Enter your country"
        value={form.country}
        handleChangeText={(text: any) => setForm({...form, country: text})}
        otherStyles="mb-3"
      />
      <CustomButton
        title="Update User"
        handlePress={handleSubmit}
        containerStyles="bg-blue-700 disabled:bg-blue-300 mb-5"
        isLoading={loading}
      />
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
  },
  dropdownItemIconStyle: {
    fontSize: 24,
    marginRight: 8,
  },
});

export default ProfileUpdateDetailsScreen;

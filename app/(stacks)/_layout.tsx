import {Stack} from "expo-router";

const StacksLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="settings"
          options={{presentation: "modal", title: "Settings"}}
        />
        <Stack.Screen
          name="profile-details"
          options={{presentation: "modal", title: "Profile Details"}}
        />
        <Stack.Screen
          name="profile-update-image"
          options={{presentation: "modal", title: "Update Profile Image"}}
        />
        <Stack.Screen
          name="profile-update-details"
          options={{presentation: "modal", title: "Update Profile Details"}}
        />
        <Stack.Screen
          name="create-folder"
          options={{presentation: "modal", title: "Create Folder"}}
        />
        <Stack.Screen
          name="upload-file"
          options={{presentation: "modal", title: "Upload File"}}
        />
        <Stack.Screen
          name="folder/[id]"
          options={{presentation: "modal", title: "Folder"}}
        />
        <Stack.Screen
          name="folder/upload/[id]"
          options={{presentation: "modal", title: "Folder Upload File"}}
        />
        <Stack.Screen
          name="folder/update/[id]"
          options={{presentation: "modal", title: "Folder Update"}}
        />
        <Stack.Screen
          name="file/[id]"
          options={{presentation: "modal", title: "File"}}
        />
        <Stack.Screen
          name="file/update/[id]"
          options={{presentation: "modal", title: "File Update"}}
        />
      </Stack>
    </>
  );
};

export default StacksLayout;

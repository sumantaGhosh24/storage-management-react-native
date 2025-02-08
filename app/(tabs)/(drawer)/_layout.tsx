import {GestureHandlerRootView} from "react-native-gesture-handler";
import {Drawer} from "expo-router/drawer";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";

import {signOut} from "@/lib/appwrite";
import {useGlobalContext} from "@/context/global-provider";

const DrawerLayout = () => {
  const {setIsLogged} = useGlobalContext();

  const handleLogout = async () => {
    await signOut();

    setIsLogged(false);
  };

  return (
    <GestureHandlerRootView>
      <Drawer
        initialRouteName="home"
        drawerContent={(props) => {
          return (
            <DrawerContentScrollView {...props}>
              <DrawerItemList {...props} />
              <DrawerItem label="Logout" onPress={handleLogout} />
            </DrawerContentScrollView>
          );
        }}
      >
        <Drawer.Screen
          name="home"
          options={{drawerLabel: "Home", title: "Home"}}
        />
        <Drawer.Screen
          name="documents"
          options={{drawerLabel: "Documents", title: "Documents"}}
        />
        <Drawer.Screen
          name="images"
          options={{drawerLabel: "Images", title: "Images"}}
        />
        <Drawer.Screen
          name="media"
          options={{drawerLabel: "Media", title: "Media"}}
        />
        <Drawer.Screen
          name="others"
          options={{drawerLabel: "Others", title: "Others"}}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default DrawerLayout;

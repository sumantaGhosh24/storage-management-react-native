import {Text, View} from "react-native";
import {Tabs} from "expo-router";
import {StatusBar} from "expo-status-bar";
import {FontAwesome} from "@expo/vector-icons";

interface TabIconProps {
  icon: any;
  color: string;
  name: string;
  focused: boolean;
}

const TabIcon = ({icon, color, name, focused}: TabIconProps) => {
  return (
    <View className="flex items-center justify-center gap-2 -mb-10">
      {icon}
      <Text
        className={`${focused ? "font-semibold" : ""} text-xs`}
        style={{color: color}}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "gray",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#1D4ED8",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 84,
          },
        }}
      >
        <Tabs.Screen
          name="(drawer)"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
              <TabIcon
                icon={<FontAwesome name="home" size={24} color={color} />}
                name="Home"
                focused={focused}
                color="white"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
              <TabIcon
                icon={<FontAwesome name="user" size={24} color={color} />}
                name="Profile"
                focused={focused}
                color="white"
              />
            ),
          }}
        />
      </Tabs>
      <StatusBar style="inverted" backgroundColor="#1D4ED8" />
    </>
  );
};

export default TabsLayout;

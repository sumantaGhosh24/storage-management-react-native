import {useColorScheme} from "nativewind";
import {Text, View} from "react-native";

const DarkMode = () => {
  const {colorScheme, setColorScheme} = useColorScheme();

  return (
    <View>
      <Text
        className="dark:text-white"
        onPress={() =>
          setColorScheme(colorScheme === "light" ? "dark" : "light")
        }
      >
        {`The color scheme is ${colorScheme}`}
      </Text>
    </View>
  );
};

export default DarkMode;

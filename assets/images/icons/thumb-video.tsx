import * as React from "react";
import Svg, {Path} from "react-native-svg";

const ThumbVideoIcon = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={49}
    height={49}
    fill="none"
    {...props}
  >
    <Path
      fill="#FF7474"
      d="M24.678 4.678c-11.04 0-20 8.96-20 20s8.96 20 20 20 20-8.96 20-20-8.96-20-20-20Zm5.32 23.46-5.12 2.96c-3.3 1.9-6 .34-6-3.46v-5.92c0-3.82 2.7-5.36 6-3.46l5.12 2.96c3.3 1.9 3.3 5.02 0 6.92Z"
    />
  </Svg>
);

export default ThumbVideoIcon;

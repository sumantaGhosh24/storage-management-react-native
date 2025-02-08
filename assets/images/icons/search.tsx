import * as React from "react";
import Svg, {Circle, Path} from "react-native-svg";

const SearchIcon = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Circle
      cx={9.167}
      cy={9.167}
      r={6.667}
      stroke="#333F4E"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <Path
      stroke="#333F4E"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m13.75 14.13 4.167 4.167"
    />
  </Svg>
);

export default SearchIcon;

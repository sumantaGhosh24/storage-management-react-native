import * as React from "react";
import Svg, {G, Rect} from "react-native-svg";

const MenuIcon = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    fill="none"
    {...props}
  >
    <G fill="#333F4E" opacity={0.5}>
      <Rect width={18.333} height={2.75} x={1.834} y={3.666} rx={1.375} />
      <Rect width={18.333} height={2.75} x={1.834} y={9.625} rx={1.375} />
      <Rect width={18.333} height={2.75} x={1.834} y={15.584} rx={1.375} />
    </G>
  </Svg>
);

export default MenuIcon;

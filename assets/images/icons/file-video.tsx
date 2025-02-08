import * as React from "react";
import Svg, {Path} from "react-native-svg";

const FileVideoIcon = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={45}
    height={45}
    fill="none"
    {...props}
  >
    <Path
      fill="#FF7474"
      d="M22.602 4.281c-10.155 0-18.397 8.242-18.397 18.398 0 10.155 8.242 18.397 18.398 18.397C32.758 41.076 41 32.834 41 22.68 41 12.523 32.758 4.28 22.602 4.28Zm4.894 21.58-4.71 2.723c-3.035 1.748-5.519.313-5.519-3.183v-5.445c0-3.514 2.484-4.93 5.52-3.183l4.71 2.723c3.035 1.748 3.035 4.618 0 6.365Z"
    />
  </Svg>
);

export default FileVideoIcon;

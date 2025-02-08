import * as React from "react";
import Svg, {Path} from "react-native-svg";

const UploadIcon = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      d="M15.627 17.277h-4.29v-4.336h1.417c.36 0 .572-.409.36-.703l-2.759-3.817a.44.44 0 0 0-.715 0l-2.758 3.817a.442.442 0 0 0 .36.703H8.66v4.336H3.854C1.708 17.16 0 15.152 0 12.978c0-1.5.813-2.807 2.019-3.515A2.768 2.768 0 0 1 5.57 5.908a5.548 5.548 0 0 1 5.023-3.183 5.557 5.557 0 0 1 5.517 5.014c2.21.38 3.89 2.427 3.89 4.744 0 2.477-1.929 4.622-4.373 4.794Z"
    />
  </Svg>
);

export default UploadIcon;

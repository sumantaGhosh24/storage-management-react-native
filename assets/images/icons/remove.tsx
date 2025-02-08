import * as React from "react";
import Svg, {Path} from "react-native-svg";

const RemoveIcon = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={26}
    height={26}
    fill="none"
    {...props}
  >
    <Path
      fill="#333F4E"
      d="M20.666 5.338c-4.228-4.227-11.102-4.227-15.33 0-4.224 4.226-4.224 11.102 0 15.328a10.808 10.808 0 0 0 7.666 3.169c2.775 0 5.55-1.056 7.664-3.169 4.226-4.226 4.226-11.102 0-15.328Zm-3.194 10.857a.902.902 0 1 1-1.277 1.277l-3.193-3.193L9.81 17.47a.904.904 0 1 1-1.278-1.277l3.192-3.193L8.532 9.81A.902.902 0 1 1 9.809 8.53l3.193 3.193 3.192-3.193a.902.902 0 1 1 1.278 1.278L14.279 13l3.193 3.194Z"
      opacity={0.3}
    />
  </Svg>
);

export default RemoveIcon;

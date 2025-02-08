import * as React from "react";
import Svg, {Path} from "react-native-svg";

const DocumentsIcon = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={26}
    height={26}
    fill="none"
    {...props}
  >
    <Path
      fill="#F2F5F9"
      d="M21.053 4.37c.143.225-.102.488-.363.429a5.815 5.815 0 0 0-1.646-.228h-3.596a.5.5 0 0 1-.4-.2L13.79 2.697c-.153-.216-.009-.531.256-.531h2.983c1.69 0 3.18.878 4.024 2.204Z"
    />
    <Path
      fill="#F2F5F9"
      d="M21.818 7.084a4.53 4.53 0 0 0-1.571-.725 4.472 4.472 0 0 0-1.203-.163h-4.03c-.628 0-.671-.054-1.007-.498L12.49 3.683c-.704-.943-1.257-1.517-3.022-1.517H6.954a4.79 4.79 0 0 0-4.788 4.788v12.09a4.79 4.79 0 0 0 4.788 4.789h12.09a4.79 4.79 0 0 0 4.789-4.789v-8.06c0-1.614-.791-3.033-2.015-3.9Zm-6.23 10.617H10.4a.745.745 0 0 1-.747-.758c0-.412.325-.759.747-.759h5.19a.76.76 0 0 1 .758.759.754.754 0 0 1-.759.758Z"
    />
  </Svg>
);

export default DocumentsIcon;

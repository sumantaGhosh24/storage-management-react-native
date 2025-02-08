import * as React from "react";
import Svg, {Path} from "react-native-svg";

const FileAudioIcon = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={45}
    height={45}
    fill="none"
    {...props}
  >
    <Path
      fill="#3DD9B3"
      d="M39 10.137v20.789a6.611 6.611 0 0 1-6.605 6.605c-3.624 0-6.605-2.962-6.605-6.605 0-3.624 2.98-6.586 6.605-6.586 1.545 0 2.925.533 4.047 1.416V14.81l-16.944 4.82v14.847c0 3.642-2.98 6.604-6.604 6.604a6.611 6.611 0 0 1-6.605-6.604c0-3.625 2.962-6.587 6.605-6.587 1.527 0 2.906.534 4.029 1.399V13.025c0-2.704 1.637-4.801 4.231-5.5l10.634-2.907c2.152-.59 3.974-.387 5.262.607C38.356 6.2 39 7.855 39 10.137Z"
    />
  </Svg>
);

export default FileAudioIcon;

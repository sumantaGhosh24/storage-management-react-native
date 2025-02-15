import * as React from "react";
import Svg, {Path, G, Circle, Mask, Defs} from "react-native-svg";

const FileDocumentLightIcon = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={241}
    height={118}
    fill="none"
    {...props}
  >
    <Path fill="#F2F4F8" d="M15 60c0-27.614 22.386-50 50-50h176v108H15V60Z" />
    <G filter="url(#a)" opacity={0.4}>
      <Circle cx={48} cy={48} r={33} fill="#FF7474" />
    </G>
    <Circle cx={48} cy={43} r={33} fill="#FF7474" />
    <Path
      fill="#fff"
      d="M57.915 32.38c.176.278-.126.6-.447.528a7.157 7.157 0 0 0-2.026-.28H51.1a.785.785 0 0 1-.627-.313l-1.498-1.994c-.188-.266-.01-.653.316-.653h3.67a5.862 5.862 0 0 1 4.954 2.713Z"
    />
    <Path
      fill="#fff"
      d="M58.855 35.721a5.572 5.572 0 0 0-1.934-.893c-.48-.133-.973-.2-1.48-.2h-4.96c-.773 0-.826-.067-1.24-.613l-1.866-2.48c-.867-1.16-1.547-1.867-3.72-1.867H40.56a5.895 5.895 0 0 0-5.893 5.893v14.88a5.895 5.895 0 0 0 5.893 5.894h14.88a5.895 5.895 0 0 0 5.894-5.894v-9.92a5.854 5.854 0 0 0-2.48-4.8Zm-7.667 13.067h-6.387a.916.916 0 0 1-.92-.933c0-.507.4-.934.92-.934h6.387c.52 0 .933.427.933.934 0 .52-.413.933-.933.933Z"
    />
    <Mask
      id="b"
      width={226}
      height={86}
      x={15}
      y={32}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "alpha",
      }}
    >
      <Path fill="#D9D9D9" d="M15 32h226v86H15z" />
    </Mask>
    <G mask="url(#b)">
      <Path
        fill="#fff"
        d="M15.133 132.681v-18.576c-.806-8.634 1.165-25.76 31.703-27.892 28.048-1.958 34.017-5.912 48.717-31.682 12.1-21.214 30.573-21.615 47.49-21.983 2.216-.049 4.406-.096 6.551-.19 11.369-.497 48.487-.556 73.906-.357C252 32 241 29.71 241 40.5v183.786c0 10.888-8.854 19.714-19.775 19.714H34.775c-10.921 0-19.775-8.826-19.775-19.714v-91.606h.133Z"
      />
    </G>
    <Defs></Defs>
  </Svg>
);

export default FileDocumentLightIcon;

import * as React from "react";
import Svg, {Path, G, Circle, Mask, Defs} from "react-native-svg";

const FileImageLightIcon = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={241}
    height={118}
    fill="none"
    {...props}
  >
    <Path fill="#F2F4F8" d="M15 60c0-27.614 22.386-50 50-50h176v108H15V60Z" />
    <Path
      fill="#fff"
      d="M60.2 35.227c-.546-.293-1.693-.6-3.253.494l-1.96 1.386c-.146-4.146-1.946-5.773-6.32-5.773h-8c-4.56 0-6.333 1.773-6.333 6.333v10.667c0 3.067 1.667 6.333 6.333 6.333h8c4.374 0 6.174-1.626 6.32-5.773l1.96 1.387c.827.586 1.547.773 2.12.773.494 0 .88-.147 1.134-.28.546-.28 1.466-1.04 1.466-2.947v-9.653c0-1.907-.92-2.667-1.466-2.947Zm-13.533 6.947a2.512 2.512 0 0 1-2.506-2.507 2.512 2.512 0 0 1 2.506-2.506 2.512 2.512 0 0 1 2.507 2.506 2.512 2.512 0 0 1-2.507 2.507Z"
    />
    <G filter="url(#a)" opacity={0.4}>
      <Circle cx={48} cy={48} r={33} fill="#56B8FF" />
    </G>
    <Circle cx={48} cy={43} r={33} fill="#56B8FF" />
    <Path
      fill="#fff"
      d="M40.331 51.507a5.056 5.056 0 0 1-2.908-.924 4.909 4.909 0 0 1-1.815-2.415l-.047-.15a4.697 4.697 0 0 1-.23-1.42v-8.925l-3.235 10.6a2.925 2.925 0 0 0 .31 2.23 3.021 3.021 0 0 0 1.813 1.377l20.619 5.421c.257.066.514.097.768.097 1.328 0 2.541-.865 2.881-2.14l1.202-3.75H40.33Zm3.667-13.745c1.47 0 2.667-1.175 2.667-2.618 0-1.444-1.196-2.619-2.667-2.619-1.47 0-2.667 1.175-2.667 2.619 0 1.444 1.196 2.618 2.667 2.618Z"
    />
    <Path
      fill="#fff"
      d="M60.665 28.6H40.664a3.37 3.37 0 0 0-2.356.96 3.247 3.247 0 0 0-.978 2.312v14.4c0 1.804 1.496 3.273 3.334 3.273h20.001c1.838 0 3.334-1.469 3.334-3.273v-14.4c0-1.804-1.496-3.272-3.334-3.272Zm-20.001 2.618h20.001c.177 0 .347.069.472.192.125.122.195.289.195.462v9.294L57.12 36.34a2.384 2.384 0 0 0-.806-.591 2.424 2.424 0 0 0-.983-.214c-.34.002-.676.077-.983.22-.308.142-.58.35-.798.606l-4.952 5.836-1.614-1.58a2.362 2.362 0 0 0-1.653-.672c-.62 0-1.215.242-1.654.672l-3.68 3.612V31.872c0-.173.07-.34.195-.462a.674.674 0 0 1 .472-.192Z"
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

export default FileImageLightIcon;

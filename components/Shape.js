// Shape.js
import React from "react";
import {
  Svg,
  Rect,
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

const Shape = ({ type, color, gradient, shadow }) => {
  return (
    <Svg height="100%" width="100%">
      <Defs>
        <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor={gradient.start} />
          <Stop offset="1" stopColor={gradient.end} />
        </LinearGradient>
      </Defs>
      {type === "rectangle" && (
        <Rect
          x="50"
          y="50"
          width="300"
          height="200"
          fill="url(#grad)"
          stroke={shadow.color}
          strokeWidth={shadow.width}
          rx="15"
          ry="15"
          shadowOpacity={0.3}
          shadowRadius={10}
          shadowOffset={{ width: 10, height: 10 }}
        />
      )}
      {type === "circle" && (
        <Circle
          cx="200"
          cy="200"
          r="100"
          fill="url(#grad)"
          stroke={shadow.color}
          strokeWidth={shadow.width}
          shadowOpacity={0.3}
          shadowRadius={10}
          shadowOffset={{ width: 10, height: 10 }}
        />
      )}
    </Svg>
  );
};

export default Shape;

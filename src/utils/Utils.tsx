// import resolveConfig from "tailwindcss/resolveConfig";

// export const tailwindConfig = () => {
//   return resolveConfig(tailwindConfigFile);
// };

export const hexToRGB = (h: string): string => {
  let r = 0;
  let g = 0;
  let b = 0;
  if (h.length === 4) {
    r = parseInt(`${h[1]}${h[1]}`, 16);
    g = parseInt(`${h[2]}${h[2]}`, 16);
    b = parseInt(`${h[3]}${h[3]}`, 16);
  } else if (h.length === 7) {
    r = parseInt(`${h[1]}${h[2]}`, 16);
    g = parseInt(`${h[3]}${h[4]}`, 16);
    b = parseInt(`${h[5]}${h[6]}`, 16);
  }
  return `${r},${g},${b}`;
};

export const formatValue = (value: number): string =>
  Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumSignificantDigits: 3,
    notation: "compact",
  }).format(value);

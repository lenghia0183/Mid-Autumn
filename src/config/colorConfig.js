const colors = {
  crimson: {
    DEFAULT: "#c1322f",
    100: "#d05454",
    200: "#d97a7a",
    300: "#de9f9f",
    400: "#e4c4c4",
    500: "#ebdddd",
  },
  test: {
    DEFAULT: "#005957",
    100: "#006f68",
    200: "#00827f",
    300: "#009493",
    400: "#00a7a8",
    500: "#00bcb1",
  },
  dark: {
    DEFAULT: "#1a1a1a",
    100: "#6a6a6a",
    200: "#4a4a4a",
    300: "#2a2a2a",
    400: "#121212",
    500: "#1a1a1a",
  },
  white: {
    DEFAULT: "#faf7f2",
    100: "#f5f3eb",
    200: "#e8e5d7",
    300: "#d9d2be",
    400: "#cbc0a6",
    500: "#b9a88a",
  },
  yellow: {
    DEFAULT: "#f7a825",
    100: "#f9c85b",
    200: "#f9d95f",
    300: "#f7e54d",
    400: "#f7ec8b",
    500: "#f7a825",
  },
};

const colorMap = Object.keys(colors).reduce((map, color) => {
  const shades = Object.keys(colors[color]);
  shades.forEach((shade) => {
    const className = shade === "DEFAULT" ? color : `${color}-${shade}`;
    map.push(className);
  });
  return map;
}, []);

const colorSafelist = colorMap.map((colorClass) => `bg-${colorClass}`);

export { colors, colorSafelist };

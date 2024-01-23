export const toolbarButtons = [
  {
    value: "select",
    label: "Select tool",
    icon: "/assets/select.svg",
    isdropdown: false,
  },
  {
    value: "pan",
    label: "Pan tool",
    icon: "/assets/hand.svg",
    isdropdown: false,
  },
  {
    value: "elements",
    label: "Elements tool",
    icon: "/assets/elements.svg",
    isdropdown: true,
  },
  {
    value: "text",
    label: "Text tool",
    icon: "/assets/text.svg",
    isdropdown: false,
  },
  {
    value: "delete",
    label: "Delete",
    icon: "/assets/delete.svg",
    isdropdown: false,
  },
  {
    value: "reset",
    label: "Reset",
    icon: "/assets/reset.svg",
    isdropdown: false,
  },
  {
    value: "comments",
    label: "Comments tool",
    icon: "/assets/comments.svg",
    isdropdown: false,
  },
];

export const elements = [
  {
    icon: "/assets/rectangle.svg",
    name: "Rectangle",
    value: "rectangle",
  },
  {
    icon: "/assets/circle.svg",
    name: "Circle",
    value: "circle",
  },
  {
    icon: "/assets/triangle.svg",
    name: "Triangle",
    value: "triangle",
  },
  {
    icon: "/assets/line.svg",
    name: "Line",
    value: "line",
  },
  {
    icon: "/assets/image.svg",
    name: "Image",
    value: "image",
  },
  {
    icon: "/assets/freeform.svg",
    name: "Free Drawing",
    value: "freeform",
  },
];

export const modes = {
  freeform: "freeform",
  rectangle: "rectangle",
  triangle: "triangle",
  circle: "circle",
  line: "line",
  reset: "reset",
  delete: "delete",
  text: "text",
  image: "image",
  select: "select",
  pan: "pan",
  comments: "comments",
};

export const groupingOptions = [
  { value: "group", label: "Group", icon: "/assets/group.svg" },
  { value: "ungroup", label: "Ungroup", icon: "/assets/ungroup.svg" },
];

export const alignmentOptions = [
  { value: "left", label: "Align Left", icon: "/assets/align-left.svg" },
  {
    value: "horizontalCenter",
    label: "Align Horizontal Center",
    icon: "/assets/align-horizontal-center.svg",
  },
  { value: "right", label: "Align Right", icon: "/assets/align-right.svg" },
  { value: "top", label: "Align Top", icon: "/assets/align-top.svg" },
  {
    value: "verticalCenter",
    label: "Align Vertical Center",
    icon: "/assets/align-vertical-center.svg",
  },
  { value: "bottom", label: "Align Bottom", icon: "/assets/align-bottom.svg" },
];

export const fontFamilyOptions = [
  { value: "Helvetica", label: "Helvetica" },
  { value: "Times New Roman", label: "Times New Roman" },
];

export const fontSizeOptions = [
  {
    value: "10",
    label: "10",
  },
  {
    value: "12",
    label: "12",
  },
  {
    value: "14",
    label: "14",
  },
  {
    value: "16",
    label: "16",
  },
  {
    value: "18",
    label: "18",
  },
  {
    value: "20",
    label: "20",
  },
  {
    value: "22",
    label: "22",
  },
  {
    value: "24",
    label: "24",
  },
  {
    value: "26",
    label: "26",
  },
  {
    value: "28",
    label: "28",
  },
  {
    value: "30",
    label: "30",
  },
  {
    value: "32",
    label: "32",
  },
  {
    value: "34",
    label: "34",
  },
  {
    value: "36",
    label: "36",
  },
];

export const fontWeightOptions = [
  {
    value: "normal",
    label: "Normal",
  },
  {
    value: "semibold",
    label: "Semibold",
  },
  {
    value: "bold",
    label: "Bold",
  },
];

export const layersData = [
  {
    icon: "/assets/rectangle.svg",
    text: "Group #1",
  },
  {
    icon: "/assets/rectangle.svg",
    text: "Group #2",
  },
  {
    icon: "/assets/rectangle.svg",
    text: "Group #3",
  },
  {
    icon: "/assets/rectangle.svg",
    text: "Group #4",
  },
];

export const CURSOR_COLORS = [
  "red",
  "green",
  "blue",
  "yellow",
  "purple",
  "orange",
  "pink",
];

export const dropdownShapes = [
  "rectangle",
  "circle",
  "line",
  "triangle",
  "freeform",
];

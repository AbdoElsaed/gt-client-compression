import { CompressionOptions } from "../../store"; // Ensure this import points to where your interface is defined

export const settingsMetadata: {
  key: keyof CompressionOptions;
  label: string;
  isBoolean: boolean;
  defaultValue?: number | boolean | string;
  inputType?: "number" | "text";
}[] = [
  {
    key: "useWebWorker",
    label: "Use Web Worker",
    isBoolean: true,
  },
  {
    key: "preserveExif",
    label: "Preserve EXIF",
    isBoolean: true,
  },
  {
    key: "alwaysKeepResolution",
    label: "Always Keep Resolution",
    isBoolean: true,
  },
  {
    key: "maxSizeMB",
    label: "Max Size MB",
    isBoolean: false,
    inputType: "number",
  },
  {
    key: "maxWidthOrHeight",
    label: "Max Width or Height",
    isBoolean: false,
    inputType: "number",
  },
  {
    key: "maxIteration",
    label: "Max Iteration",
    isBoolean: false,
    inputType: "number",
  },
  {
    key: "exifOrientation",
    label: "Exif Orientation",
    isBoolean: false,
    inputType: "number",
  },
  {
    key: "fileType",
    label: "File Type",
    isBoolean: false,
    inputType: "text",
  },
  {
    key: "initialQuality",
    label: "Initial Quality",
    isBoolean: false,
    inputType: "number",
  },
];

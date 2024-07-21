// store.ts
import { create } from "zustand";
export interface CompressionOptions {
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
  useWebWorker?: boolean;
  maxIteration?: number;
  exifOrientation?: number;
  fileType?: string;
  initialQuality?: number;
  alwaysKeepResolution?: boolean;
  preserveExif?: boolean;
}

interface FileState {
  files: File[];
  compressedFiles: File[];
  compressionStatus: "idle" | "loading" | "error" | "success";
  setFiles: (files: File[]) => void;
  setCompressedFiles: (files: File[]) => void;
  setCompressionStatus: (
    status: "idle" | "loading" | "error" | "success"
  ) => void;
  compressionOptions: CompressionOptions;
  setCompressionOptions: (options: CompressionOptions) => void;
}

export const useStore = create<FileState>((set) => ({
  files: [],
  compressedFiles: [],
  compressionStatus: "idle",
  compressionOptions: {
    maxSizeMB: 1.5,
    maxWidthOrHeight: 1500,
    useWebWorker: true,
    preserveExif: true,
  },
  setFiles: (files) => set({ files }),
  setCompressedFiles: (files) => set({ compressedFiles: files }),
  setCompressionStatus: (status) => set({ compressionStatus: status }),
  setCompressionOptions: (options) => {
    set({ compressionOptions: options });
  },
}));

// DropZone.tsx
import React, { useMemo, useEffect, useState } from "react";
import { useDropzone, DropzoneOptions } from "react-dropzone";
import {
  acceptStyle,
  baseStyle,
  focusedStyle,
  rejectStyle,
} from "./DropZone.styles";
import { FileList } from "../FilesList";
import { compressImg } from "../../utils";
import { useStore } from "../../store"; // Import Zustand store
import { Spinner } from "../Spinner";
import { CompressionSettings } from "../CompressionSettings";

export const DropZone: React.FC<DropzoneOptions> = (props) => {
  const [showCompressionSettings, setShowCompressionSettings] = useState(false);
  const {
    files,
    compressedFiles,
    compressionStatus,
    setFiles,
    setCompressedFiles,
    setCompressionStatus,
    compressionOptions,
  } = useStore((state) => ({
    files: state.files,
    compressedFiles: state.compressedFiles,
    compressionStatus: state.compressionStatus,
    setFiles: state.setFiles,
    setCompressedFiles: state.setCompressedFiles,
    setCompressionStatus: state.setCompressionStatus,
    compressionOptions: state.compressionOptions,
  }));

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      ...props,
      accept: { "image/*": [] },
      onDropAccepted: setFiles,
    });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const handleStartCompression = async () => {
    setCompressionStatus("loading");
    try {
      const compressions = files.map((file) =>
        compressImg(file, compressionOptions)
      );
      const compressedResults = await Promise.all(compressions);
      setCompressedFiles(compressedResults);
      setCompressionStatus("success");
    } catch (error) {
      console.error("Compression error:", error);
      setCompressionStatus("error");
    }
  };

  useEffect(() => {
    if (files.length) {
      setCompressionStatus("idle");
      setCompressedFiles([]); // Reset compressed files on new input
    }
  }, [files, setCompressedFiles, setCompressionStatus]);

  return (
    <section className="flex items-center justify-center flex-col w-full">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      {files.length > 0 && (
        <>
          <div>
            <button
              onClick={handleStartCompression}
              className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Compress →
            </button>
            <button
              className="underline ml-2"
              onClick={() => setShowCompressionSettings((v) => !v)}
            >
              edit compression settings {showCompressionSettings ? "↑" : "↓"}
            </button>
          </div>

          <div
            className={`overflow-scroll transition-all ease-in-out duration-300 ${
              showCompressionSettings ? "max-h-60" : "max-h-0"
            }`}
          >
            {showCompressionSettings && <CompressionSettings />}
          </div>

          <div className="w-full flex justify-around items-start mt-5">
            <div className="w-1/2 flex justify-center items-center flex-col">
              <h4>Original Files</h4>
              <FileList files={files} type="original" />
            </div>
            <div className="w-1/2 flex justify-center items-center flex-col">
              <h4>Compressed Files</h4>
              {compressionStatus === "loading" && <Spinner />}
              {compressionStatus === "error" && (
                <p className="text-red-500">Error in compression.</p>
              )}
              {compressionStatus === "success" &&
                compressedFiles.length > 0 && (
                  <FileList files={compressedFiles} type="compressed" />
                )}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

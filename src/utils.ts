import imageCompression, { Options } from "browser-image-compression";

/**
 * Compresses an image file using specific compression settings. If compression
 * is successful, it returns the compressed file. Otherwise, it returns the
 * original file and logs the error.
 *
 * @param {File} file - The image file to be compressed.
 * @returns {Promise<File>} A promise that resolves to the compressed image file or the original file if compression fails.
 */
export const compressImg = async (file: File, options?: Partial<Options>) => {
  let output;
  try {
    const defaultOptions: Options = {
      maxSizeMB: 1.5,
      maxWidthOrHeight: 1500,
      useWebWorker: true,
      preserveExif: true,
    };
    const compressedFile = await imageCompression(
      file,
      options ?? defaultOptions
    );
    // Create a new File object with the new name if compression was successful
    const newFile = new File([compressedFile], `compressed_${file.name}`, {
      type: compressedFile.type,
      lastModified: new Date().getTime(),
    });
    output = newFile;
  } catch (err) {
    console.error("file compressing error", err);
    output = file;
  }
  return output;
};

export const formatFileSize = (bytes: number) => {
  const threshold = 1024 * 1024;
  if (bytes < threshold) {
    return (bytes / 1024).toFixed(2) + " KB";
  } else {
    return (bytes / 1024 / 1024).toFixed(2) + " MB";
  }
};

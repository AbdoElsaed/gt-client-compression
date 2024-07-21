import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { formatFileSize } from "../../utils";

interface FileListProps {
  files: File[];
  type: "original" | "compressed";
}

interface ModalContentProps {
  file: File;
  onClose: () => void;
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#FFF",
    padding: "0px",
    borderRadius: "10px",
    width: "100%",
    maxHeight: "90vh",
    overflowY: "auto" as const,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
};

const ModalContent: React.FC<ModalContentProps> = ({ file, onClose }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const img = new Image();
    const objectURL = URL.createObjectURL(file);
    img.onload = () => {
      setDimensions({ width: img.width, height: img.height });
      URL.revokeObjectURL(objectURL);
    };
    img.src = objectURL;
    return () => URL.revokeObjectURL(objectURL);
  }, [file]);

  return (
    <div className="relative">
      <div className="sticky top-0 bg-white z-10">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 mt-2 mr-2 bg-red-900 text-white p-2 rounded hover:bg-red-800"
          aria-label="Close"
        >
          Close
        </button>
        <div className="pt-4 pb-2 px-4">
          <h2 className="mb-2">name: {file.name}</h2>
          <p>
            Dimensions: {dimensions.width} x {dimensions.height} px
          </p>
        </div>
      </div>
      <div className="pt-12 pb-4 px-4">
        <img
          src={URL.createObjectURL(file)}
          alt={file.name}
          style={{ maxWidth: "100%", display: "block" }}
        />
      </div>
    </div>
  );
};

export const FileList: React.FC<FileListProps> = ({ files, type }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const bgColorClass =
    type === "original"
      ? "bg-white hover:bg-gray-200"
      : "bg-blue-100 hover:bg-blue-200";

  const handleOpenModal = (file: File) => {
    setSelectedFile(file);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDownloadAsZip = (fileList: File[], fileName: string) => {
    const zip = new JSZip();
    fileList.forEach((file) => {
      zip.file(file.name, file);
    });
    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, `${fileName}.zip`);
    });
  };

  return (
    <div>
      <button
        className="bg-teal-900 hover:bg-teal-700 text-white py-1 px-2 rounded m-1 text-sm font-medium flex items-center justify-center"
        onClick={() => handleDownloadAsZip(files, `${type}_files`)}
      >
        Download
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25"
          />
        </svg>
      </button>

      {files.map((file) => (
        <div
          key={file.name}
          className={`cursor-pointer border-2 border-gray-500 m-1 p-2 rounded-lg flex justify-between ${bgColorClass}`}
          onClick={() => handleOpenModal(file)}
        >
          <span className="text-gray-600 text-sm">{file.name}</span>
          <span className="text-green-700 font-bold">
            {formatFileSize(file.size)}
          </span>
        </div>
      ))}

      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        style={customStyles}
        contentLabel="File Information Modal"
      >
        {selectedFile && (
          <ModalContent file={selectedFile} onClose={handleCloseModal} />
        )}
      </ReactModal>
    </div>
  );
};

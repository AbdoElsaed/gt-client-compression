import React from "react";
import SettingsItem from "./SettingItem";
import { useStore } from "../../store";
import { settingsMetadata } from "./SettingsMetaData";

export const CompressionSettings: React.FC = () => {
  const { compressionOptions, setCompressionOptions } = useStore((state) => ({
    compressionOptions: state.compressionOptions,
    setCompressionOptions: state.setCompressionOptions,
  }));

  // const handleSave = () => {
  //   setCompressionOptions(compressionOptions);
  // };

  return (
    <div className="mt-3">
      <div className="flex flex-col w-full">
        <div className="flex-1 p-5">
          {settingsMetadata.map(
            ({ key, label, isBoolean, defaultValue, inputType }) => (
              <SettingsItem
                key={key}
                optionKey={key}
                label={label}
                isBoolean={isBoolean}
                defaultValue={
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  compressionOptions[key] ?? (defaultValue as any)
                }
                onChange={(key, value) => {
                  const newOptions = { ...compressionOptions, [key]: value };
                  setCompressionOptions(newOptions);
                }}
                inputType={inputType}
              />
            )
          )}
        </div>
        {/* <div className="flex justify-end mt-2">
          <button
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Save Settings
          </button>
        </div> */}
      </div>
    </div>
  );
};

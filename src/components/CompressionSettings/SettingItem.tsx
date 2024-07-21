import React, { useState, ChangeEvent } from "react";
import { CompressionOptions } from "../../store";

interface SettingsItemProps {
  optionKey: keyof CompressionOptions;
  label: string;
  isBoolean: boolean;
  defaultValue: number | boolean;
  inputType?: "number" | "text";
  onChange: (key: keyof CompressionOptions, value: unknown) => void;
}

const SettingsItem: React.FC<SettingsItemProps> = ({
  optionKey,
  label,
  isBoolean,
  defaultValue,
  inputType,
  onChange,
}) => {
  const [value, setValue] = useState<number | boolean>(defaultValue);

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked;
    setValue(newValue);
    if (isBoolean) {
      onChange(optionKey, newValue);
    } else {
      if (newValue === false) {
        onChange(optionKey, null);
      }
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = isBoolean ? e.target.checked : e.target.valueAsNumber;
    setValue(newValue);
    onChange(optionKey, newValue);
  };

  return (
    <div className="flex items-center mb-4">
      <input
        type="checkbox"
        checked={typeof value === "boolean" ? value : !!value}
        onChange={handleCheckboxChange}
        className="w-4 h-4 text-blue-600 rounded outline-none focus:ring-blue-500"
      />
      <label
        htmlFor={optionKey.toString()}
        className="w-full ms-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      {!isBoolean && (
        <input
          type={inputType ?? "number"}
          value={typeof value === "number" ? value : ""}
          onChange={handleInputChange}
          className="ml-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-1"
          placeholder={`Enter ${label}`}
          min={0}
        />
      )}
    </div>
  );
};

export default SettingsItem;

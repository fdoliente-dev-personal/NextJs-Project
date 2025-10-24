"use client";

import React from "react";

interface TextInputProps {
  label?: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  style?: React.CSSProperties;
}

export default function TextInput({
  label,
  value,
  placeholder,
  onChange,
  style,
}: TextInputProps) {
  return (
    <div className="flex flex-col text-black mb-4" style={style}>
      {label && (
        <label className="font-medium mb-1 text-sm text-gray-700">
          {label}
        </label>
      )}
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
      />
    </div>
  );
}

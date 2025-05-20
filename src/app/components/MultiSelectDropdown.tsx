"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon, XMarkIcon, CheckIcon } from "@heroicons/react/24/solid";

type MultiSelectProps = {
  placeholder: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
};

export default function MultiSelectDropdown({
  placeholder,
  options,
  selected,
  onChange,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function toggle(option: string) {
    if (selected.includes(option)) {
      onChange(selected.filter((o) => o !== option));
    } else {
      onChange([...selected, option]);
    }
  }

  function clearAll(e: React.MouseEvent) {
    e.stopPropagation();
    onChange([]);
  }

  let display = placeholder;
  if (selected.length === 1) display = selected[0];
  else if (selected.length > 1) display = `${selected[0]} +${selected.length - 1}`;

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center bg-[#152238] text-white px-3 py-2 rounded-md w-48 justify-between"
      >
        <span className={`truncate ${selected.length === 0 ? "text-white/60" : ""}`}>
          {display}
        </span>
        <div className="flex items-center gap-1">
          {selected.length > 0 && (
            <XMarkIcon
              className="h-4 w-4 text-white/60 hover:text-white"
              onClick={clearAll}
            />
          )}
          <ChevronDownIcon className="h-4 w-4 text-white/60" />
        </div>
      </button>

      {open && (
        <div className="absolute mt-1 w-48 bg-[#152238] rounded-md shadow-lg max-h-60 overflow-auto z-10">
          <div className="px-3 py-2 text-sm font-semibold text-white/60 uppercase">
            {placeholder}
          </div>
          <div className="border-b border-white/10" />
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => toggle(opt)}
              className="w-full px-3 py-2 text-left flex justify-between hover:bg-[#1f2a44]"
            >
              <span className="truncate">{opt}</span>
              {selected.includes(opt) && <CheckIcon className="h-5 w-5 text-blue-500" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/24/solid";

type Props = {
  placeholder?: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
};

export default function SingleSelectDropdown({
  placeholder = "Any",
  options,
  value,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center bg-[#152238] text-white px-3 py-2 rounded-md w-40 justify-between"
      >
        <span className={value === placeholder ? "text-white/60" : ""}>
          {value}
        </span>
        <ChevronDownIcon className="h-5 w-5 text-white/60" />
      </button>

      {open && (
        <div className="absolute mt-1 w-40 bg-[#152238] rounded-md shadow-lg max-h-60 overflow-auto z-10">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className="w-full px-3 py-2 text-left flex justify-between hover:bg-[#1f2a44]"
            >
              <span className={value === opt ? "text-white" : ""}>{opt}</span>
              {value === opt && <CheckIcon className="h-5 w-5 text-blue-500" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

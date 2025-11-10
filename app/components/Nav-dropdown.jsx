"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Caret from "./icons/Caret";

export const NavDropdown = ({ label, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickAway = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickAway);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickAway);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        className="flex items-center gap-1 hover:underline underline-offset-2 transition-all"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {label}
        <Caret
          color="#fff"
          className={`size-3 transition ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 z-50 mt-2 min-w-[220px] rounded-lg border border-white/10 bg-bgSecondary p-3 shadow-lg">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-md px-3 py-2 text-sm hover:bg-white/10 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

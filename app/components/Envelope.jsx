"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@headlessui/react";
// import { Textarea } from "@/components/ui/textarea";

export default function Envelope() {
  const [isOpening, setIsOpening] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState(
    "Beautiful design\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in ipsum turpis. Vestibulum lobortis purus at ligula consectetur lacinia. Donec volutpat metus id pharetra auctor. Nulla tristique, lorem sed laoreet vehicula, erat mi sollicitudin dui, efficitur metus nisl et ex."
  );
  const [isFirstVisit, setIsFirstVisit] = useState(null);

  // Safe effect that runs only once on mount
  useEffect(() => {
    const stored = localStorage.getItem("isFirstVisit");
    console.log("before change: ", stored);
    if (!stored) {
      localStorage.setItem("isFirstVisit", "true");
      setIsFirstVisit("true");
    } else {
      localStorage.setItem("isFirstVisit", "false");
      setIsFirstVisit("false");
    }
    console.log("after change: ", localStorage.getItem("isFirstVisit"));
  }, []);

  // ✅ Only return null after all hooks are called
  //   if (isFirstVisit === null || isFirstVisit === "false") return null;

  const handleEnvelopeClick = () => {
    if (!isOpening && !isOpen) {
      setIsOpening(true);
      setTimeout(() => {
        setIsOpen(true);
        setIsOpening(false);
      }, 1800);
    }
  };

  const handleReset = () => {
    setIsOpen(false);
    setIsOpening(false);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-bgSecondary to-slate-900 p-8">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="envelope"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative cursor-pointer"
            onClick={handleEnvelopeClick}
            style={{ perspective: "1000px" }}
          >
            {/* Envelope Container */}
            <div className="relative w-80 h-56">
              {/* Envelope Back (Main Body) */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-lg" />

              {/* Card Content Inside Envelope */}
              <motion.div
                className="absolute top-6 left-6 right-6 bottom-6 bg-bgSecondary rounded shadow-md p-4 overflow-hidden"
                animate={
                  isOpening
                    ? { y: -30, scale: 1.05, rotateX: 5 }
                    : { y: 0, scale: 1, rotateX: 0 }
                }
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
              >
                <div className="text-gray-800 text-lg font-semibold mb-2">
                  Beautiful design
                </div>
                <div className="text-gray-600 text-sm leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                </div>
                <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                  <span className="text-amber-800 text-xs font-serif">td</span>
                </div>
              </motion.div>

              {/* Envelope Front Flaps (Left and Right) */}
              <div className="absolute inset-0 pointer-events-none">
                <div
                  className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-blue-500 to-blue-700 origin-top-right"
                  style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }}
                />
                <div
                  className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-500 to-blue-700 origin-top-left"
                  style={{ clipPath: "polygon(100% 0, 0 50%, 100% 100%)" }}
                />
              </div>

              {/* Envelope Top Flap with Perspective Wrapper */}
              <div
                className="absolute top-0 left-0 w-full h-32 z-20 overflow-visible"
                style={{ perspective: 500 }}
              >
                <motion.div
                  className="w-full h-full bg-gradient-to-br from-[#181a22] to-[#203e6e] shadow-md"
                  style={{
                    clipPath: "polygon(0 0, 50% 102%, 100% 0)",
                    transformOrigin: "top center",
                    transformStyle: "preserve-3d",
                  }}
                  initial={false}
                  animate={isOpening ? { rotateX: -180 } : { rotateX: 0 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              </div>

              {/* Envelope Bottom Flap (static) */}
              <div className="absolute bottom-0 left-0 w-full h-32 z-10 overflow-visible">
                <div
                  className="w-full h-full bg-gradient-to-t from-blue-300 to-[#012764] shadow-inner rounded"
                  style={{
                    clipPath: "polygon(0 100%, 50% 0, 100% 100%)",
                  }}
                />
              </div>

              {/* Mail Icon */}
              <div className="absolute bottom-4 right-4 text-blue-100 z-10">
                {/* <Mail className="w-6 h-6" /> */}
              </div>
            </div>

            {!isOpening && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center mt-4 text-gray-600"
              >
                Click to open the envelope
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="card"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: -50 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-96 bg-bgSecondary rounded-xl shadow-2xl p-8 relative text-gray-100"
          >
            {/* Logo/Badge */}
            <div className="absolute top-6 right-6 w-16 h-16 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center border-2 border-amber-300">
              <span className="text-amber-800 text-sm font-serif italic">
                td
              </span>
            </div>

            {/* Editable Content */}
            <div className="pr-20">
              {isEditing ? (
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full h-64 text-gray-800 resize-none border-none p-0 focus:ring-0 text-lg leading-relaxed"
                  placeholder="Write your message here..."
                />
              ) : (
                <div className="whitespace-pre-wrap text-gray-200 text-lg leading-relaxed min-h-64">
                  {message.split("\n").map((line, index) => (
                    <div
                      key={index}
                      className={
                        index === 0 ? "font-semibold text-xl mb-4" : "mb-2"
                      }
                    >
                      {line}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                {/* <Edit3 className="w-4 h-4" /> */}
                {isEditing ? "Save" : "Edit"}
              </Button>
              <Button onClick={handleReset} variant="outline" size="sm">
                Close
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

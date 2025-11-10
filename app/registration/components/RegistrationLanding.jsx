"use client";
import Footer from "@/app/components/Footer";
import Nav from "@/app/components/Nav";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const RegistrationLanding = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Nav />
      <main className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-6xl mx-auto w-full">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Choose Your Registration Type
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
              Select the registration option that best suits your participation
              goals
            </p>

            {/* Already Registered Button */}
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-950 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Already Registered? Claim Your Delegate ID Here
            </button>
          </div>

          {/* Registration Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
            <motion.div
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
              className="rounded-2xl"
            >
              <Link
                href={"/registration/active"}
                className="group relative block h-full overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-accent/50"
              >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 bg-[url('/active.webp')] bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40 group-hover:from-black/90 group-hover:via-black/80 transition-all duration-200"></div>

                {/* Content */}
                <div className="relative z-10 p-8 min-h-[20rem] flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/90 text-white">
                      Most Popular
                    </span>
                    <svg
                      className="w-6 h-6 text-white/80 transition-all group-hover:text-white group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      Active Participant
                    </h3>
                    <p className="text-gray-200 text-sm leading-relaxed mb-4">
                      Compete against other delegates in exciting challenges.
                      Winners take home amazing prizes and recognition! 🏆
                    </p>

                    <div className="flex flex-wrap gap-2 mt-4">
                      <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white border border-white/20">
                        Competitive
                      </span>
                      <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white border border-white/20">
                        Prizes
                      </span>
                      <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white border border-white/20">
                        Certificate
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
              className="rounded-2xl"
            >
              <Link
                href={"/registration/passive"}
                className="group relative block h-full overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-accent/50"
              >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 bg-[url('/posterpresentation.jpg')] bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40 group-hover:from-black/90 group-hover:via-black/80 transition-all duration-200"></div>

                {/* Content */}
                <div className="relative z-10 p-8 min-h-[20rem] flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/90 text-white">
                      Observer
                    </span>
                    <svg
                      className="w-6 h-6 text-white/80 transition-all group-hover:text-white group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      Passive Delegate
                    </h3>
                    <p className="text-gray-200 text-sm leading-relaxed mb-4">
                      Watch, learn, and support participants. Perfect for those
                      who want to observe and network! 🎓
                    </p>

                    <div className="flex flex-wrap gap-2 mt-4">
                      <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white border border-white/20">
                        Learn
                      </span>
                      <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white border border-white/20">
                        Network
                      </span>
                      <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white border border-white/20">
                        Support
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
              className="rounded-2xl md:col-span-2 lg:col-span-1"
            >
              <Link
                href={"/registration/amboss"}
                className="group relative block h-full overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-accent/50"
              >
                {/* Background with AMBOSS Logo */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900"></div>
                <div className="absolute inset-0 bg-[url('/Logo-teal-vertical.webp')] bg-contain bg-center bg-no-repeat opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/70 transition-all duration-200"></div>

                {/* Content */}
                <div className="relative z-10 p-8 min-h-[20rem] flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-teal-400/90 text-teal-950">
                      Workshop
                    </span>
                    <svg
                      className="w-6 h-6 text-white/80 transition-all group-hover:text-white group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      AMBOSS Workshop
                    </h3>
                    <p className="text-gray-100 text-sm leading-relaxed mb-4">
                      Master medical knowledge with expert-led sessions. Get
                      essential exam insights and study strategies! ✨
                    </p>

                    <div className="flex flex-wrap gap-2 mt-4">
                      <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white border border-white/20">
                        Expert-Led
                      </span>
                      <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white border border-white/20">
                        Exam Prep
                      </span>
                      <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white border border-white/20">
                        Resources
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-in zoom-in-95 duration-200">
                {/* Close Button */}
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                {/* Modal Content */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <svg
                      className="w-8 h-8 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Already Registered?
                  </h2>
                  <p className="text-gray-600 text-sm">
                    If you&apos;ve already completed your registration, you can
                    claim your delegate ID and proceed to payment.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Link
                    href="/payment/v2"
                    className="block w-full py-3 px-4 bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent text-white font-semibold rounded-lg transition-all text-center"
                    onClick={() => setShowModal(false)}
                  >
                    Go to Payment Portal
                  </Link>
                  <Link
                    href="/error?msg=Please enter your details to retrieve your registration"
                    className="block w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-all text-center"
                    onClick={() => setShowModal(false)}
                  >
                    Retrieve Registration Details
                  </Link>
                </div>

                <p className="text-xs text-gray-500 text-center mt-6">
                  Lost your delegate ID? Contact support at{" "}
                  <a
                    href="tel:+918700621534"
                    className="text-accent font-medium hover:underline"
                  >
                    +91 8700621534
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default RegistrationLanding;

"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Menu from "./icons/Menu";
import Caret from "./icons/Caret";
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import Cancel from "./icons/Cancel";
import { motion } from "framer-motion";
import Image from "next/image";

const Nav = ({ bg }) => {
  let [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }
  const path = usePathname();
  return (
    <>
      <motion.div
        initial={{
          opacity: 0,
          y: -20,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            bounce: 0,
          },
        }}
        viewport={{ once: true }}
        className={`flex items-center justify-between bg-bgNav shadow-bgSecondary drop-shadow`}
      >
        <div className="px-4 py-2 lg:py-3 -translate-x-3">
          <Link href={"/"}>
            <Image
              height={45}
              width={90}
              src={"/kriti_logo.png"}
              alt="kritikmc logo"
              className="aspect-video"
            />
          </Link>
        </div>
        <div className="flex items-center gap-3 mr-4">
          <Link
            href={"/registration"}
            className="text-xs font-bold text-accent underline underline-offset-1 block lg:hidden"
          >
            Register Now!
          </Link>
          <div className="hidden lg:block">
            <ul className="font-semibold text-black text-lg flex h-full items-center gap-6">
              <li>
                <Link
                  className="hover:underline underline-offset-2 transition-all"
                  href={"/"}
                >
                  home.
                </Link>
              </li>
              <li>
                <Link
                  className="hover:underline underline-offset-2 transition-all"
                  href={"/events"}
                >
                  events.
                </Link>
              </li>
              <li>
                <Link
                  className="hover:underline underline-offset-2 transition-all"
                  href={"/events-itinerary"}
                >
                  events-itinerary.
                </Link>
              </li>
              <li>
                <Link
                  className="hover:underline underline-offset-2 transition-all"
                  href={"/archives"}
                >
                  archives.
                </Link>
              </li>
              <li>
                <Link
                  className="hover:underline underline-offset-2 transition-all"
                  href={"/chronicles"}
                >
                  kakatiya chronicles.
                </Link>
              </li>
              <li>
                <Link
                  className="hover:underline underline-offset-2 transition-all"
                  href={"/alumni"}
                >
                  alumni.
                </Link>
              </li>
              <li>
                <Link
                  className="hover:underline underline-offset-2 transition-all"
                  href={"/about"}
                >
                  about us.
                </Link>
              </li>
              <li>
                <Link
                  className="hover:underline underline-offset-2 transition-all"
                  href={"/contact"}
                >
                  contact us.
                </Link>
              </li>

              <li>
                {" "}
                <Link
                  href={"/registration"}
                  className="text-sm font-bold text-accent hover:bg-accent hover:text-white transition-colors py-2 px-4 bg-accent2/10 rounded-lg hidden lg:block lg:text-base"
                >
                  Register Now!
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center lg:hidden">
            <button aria-label="menu button" onClick={open}>
              <Menu />
            </button>
            <Transition appear show={isOpen}>
              <Dialog
                as="div"
                className="relative z-[100] focus:outline-none"
                onClose={close}
              >
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center ">
                    <TransitionChild
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 transform-[scale(95%)]"
                      enterTo="opacity-100 transform-[scale(100%)]"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 transform-[scale(100%)]"
                      leaveTo="opacity-0 transform-[scale(95%)]"
                    >
                      <DialogPanel className="w-full rounded-xl px-4 py-2 bg-bgNav h-screen">
                        <DialogTitle
                          as="div"
                          className="text-base/7 font-medium text-black flex justify-between items-center"
                        >
                          <Link
                            href={"/"}
                            onClick={() => {
                              if (path === "/") {
                                close();
                              }
                            }}
                          >
                            <div className="-translate-x-2 py-2">
                              <Image
                                height={90}
                                width={90}
                                src={"/kriti_logo.png"}
                                alt="kritikmc logo"
                                className="h-full w-full object-cover"
                              />
                            </div>{" "}
                          </Link>
                          <Button
                            className={" self-start py-1"}
                            onClick={close}
                          >
                            <Cancel size={28} />
                          </Button>
                        </DialogTitle>
                        <div className="ml-2">
                          <ul className="font-semibold text-black ml-3 mt-3 text-lg">
                            <li className="flex items-center gap-1 mt-1">
                              <Caret className="size-[10px]" color={"#ddd"} />
                              <Link
                                href={"/"}
                                onClick={() => {
                                  if (path === "/") {
                                    close();
                                  }
                                }}
                              >
                                home.
                              </Link>
                            </li>
                            <li className="flex items-center gap-1 mt-1">
                              <Caret className="size-[10px]" color={"#ddd"} />
                              <Link href={"/about"}>about us.</Link>
                            </li>
                            <li className="flex items-center gap-1 mt-1">
                              <Caret className="size-[10px]" color={"#ddd"} />
                              <Link href={"/events"}>events.</Link>
                            </li>
                            <li className="flex items-center gap-1 mt-1">
                              <Caret className="size-[10px]" color={"#ddd"} />
                              <Link href={"/events-itinerary"}>
                                events itinerary.
                              </Link>
                            </li>
                            <li className="flex items-center gap-1 mt-1">
                              <Caret className="size-[10px]" color={"#ddd"} />
                              <Link href={"/archives"}>archives.</Link>
                            </li>
                            <li className="flex items-center gap-1 mt-1">
                              <Caret className="size-[10px]" color={"#ddd"} />
                              <Link href={"/alumni"}>alumni.</Link>
                            </li>
                            <li className="flex items-center gap-1 mt-1">
                              <Caret className="size-[10px]" color={"#ddd"} />
                              <Link href={"/contact"}>contact us.</Link>
                            </li>
                          </ul>
                          <div className="mt-4">
                            <h5>Magazine</h5>
                            <ul className="font-semibold text-black ml-3 mt-3 text-lg">
                              <li className="flex items-center gap-1 mt-1">
                                <Caret className="size-[10px]" color={"#ddd"} />
                                <Link href={"/chronicles"}>
                                  kakatiya chronicles.
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </DialogPanel>
                    </TransitionChild>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Nav;

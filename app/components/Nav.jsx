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
import { NavDropdown } from "./Nav-dropdown";

const Nav = ({ bg }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null); // Add state for which dropdown is open
  const path = usePathname();

  const eventLinks = [
    { label: "Overview", href: "/events" },
    { label: "Itinerary", href: "/events-itinerary" },
    { label: "Kakatiya Chronicles", href: "/chronicles" },
    { label: "Archives", href: "/archives" },
  ];

  const registrationLinks = [
    { label: "Overview", href: "/registration" },
    { label: "Active Delegates", href: "/registration/active" },
    { label: "Passive Delegates", href: "/registration/passive" },
    { label: "Workshop", href: "/registration/workshop" },
    { label: "Check Status", href: "/payment/status" },
    // { label: "Payment Portal", href: "/payment/v2" },
    // { label: "Confirmation Summary", href: "/success" },
  ];

  const desktopLinks = [
    { label: "home.", href: "/" },
    { label: "events.", menu: eventLinks },
    { label: "registration.", menu: registrationLinks },
    { label: "alumni.", href: "/alumni" },
    { label: "about us.", href: "/about" },
    { label: "contact us.", href: "/contact" },
  ];

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const handleNavClose = () => {
    close();
  };

  const containerClass = `relative z-[60] isolate flex w-full items-center justify-between overflow-visible shadow-bgSecondary drop-shadow text-white bg-bgSecondary`;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, bounce: 0 },
        }}
        viewport={{ once: true }}
        className={containerClass}
      >
        <div className="px-4 py-2 lg:py-3 -translate-x-3">
          <Link href="/">
            <Image
              height={45}
              width={90}
              src="/kriti_logo_dark.png"
              alt="kritikmc logo"
              className="aspect-video"
            />
          </Link>
        </div>
        <div className="flex items-center gap-3 mr-4">
          <Link
            href="/registration"
            className="text-sm font-bold text-rose-400 underline underline-offset-1 block lg:hidden"
          >
            Register Now!
          </Link>
          <div className="hidden lg:block overflow-visible">
            <ul className="flex h-full items-center gap-6 text-lg font-medium text-white">
              {desktopLinks.map((item) => (
                <li key={item.label}>
                  {item.menu ? (
                    <NavDropdown label={item.label} items={item.menu} />
                  ) : (
                    <Link
                      className="hover:underline underline-offset-2 transition-all"
                      href={item.href}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
              <li>
                <Link
                  href="/registration"
                  className="hidden rounded-lg bg-rose-900 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-rose-950 hover:text-rose-100 lg:block lg:text-base"
                >
                  Register Now!
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center lg:hidden">
            <button aria-label="menu button" onClick={open}>
              <Menu color="#fff" />
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
                      <DialogPanel className="w-full rounded-xl px-4 py-2 bg-bgSecondary h-screen">
                        <DialogTitle
                          as="div"
                          className="text-base/7 font-medium text-white flex justify-between items-center"
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
                                src={"/kriti_logo_dark.png"}
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
                          <ul className="font-medium text-[#eee] ml-3 mt-3 text-lg">
                            <li className="flex items-center gap-1 mt-1">
                              <Caret className="size-[10px]" color={"#eee"} />
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
                              <Caret className="size-[10px]" color={"#eee"} />
                              <Link href={"/about"} onClick={handleNavClose}>
                                about us.
                              </Link>
                            </li>
                            <li className="flex items-center gap-1 mt-1">
                              <Caret className="size-[10px]" color={"#eee"} />
                              <span>events.</span>
                            </li>
                            <li className="ml-5 flex flex-col gap-1 text-sm text-[#eee]/90">
                              {eventLinks.map((event) => (
                                <Link
                                  key={event.href}
                                  href={event.href}
                                  onClick={handleNavClose}
                                >
                                  {event.label}
                                </Link>
                              ))}
                            </li>
                            <li className="flex items-center gap-1 mt-1">
                              <Caret className="size-[10px]" color={"#eee"} />
                              <span>registration.</span>
                            </li>
                            <li className="ml-5 flex flex-col gap-1 text-sm text-[#eee]/90">
                              {registrationLinks.map((reg) => (
                                <Link
                                  key={reg.href}
                                  href={reg.href}
                                  onClick={handleNavClose}
                                >
                                  {reg.label}
                                </Link>
                              ))}
                            </li>
                            <li className="flex items-center gap-1 mt-1">
                              <Caret className="size-[10px]" color={"#eee"} />
                              <Link href={"/alumni"} onClick={handleNavClose}>
                                alumni.
                              </Link>
                            </li>
                            <li className="flex items-center gap-1 mt-1">
                              <Caret className="size-[10px]" color={"#eee"} />
                              <Link href={"/contact"} onClick={handleNavClose}>
                                contact us.
                              </Link>
                            </li>
                          </ul>
                          <div className="mt-4">
                            <h5 className="text-[#eee]">Magazine</h5>
                            <ul className="font-medium text-[#eee] ml-3 mt-3 text-lg">
                              <li className="flex items-center gap-1 mt-1">
                                <Caret className="size-[10px]" color={"#eee"} />
                                <Link
                                  href={"/chronicles"}
                                  onClick={handleNavClose}
                                >
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

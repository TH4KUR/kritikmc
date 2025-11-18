"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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
                <div className="fixed inset-0 z-10">
                  <TransitionChild
                    enter="ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute inset-0 bg-black/70" aria-hidden />
                  </TransitionChild>

                  <TransitionChild
                    enter="ease-out duration-200"
                    enterFrom="translate-y-4 opacity-0"
                    enterTo="translate-y-0 opacity-100"
                    leave="ease-in duration-150"
                    leaveFrom="translate-y-0 opacity-100"
                    leaveTo="translate-y-4 opacity-0"
                  >
                    <DialogPanel className="absolute inset-0 flex h-full w-full flex-col overflow-y-auto bg-bgSecondary px-4 py-3">
                      <DialogTitle
                        as="div"
                        className="flex items-center justify-between text-base/7 font-medium text-white"
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
                        <Button className="self-start py-1" onClick={close}>
                          <Cancel size={28} />
                        </Button>
                      </DialogTitle>
                      <div className="ml-2 flex-1 overflow-y-auto pb-16">
                        <ul className="ml-3 mt-3 text-lg font-medium text-[#eee]">
                          <li className="mt-1 flex items-center gap-1">
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
                          <li className="mt-1 flex items-center gap-1">
                            <Caret className="size-[10px]" color={"#eee"} />
                            <Link href={"/about"} onClick={handleNavClose}>
                              about us.
                            </Link>
                          </li>
                          <li className="mt-1 flex items-center gap-1">
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
                          <li className="mt-1 flex items-center gap-1">
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
                          <li className="mt-1 flex items-center gap-1">
                            <Caret className="size-[10px]" color={"#eee"} />
                            <Link href={"/alumni"} onClick={handleNavClose}>
                              alumni.
                            </Link>
                          </li>
                          <li className="mt-1 flex items-center gap-1">
                            <Caret className="size-[10px]" color={"#eee"} />
                            <Link href={"/contact"} onClick={handleNavClose}>
                              contact us.
                            </Link>
                          </li>
                        </ul>
                        <div className="mt-6">
                          <h5 className="text-[#eee]">Magazine</h5>
                          <ul className="ml-3 mt-3 text-lg font-medium text-[#eee]">
                            <li className="mt-1 flex items-center gap-1">
                              <Caret className="size-[10px]" color={"#eee"} />
                              <Link href={"/chronicles"} onClick={handleNavClose}>
                                kakatiya chronicles.
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="mt-auto flex flex-col gap-3 pt-4">
                        <Link
                          href="/registration"
                          className="rounded-2xl bg-rose-600 px-4 py-3 text-center text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-rose-900/40"
                          onClick={handleNavClose}
                        >
                          Register now
                        </Link>
                        <p className="text-center text-xs uppercase tracking-[0.2em] text-white/60">
                          Kriti · 2025
                        </p>
                      </div>
                    </DialogPanel>
                  </TransitionChild>
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

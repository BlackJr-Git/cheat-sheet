"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import {
    Bars3CenterLeftIcon,
    XMarkIcon,
    BookmarkIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

function Header() {
    const [open, setOpen] = useState(false) as [boolean, React.Dispatch<React.SetStateAction<boolean>>];

    return (
        <div className="py-4">
            <header className="flex items-center justify-between px-6 py-3 container border-2 rounded-3xl fixed top-3 left-0 right-0 z-40 backdrop-blur">
                <Link href={"/"}>
                    <Image src="/logo.png" alt="logo" width={150} height={150} />
                </Link>

                {/* Navigation Links for Desktop */}
                <nav className="hidden items-center gap-8 text-lg font-semibold md:flex">
                    {navLinks.map((link : { href: string; label: string }) => (
                        <NavLink key={link.href} href={link.href} label={link.label} />
                    ))}

                    <SignedIn>
                        <NavLink href={"/bookmark"} label={"Mes favoris"} />
                    </SignedIn>
                </nav>

                {/* User Buttons */}
                <div className="items-center gap-3 hidden md:flex">
                    <SignedOut>
                        <SignInButton>
                            <Button variant={"outline"}>Connexion</Button>
                        </SignInButton>
                        <SignUpButton>
                            <Button>S&apos;inscrire</Button>
                        </SignUpButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton>
                            <UserButton.MenuItems>
                                <UserButton.Link
                                    label="Favoris"
                                    labelIcon={<BookmarkIcon />}
                                    href="/bookmark"
                                    // onClick={() => alert("init chat")}
                                />
                            </UserButton.MenuItems>
                        </UserButton>
                    </SignedIn>
                </div>

                {/* Mobile Menu Toggle Button */}
                <Bars3CenterLeftIcon
                    className="w-8 h-8 md:hidden"
                    onClick={()   : void => setOpen(!open)}
                />
            </header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {open && <MobileHeader setOpen={setOpen} />}
            </AnimatePresence>
        </div>
    );
}

export default Header;

/* NavLink Component */
function NavLink({ href, label } : { href: string; label: string }) {
    return (
        <motion.div
            className="relative group"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Link href={href}>{label}</Link>
            <motion.span
                className="absolute left-0 bottom-0 w-full h-[2px] bg-violet-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                layoutId="underline"
            />
        </motion.div>
    );
}

/* MobileHeader Component with Animation */
function MobileHeader({ setOpen }   : { setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-between pb-12 bg-white backdrop-blur-3xl h-screen"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4 }}
        >
            <header className="flex items-center justify-between w-full px-6 py-4">
                <Link href={"/"}>
                    <Image src="/logo.png" alt="logo" width={150} height={150} />
                </Link>
                <XMarkIcon className="w-8 h-8" onClick={(): void => setOpen(false)} />
            </header>

            {/* Mobile Navigation Links */}
            <nav className="flex flex-col items-center gap-8 text-lg font-semibold">
                {navLinks.map((link: { href: string; label: string }) => (
                    <motion.div
                        key={link.href}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className="relative group"
                    >
                        <Link href={link.href} onClick={(): void => setOpen(false)}>
                            {link.label}
                        </Link>
                        <span className="absolute left-0 bottom-0 w-full h-[2px] bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                    </motion.div>
                ))}
                <SignedIn>
                    <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className="relative group"
                    >
                        <Link href={"/bookmark"} onClick={(): void => setOpen(false)}>
                            Mes favoris
                        </Link>
                        <span className="absolute left-0 bottom-0 w-full h-[2px] bg-violet-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                    </motion.div>
                </SignedIn>
            </nav>

            {/* User Buttons for Mobile */}
            <div className="flex flex-col items-center w-full gap-4 mt-8">
                <SignedOut>
                    <SignInButton>
                        <Button variant={"outline"}>Connexion</Button>
                    </SignInButton>
                    <SignUpButton>
                        <Button>S&apos;inscrire</Button>
                    </SignUpButton>
                </SignedOut>
                <SignedIn>
                    <UserButton
                        appearance={{
                            elements: { userButtonPopoverCard: "bg-violet-100" },
                        }}
                    >
                        <UserButton.MenuItems>
                            <UserButton.Link
                                label="Favoris"
                                labelIcon={<BookmarkIcon />}
                                href="/bookmark"
                                // onClick={() => alert("init chat")}
                            />
                        </UserButton.MenuItems>
                    </UserButton>
                </SignedIn>
            </div>
        </motion.div>
    );
}

// Links for the nav items
const navLinks = [
    { href: "/", label: "Acceuil" },
    { href: "/categories", label: "Categories" },
    // { href: "/blog", label: "Blog" },
];
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  ClientSafeProvider,
  LiteralUnion,
} from "next-auth/react";
import { BuiltInProviderType } from "@node_modules/next-auth/providers";

const Nav = () => {
  const { data: session } = useSession();
  type ProvidersConstraint = Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
  const [providers, setProviders] = useState<ProvidersConstraint>(null);
  const [toggleMobileNav, setToggleMobileNav] = useState<boolean>(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    setUpProviders();
  }, []);

  const handleSignOut = () => {
    signOut();
  };

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href={"/"} className="flex gap-2 flex-center">
        <Image
          src={"/assets/images/logo.png"}
          alt="Prompter Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Prompter</p>
      </Link>

      {/* Desktop Nav*/}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link
              href={"/create-prompt"}
              className="hero-join-button mx-auto hidden w-fit overflow-hidden rounded-full p-[1.2px] transition-all duration-300 dark:block hover:bg-transparent hover:shadow-[0_0_2rem_-0.5rem_#3B82F6] md:mr-0 lg:mr-auto"
            >
              <span className="inline-flex h-full w-fit items-center gap-1 rounded-full px-5 py-1.5 transition-all duration-300 bg-neutral-100 text-black">
                Create Post
              </span>
            </Link>

            <button
              type="button"
              onClick={() => handleSignOut()}
              className="outline_btn"
            >
              Sign Out
            </button>

            <Link href={"/profile"}>
              <Image
                src={session?.user.image!}
                alt="Profile"
                width={37}
                height={37}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Nav*/}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image!}
              alt="Profile"
              width={37}
              height={37}
              className="rounded-full"
              onClick={() => setToggleMobileNav((cur) => !cur)}
            />

            {toggleMobileNav && (
              <div className="dropdown">
                <Link
                  href={"/profile"}
                  className="dropdown_link"
                  onClick={() => setToggleMobileNav(false)}
                >
                  My Profile
                </Link>
                <Link
                  href={"/create-prompt"}
                  className="dropdown_link"
                  onClick={() => setToggleMobileNav(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleMobileNav(false);
                    handleSignOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;

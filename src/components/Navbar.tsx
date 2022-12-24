import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <div>
      <nav className="flex justify-center ">
        <ul className="flex gap-10 border-b-2 border-slate-300 ">
          <li className="pt-4 text-lg ">
            <Link
              className="rounded-2xl px-4 py-1 hover:border-2 hover:border-slate-700"
              href="/"
            >
              Home
            </Link>
          </li>
          <li className="pt-4 text-lg">
            <Link
              className="rounded-2xl px-4 py-1 hover:border-2 hover:border-slate-700"
              href="/posts"
            >
              Posts
            </Link>
          </li>
          {session ? (
            <li className="pt-4 text-lg">
              <Link
                className="rounded-2xl px-4 py-1 hover:bg-green-700 hover:text-white"
                href="/create-post"
              >
                Add Posts
              </Link>
            </li>
          ) : null}
          <li className="pb-4 pt-3 text-lg">
            {!session ? (
              <button
                className="rounded-2xl  px-3 py-1 hover:bg-slate-700 hover:text-white"
                onClick={() => signIn("google", { callbackUrl: "/" })}
              >
                Login
              </button>
            ) : (
              <button
                className="rounded-2xl   px-3 py-1 hover:bg-rose-700 hover:text-white"
                onClick={() => signOut()}
              >
                Logout
              </button>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;

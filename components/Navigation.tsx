import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Avatar from "react-avatar";
import { useState } from "react";

export const Navigation = () => {
  const [modal, setModal] = useState(false);
  const session = useSession();
  return (
    <>
      <div className="flex items-center pb-5">
        <div className="flex-1">
          <Link href="/">
            <a className="block w-40">
              <img src="/logo.webp" />
            </a>
          </Link>
        </div>
        <div>
          <Link href="/quotes/new">
            <a className="btn btn-add text-xl">New quote</a>
          </Link>
        </div>
        <div className="ml-5 text-center">
          <Avatar
            name={session.data?.user?.name ?? "One Day Paint"}
            src="/avatar.png"
            size="64"
            round={true}
            onClick={() => setModal(true)}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
      <div
        className={`fixed w-full h-full top-0 left-0 bg-pink ${
          modal ? "" : "hidden"
        }`}
      >
        <div className="h-full grid grid-cols-1 place-content-center text-center">
          <div
            className="w-72 py-2 my-2 mx-auto bg-white border border-pink-100 rounded cursor-pointer"
            onClick={() => signOut()}
          >
            Log out
          </div>
        </div>
        <div
          className="absolute top-5 right-8 px-4 py-2 bg-red-400 text-white text-lg rounded-3xl cursor-pointer"
          onClick={() => setModal(false)}
        >
          ✖
        </div>
      </div>
    </>
  );
};

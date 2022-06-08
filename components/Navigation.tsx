import Link from "next/link";
import { useSession } from "next-auth/react";

export const Navigation = () => {
  const session = useSession();
  return (
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
        <div className="w-16 p-2 mb-1 bg-white rounded">
          <img src="/painter.png" alt={session.data?.user?.name ?? "Panda"} />
        </div>
        <div className="text-sm">{session.data?.user?.name}</div>
      </div>
    </div>
  );
};

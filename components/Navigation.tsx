import Link from "next/link";

export const Navigation = () => {
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
    </div>
  );
};

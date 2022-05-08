import Link from "next/link";

export const Navigation = () => {
  return (
    <div className="navbar bg-base-100 p-0">
      <div className="flex-1 text-4xl">
        <Link href="/">
          <a>One Day Paint</a>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          <li className="ml-4">
            <Link href="/quotes/new">
              <a className="btn btn-primary">New quote</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

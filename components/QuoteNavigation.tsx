import Link from "next/link";
import { useRouter } from "next/router";

export const QuoteNavigation = () => {
  const router = useRouter();
  const id = router.asPath.split("/")[2];
  const areasActive = router.pathname.indexOf("areas") !== -1;
  const extrasActive = router.pathname.indexOf("extras") !== -1;
  return (
    <div className="btn-group w-full">
      <Link href={`/quotes/${id}`}>
        <a
          className={`btn ${
            !(areasActive || extrasActive) ? "btn-active" : ""
          }`}
        >
          Details
        </a>
      </Link>
      <Link href={`/quotes/${id}/areas`}>
        <a className={`btn ${areasActive ? "btn-active" : ""}`}>Areas</a>
      </Link>
      <Link href={`/quotes/${id}/extras`}>
        <a className={`btn ${extrasActive ? "btn-active" : ""}`}>Extras</a>
      </Link>
    </div>
  );
};

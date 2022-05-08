import Link from "next/link";
import { useRouter } from "next/router";

export const QuoteNavigation = () => {
  const router = useRouter();
  const id = router.asPath.split("/")[2];

  const tabOneActive = () => {
    return !(
      tabTwoActive() ||
      tabThreeActive() ||
      tabFourActive() ||
      tabFiveActive()
    );
  };
  const tabTwoActive = () => {
    return router.pathname.indexOf("areas") !== -1;
  };
  const tabThreeActive = () => {
    return router.pathname.indexOf("extras") !== -1;
  };
  const tabFourActive = () => {
    return router.pathname.indexOf("summary") !== -1;
  };
  const tabFiveActive = () => {
    return router.pathname.indexOf("email") !== -1;
  };
  return (
    <div className="tabs w-full my-8 bg-pink-200">
      <div
        className={`tab bordered flex-auto px-0 ${
          tabOneActive() ? "tab-active" : ""
        }`}
      >
        <Link href={`/quotes/${id}/`}>
          <a>Customer details</a>
        </Link>
      </div>
      <div
        className={`tab bordered flex-auto px-0 ${
          tabTwoActive() ? "tab-active" : ""
        }`}
      >
        <Link href={`/quotes/${id}/areas`}>
          <a>Areas to paint</a>
        </Link>
      </div>
      <div
        className={`tab bordered flex-auto px-0 ${
          tabThreeActive() ? "tab-active" : ""
        }`}
      >
        <Link href={`/quotes/${id}/extras`}>
          <a>Extras</a>
        </Link>
      </div>
      <div
        className={`tab bordered flex-auto px-0 ${
          tabFourActive() ? "tab-active" : ""
        }`}
      >
        <Link href={`/quotes/${id}/summary`}>
          <a>Quote summary</a>
        </Link>
      </div>
      <div
        className={`tab bordered flex-auto px-0 ${
          tabFiveActive() ? "tab-active" : ""
        }`}
      >
        <Link href={`/quotes/${id}/email`}>
          <a>Email customer</a>
        </Link>
      </div>
    </div>
  );
};

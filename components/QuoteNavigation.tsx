import Link from "next/link";
import { useRouter } from "next/router";

export const QuoteNavigation = () => {
  const router = useRouter();
  const id = router.asPath.split("/")[2];
  const tab = "block py-3 text-center text-sm rounded cursor-pointer";
  const active = "bg-pink-100 text-pink-300";
  const inactive = "text-pink-300";

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
    return router.pathname.indexOf("review") !== -1;
  };
  return (
    <div className="p-2 mb-5 grid grid-cols-5 bg-white border border-pink-100 rounded shadow">
      <div>
        <Link href={`/quotes/${id}/`}>
          <a className={`${tab} ${tabOneActive() ? active : inactive}`}>
            Customer
          </a>
        </Link>
      </div>
      <div>
        <Link href={`/quotes/${id}/areas`}>
          <a className={`${tab} ${tabTwoActive() ? active : inactive}`}>
            Areas
          </a>
        </Link>
      </div>
      <div>
        <Link href={`/quotes/${id}/extras`}>
          <a className={`${tab} ${tabThreeActive() ? active : inactive}`}>
            Extras
          </a>
        </Link>
      </div>
      <div>
        <Link href={`/quotes/${id}/summary`}>
          <a className={`${tab} ${tabFourActive() ? active : inactive}`}>
            Summary
          </a>
        </Link>
      </div>
      <div>
        <Link href={`/quotes/${id}/review`}>
          <a className={`${tab} ${tabFiveActive() ? active : inactive}`}>
            Review
          </a>
        </Link>
      </div>
    </div>
  );
};

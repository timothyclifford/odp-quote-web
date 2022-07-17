import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Puff } from "svg-loaders-react";

export const QuoteNavigation = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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
    <>
      <div className="p-2 mb-5 grid grid-cols-5 bg-white border border-pink-100 rounded shadow">
        <div>
          <Link href={`/quotes/${id}/`}>
            <a
              className={`${tab} ${tabOneActive() ? active : inactive}`}
              onClick={() => setLoading(true)}
            >
              Customer
            </a>
          </Link>
        </div>
        <div>
          <Link href={`/quotes/${id}/areas`}>
            <a
              className={`${tab} ${tabTwoActive() ? active : inactive}`}
              onClick={() => setLoading(true)}
            >
              Areas
            </a>
          </Link>
        </div>
        <div>
          <Link href={`/quotes/${id}/extras`}>
            <a
              className={`${tab} ${tabThreeActive() ? active : inactive}`}
              onClick={() => setLoading(true)}
            >
              Extras
            </a>
          </Link>
        </div>
        <div>
          <Link href={`/quotes/${id}/summary`}>
            <a
              className={`${tab} ${tabFourActive() ? active : inactive}`}
              onClick={() => setLoading(true)}
            >
              Summary
            </a>
          </Link>
        </div>
        <div>
          <Link href={`/quotes/${id}/review`}>
            <a
              className={`${tab} ${tabFiveActive() ? active : inactive}`}
              onClick={() => setLoading(true)}
            >
              Review
            </a>
          </Link>
        </div>
      </div>
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full bg-white flex flex-col justify-center items-center">
          <div className="m-2">
            <Puff stroke="#94D1CA" />
          </div>
          <div>Loading</div>
        </div>
      )}
    </>
  );
};

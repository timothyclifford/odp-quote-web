import { PropsWithChildren } from "react";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";
import { useSession } from "next-auth/react";

export const Layout = ({ children }: PropsWithChildren<{}>) => {
  const session = useSession({ required: true });
  if (session.status === "loading") {
    return <div>Loading or not authenticated...</div>;
  }
  return (
    <main>
      <div
        className="fixed w-full h-full top-0 left-0 -z-10"
        style={{
          backgroundImage: "url('/splat-top.png')",
          backgroundRepeat: "no-repeat",
          backgroundPositionY: "top",
          backgroundPositionX: "right",
          backgroundSize: "95%",
        }}
      ></div>
      <div
        className="fixed w-full h-full top-0 left-0 -z-10"
        style={{
          backgroundImage: "url('/splat-bottom.png')",
          backgroundRepeat: "no-repeat",
          backgroundPositionY: "bottom",
          backgroundPositionX: "15px",
          backgroundSize: "55%",
        }}
      ></div>
      <div className="container mx-auto p-5">
        <Navigation></Navigation>
        {children}
      </div>
      <Footer></Footer>
    </main>
  );
};

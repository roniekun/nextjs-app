"use client";
import Link from "next/link";
import Container from "../lib/ui/container";
import { useMenu } from "@/provider/context/MenuContext";
import { twMerge } from "tailwind-merge";
import { useAppSelector, useAppDispatch } from "@/app/redux/hooks/hooks";
import { setOpenSearch } from "@/app/redux/slices/searchSlice";
import { usePathname } from "next/navigation";

type Props = {
  className?: string;
};

const Logo: React.FC<Props> = ({ className }) => {
  const { setToggleMenu } = useMenu();
  const { isOpenSearch } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  // useEffect(() => {
  //   const handleRouteChange = (url: string) => {
  //     if (url === "/") {
  //       window.scrollTo({ top: 0, behavior: "smooth" });
  //     }
  //   };

  //   router.events.on("routeChangeComplete", handleRouteChange);

  //   return () => {
  //     router.events.off("routeChangeComplete", handleRouteChange);
  //   };
  // }, [router.events]);

  const handleClick = (pathname: string) => {
    setToggleMenu(false);
    if (isOpenSearch) {
      dispatch(setOpenSearch(false));
    }
    if (pathname == "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Container className="p-0 my-1 font-normal text-lg leading-tight  ">
      <Link
        onClick={() => handleClick(pathname)}
        className={twMerge(``, className)}
        style={{ fontFamily: "Neue Bit, sans-serif" }}
        href="/"
      >
        R&bull;Next
      </Link>
    </Container>
  );
};

export default Logo;

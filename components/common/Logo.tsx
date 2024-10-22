"use client";
import Link from "next/link";
import Container from "../lib/ui/container";
import { useMenu } from "@/provider/context/MenuContext";
import { twMerge } from "tailwind-merge";
import { useAppSelector } from "@/store/hooks/hooks";
import { useAppDispatch } from "@/store/hooks/hooks";
import { setOpenSearch } from "@/store/slices/searchSlice";
type Props = {
  className?: string;
};

const Logo: React.FC<Props> = ({ className }) => {
  const { setToggleMenu } = useMenu();
  const { isOpenSearch } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    setToggleMenu(false);
    if (isOpenSearch) {
      dispatch(setOpenSearch(false));
    }
  };

  return (
    <Container className="p-0 my-1 font-normal text-lg leading-tight  ">
      <Link
        onClick={handleClick}
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

import Link from "next/link";
import logo from "../../../public/images/logo.jpg";
import Image from "next/image";
import { Julee } from "next/font/google";



export const julee = Julee({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const Header = () => {
  return (
    <header
      className={`flex w-full justify-between items-center  bg-dark1 px-[10%] lg:px-[20%] py-6 border-b border-b-[#282828] shadow-lg ${julee.className}`}
    >
      <div>
        <Link href={"/"} className=" flex gap-2 items-center">
          <Image
            src={logo}
            alt="logo"
            placeholder="blur"
            className="rounded-md"
          />
          <h1 className="text-white font-black text-3xl">
            e<span className="text-primary">X</span>
            and
            <span className="text-primary">O</span>e
          </h1>
        </Link>
      </div>
      <div></div>
    </header>
  );
};

export default Header;

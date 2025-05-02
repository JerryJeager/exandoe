import Image from "next/image";
import logo from "../../public/images/logo.jpg"

export default function Home() {
  return (
    <div className="">
        <Image
          className=""
          src={logo}
          alt="exendoe logo"
          width={61}
          height={46}
          priority
        />
       
    </div>
  );
}

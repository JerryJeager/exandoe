import Image from "next/image";
import { Julee } from "next/font/google";

import humans from "../../public/images/hero.png";
import Link from "next/link";
import Header from "@/components/layout/Header";

export const julee = Julee({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export default function Home() {
  return (
    <>
      <Header />
      <main className={`bg-dark1 h-screen px-[10%] lg:px-[20%] ${julee.className}`}>
        <section className="flex flex-col-reverse lg:flex-row items-center justify-between gap-2  lg:pt-12 text-white">
          <div className="lg:w-[50%]">
            <h2 className="text-2xl lg:text-4xl font-bold">
              Classic X and O. Reimagined for real-time play
            </h2>
            <p className="lg:pt-8 mb-2 lg:text-2xl">
              Challenge friends or players online to fast-paced, turn-based
              strategy. No downloads, just play.
            </p>
            <Link href={"/auth/signup"}>
              <button className="py-2 px-4 lg:text-3xl rounded-md bg-primary text-white font-bold mt-2">
                Play Now
              </button>
            </Link>
          </div>
          <div>
            <Image
              src={humans}
              alt="users image"
              placeholder="blur"
              width={500}
            />
          </div>
        </section>
      </main>
    </>
  );
}

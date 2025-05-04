import Image from "next/image";

import humans from "../../public/images/hero.png";
import Link from "next/link";
import Header, { julee } from "@/components/layout/Header";

export default function Home() {
  return (
    <div className="h-screen bg-dark1">
      <Header />
      <main className={`  px-[10%] lg:px-[20%] ${julee.className}`}>
        <section className="flex flex-col-reverse lg:flex-row items-center justify-between gap-2  lg:pt-12 text-white">
          <div className="lg:w-[50%]">
            <h2 className="text-2xl lg:text-4xl font-bold">
              Classic X and O. Reimagined for real-time play
            </h2>
            <p className="lg:pt-8 mb-2 lg:text-2xl">
              Challenge friends or players online to fast-paced, turn-based
              strategy. No downloads, just play.
            </p>
            <Link href={"/lobby"}>
              <button className="py-2 px-4 lg:text-3xl rounded-md bg-primary1 text-white font-bold mt-2">
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
    </div>
  );
}

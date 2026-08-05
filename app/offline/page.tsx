import RetryButton from "@/components/offline/RetryButton";
import { Gamepad2, Wifi } from "lucide-react";
import Link from "next/link";

function Page() {
  return (
    <div className="flex gap-6 items-center justify-center text-center flex-col">
      <Wifi className="text-destructive" size={80} />
      <h1>
        You&apos;re <span className="gradient-text">Offline</span>
      </h1>
      <p>
        It looks like you&apos;ve lost your internet connection. Don&apos;t
        worry, you can still play a game while you wait to reconnect.
      </p>
      <div className="flex flex-wrap gap-4 items-center justify-center">
        <Link
          href={"/pong.html"}
          className="bg-(image:--primary-gradient) py-3 px-6 flex items-center hover:shadow-neon-hover hover:-translate-y-0.5 rounded-full gap-2 font-bold text-sm"
        >
          <Gamepad2 /> Play a game?
        </Link>
        <RetryButton />
      </div>
    </div>
  );
}

export default Page;

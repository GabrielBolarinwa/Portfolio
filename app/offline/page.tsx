import LinkTag from "@/components/LinkTag";
import RetryButton from "@/components/offline/RetryButton";
import { Gamepad2, Wifi } from "lucide-react";

function Page() {
  return (
    <div className="flex gap-6 items-center justify-center text-center flex-col">
      <Wifi className="text-destructive animate-float" size={80} />
      <h1>
        You&apos;re <span className="gradient-text">Offline</span>
      </h1>
      <p>
        It looks like you&apos;ve lost your internet connection. Don&apos;t
        worry, you can still play a game while you wait to reconnect.
      </p>
      <div className="flex flex-wrap gap-4 items-center justify-center">
        <LinkTag href={"/pong.html"} className="font-bold! text-sm!">
          <Gamepad2 /> Play a game?
        </LinkTag>
        <RetryButton />
      </div>
    </div>
  );
}

export default Page;

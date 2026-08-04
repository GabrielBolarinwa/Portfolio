import { BriefcaseBusiness, Home } from "lucide-react";
import Link from "next/link";

function NotFound() {
  return (
    <div
      className={
        "flex flex-col gap-6 items-center justify-center text-center max-w-[800px]"
      }
    >
      <h1
        className={
          "text-transparent bg-clip-text bg-(image:--primary-gradient) [animation:glow_3s_0.75s_ease-in-out_infinite]"
        }
      >
        404
      </h1>
      <h2>
        Lost in the{" "}
        <span className="text-transparent bg-clip-text bg-(image:--primary-gradient)">
          Void
        </span>
      </h2>
      <p className={"text-muted"}>
        The page you are looking for has drifted off into space. But since
        you&apos;re here, how about a quick game of Pong while you figure out
        your next move?
      </p>
      <div className="bg-card-background border border-white/10 rounded-md p-4 backdrop-blur-md shadow-lg">
        <iframe
          src="/pong.html"
          className={
            "block bg-black aspect-video rounded-sm border-none w-full h-[300px] md:h-[500px]"
          }
        ></iframe>
      </div>
      <div className="flex flex-wrap gap-4 items-center justify-center">
        <Link
          href={"/"}
          className="bg-(image:--primary-gradient) py-3 px-6 flex items-center hover:shadow-neon-hover hover:-translate-y-0.5 rounded-full gap-2 font-bold text-sm"
        >
          <Home /> Back to Home
        </Link>
        <Link
          href={"/projects"}
          className="border border-main-text hover:border-accent-pink hover:-translate-y-0.5 py-3 px-6 flex items-center hover:shadow-pink-hover rounded-full gap-2 font-bold text-sm hover:text-accent-pink"
        >
          <BriefcaseBusiness /> View Projects
        </Link>
      </div>
    </div>
  );
}

export default NotFound;

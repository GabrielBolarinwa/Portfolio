import LinkTag from "@/components/LinkTag";
import { BriefcaseBusiness, Home } from "lucide-react";

function NotFound() {
  return (
    <div
      className={
        "flex flex-col gap-6 items-center justify-center text-center max-w-[800px] mx-auto"
      }
    >
      <h1
        className={
          "text-transparent bg-clip-text bg-(image:--primary-gradient) animate-glow delay-75"
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
      <div className="bg-card-background w-full border border-white/10 rounded-md p-4 backdrop-blur-md shadow-lg">
        <iframe
          src="/pong.html"
          className={
            "block md:aspect-[4/3] bg-black aspect-video rounded-sm border-none w-full h-[500px]"
          }
        ></iframe>
      </div>
      <div className="flex flex-wrap gap-4 items-center justify-center">
        <LinkTag href={"/"} className=" font-bold! text-sm!">
          <Home /> Back to Home
        </LinkTag>
        <LinkTag
          href={"/projects"}
          className=" font-bold! text-sm!"
          variant="secondary"
        >
          <BriefcaseBusiness /> View Projects
        </LinkTag>
      </div>
    </div>
  );
}

export default NotFound;

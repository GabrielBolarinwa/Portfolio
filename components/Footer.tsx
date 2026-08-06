import {
  SiGithub,
  SiTelegram,
  SiWhatsapp,
} from "@icons-pack/react-simple-icons";
import {
  BriefcaseBusiness,
  Gamepad2,
  GitFork,
  Home,
  Mail,
  MapPin,
  User,
} from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="footer" id="footer" role="contentinfo">
      <section className="flex flex-col items-center w-full text-center">
        <h3 className="footer-header text-lg font-(family-name:--font-display) font-normal">
          Bolarinwa Gabriel
        </h3>
        <div className="contact-info address flex flex-wrap">
          <p className="mb-5 flex gap-2 items-center justify-center">
            <MapPin /> Okitipupa, Ondo State, Nigeria
          </p>
        </div>
        <div className="contact flex flex-wrap">
          <div className="contact-info">
            <div className="social-icons-2">
              <Link
                href="https://github.com/GabrielBolarinwa/GabrielBolarinwa"
                target="_blank"
                rel="noopener noreferrer nofollow"
                title="GitHub"
                aria-label="GitHub"
              >
                <SiGithub size={28} />
              </Link>
              <Link
                href="https://t.me/gabibola955"
                target="_blank"
                rel="noopener noreferrer nofollow"
                title="Telegram"
                aria-label="Telegram"
              >
                <SiTelegram />
              </Link>
              <Link
                href="https://wa.me/09135976371"
                rel="noopener noreferrer nofollow"
                target="_blank"
                title="Whatsapp"
                aria-label="Whatsapp"
              >
                <SiWhatsapp size={28} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className="flex flex-wrap max-sm:flex-col justify-between w-full gap-y-6">
        <section className="flex flex-col items-center flex-1 flex-wrap">
          <h3 className="footer-header">Navigation</h3>
          <ul className="flex flex-col flex-wrap max-h-27 gap-y-5 gap-x-25">
            <li className="hover:text-accent-neon">
              <Link href={"/#"} className="flex gap-3 items-center">
                <Home /> Home
              </Link>
            </li>
            <li className="hover:text-accent-neon">
              <Link href={"/about"} className="flex gap-3 items-center">
                <User /> About
              </Link>
            </li>
            <li className="hover:text-accent-neon">
              <Link href={"/projects"} className="flex gap-3 items-center">
                <BriefcaseBusiness /> Projects
              </Link>
            </li>
            <li className="hover:text-accent-neon">
              <Link href={"/contact"} className="flex gap-3 items-center">
                <Mail /> Home
              </Link>
            </li>
          </ul>
        </section>
        <section className="flex flex-col items-center flex-1 flex-wrap">
          <h3 className="footer-header">More</h3>
          <ul className="flex flex-col flex-wrap max-h-27 gap-y-5 gap-x-25 items-center">
            <li className="hover:text-accent-neon">
              <Link href={"/pong.html"} className="flex gap-3 items-center">
                <Gamepad2 /> Play a Game
              </Link>
            </li>
            <li className="hover:text-accent-neon">
              <Link
                href={"https://github.com/GabrielBolarinwa/Portfolio"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3 items-center truncate"
              >
                <GitFork /> View page repository
              </Link>
            </li>
          </ul>
        </section>
      </div>
      <p className="w-full text-center">
        Copyright &copy;{" "}
        <time id="time" dateTime={`${new Date().getFullYear()}`}>
          {new Date().getFullYear()}
        </time>{" "}
        Bolarinwa Gabriel. All Rights Reserved
      </p>
    </footer>
  );
}

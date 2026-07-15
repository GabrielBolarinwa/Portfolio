import {
  SiFacebook,
  SiGithub,
  SiWhatsapp,
  SiX,
} from "@icons-pack/react-simple-icons";
import LinkedInIcon from "@/components/svgs/LinkedIn";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="footer" id="footer" role="contentinfo">
      <p className="footer-header">Bolarinwa Gabriel</p>
      <div className="contact-info address flex flex-wrap">
        <p>
          Behind OAUSTECH Mega Campus, Okitipupa-Igbekebo Rd, Okitipupa, Nigeria
        </p>
      </div>
      <div className="contact flex flex-wrap">
        <div className="contact-info">
          <div className="social-icons-2">
            <Link
              title="Facebook"
              aria-label="Facebook"
              href="https://web.facebook.com/itzamazz.amazz"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              <SiFacebook size={28} />
            </Link>
            <Link
              href="https://x.com/GabrielBol94988"
              target="_blank"
              rel="noopener noreferrer nofollow"
              title="Twitter (X)"
              aria-label="Twitter (X)"
            >
              <SiX size={28} />
            </Link>
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
              href="https://www.linkedin.com/in/gabriel-bolarinwa-028418399"
              target="_blank"
              rel="noopener noreferrer nofollow"
              title="LinkedIn"
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
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
      <div className="contact-info contact-me flex flex-wrap">
        <p className={"gap-4"}>
          <span className="contact-me-title">Contact Me on:</span>{" "}
          <Link href="tel:+2349135976371" className="contact-link">
            Phone
          </Link>
          {" • "}
          <Link className="contact-link" href="https://wa.me/09135976371">
            Whatsapp
          </Link>
          {" • "}
          <Link className="contact-link" href="mailto:gabibola955@gmail.com">
            Email
          </Link>
        </p>
      </div>
      <div>
        Copyright &copy;{" "}
        <time id="time" dateTime={`${new Date().getFullYear()}`}>
          {new Date().getFullYear()}
        </time>{" "}
        Bolarinwa Gabriel. All Rights Reserved
      </div>
    </footer>
  );
}

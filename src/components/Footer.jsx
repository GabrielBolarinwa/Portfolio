export function Footer() {
  return (
    <footer className="footer" id="footer" role="contentinfo">
      <p className="footer-header">Bolarinwa Gabriel</p>
      <div className="contact-info address row">
        <p>
          Behind OAUSTECH Mega Campus, Okitipupa-Igbekebo Rd, Okitipupa, Nigeria
        </p>
      </div>
      <div className="contact row">
        <div className="contact-info ">
          <div className="social-icons-2">
            <a
              title="Facebook"
              aria-label="Facebook"
              href="https://web.facebook.com/itzamazz.amazz"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              <span className="fa-brands fa-facebook-f"></span>
            </a>
            <a
              href="https://x.com/GabrielBol94988"
              target="_blank"
              rel="noopener noreferrer nofollow"
              title="Twitter (X)"
              aria-label="Twitter (X)"
            >
              <span className="bi bi-twitter-x" title="Twitter (X)"></span>
            </a>
            <a
              href="https://github.com/GabrielBolarinwa/GabrielBolarinwa"
              target="_blank"
              rel="noopener noreferrer nofollow"
              title="GitHub"
              aria-label="GitHub"
            >
              <span className="fa-brands fa-github" title="GitHub"></span>
            </a>
            <a
              href="https://www.linkedin.com/in/gabriel-bolarinwa-028418399"
              target="_blank"
              rel="noopener noreferrer nofollow"
              title="LinkedIn"
              aria-label="LinkedIn"
            >
              <span className="bi bi-linkedin" title="LinkedIn"></span>
            </a>

            <a
              href="https://wa.me/09135976371"
              rel="noopener noreferrer nofollow"
              target="_blank"
              title="Whatsapp"
              aria-label="Whatsapp"
            >
              <span className="fa-brands fa-whatsapp"></span>
            </a>
          </div>
        </div>
      </div>
      <div className="contact-info contact-me row">
        <p>
          <span className="contact-me-title">Contact Me on:</span>{" "}
          <a href="tel:+2349135976371" className="contact-link">
            Phone
          </a>
          {" • "}
          <a className="contact-link" href="https://wa.me/09135976371">
            Whatsapp
          </a>
          {" • "}
          <a className="contact-link" href="mailto:gabibola955@gmail.com">
            Email
          </a>
        </p>
      </div>
      <div>
        Copyright &copy;{" "}
        <time id="time" dateTime={new Date().getFullYear()}>
          {new Date().getFullYear()}
        </time>{" "}
        Bolarinwa Gabriel. All Rights Reserved
      </div>
    </footer>
  );
}

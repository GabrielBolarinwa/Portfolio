import { BriefcaseBusiness, Home, Mail, User } from "lucide-react";

function IconRail() {
  return (
    <div
      className={
        "fixed top-1/2 -translate-y-1/2 right-6 text-muted flex flex-col gap-4"
      }
    >
      <p
        className={
          "[writing-mode:vertical-rl] rotate-180 text-xs uppercase tracking-widest"
        }
      >
        Pages
      </p>
      <ul>
        <li>
          <Home />
        </li>
        <li>
          <User />
        </li>
        <li>
          <Mail />
        </li>
        <li>
          <BriefcaseBusiness />
        </li>
      </ul>
    </div>
  );
}

export default IconRail;

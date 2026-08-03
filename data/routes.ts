import { BriefcaseBusiness, Home, LucideProps, Mail, User } from "lucide-react";
import React from "react";

interface Route {
  title: string;
  href: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}

export const pages: Route[] = [
  { title: "Home", href: "/", icon: Home },
  { title: "About", href: "/about", icon: User },
  { title: "Contact", href: "/contact", icon: Mail },
  { title: "Projects", href: "/projects", icon: BriefcaseBusiness },
];

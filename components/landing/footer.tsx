import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Twitter, Linkedin, Youtube } from "lucide-react";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  platform: string;
  href: string;
  icon: string;
}

interface FooterProps {
  tagline: string;
  sections: FooterSection[];
  social: SocialLink[];
  copyright: string;
}

const socialIconMap = {
  Twitter,
  Linkedin,
  Youtube,
};

export function Footer({ tagline, sections, social, copyright }: FooterProps) {
  return (
    <footer className="border-t bg-muted/30 px-6 py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Main Footer Content */}
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                S
              </div>
              <span className="text-xl font-bold">Sponseasy</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">{tagline}</p>

            {/* Social Links */}
            <div className="mt-6 flex gap-4">
              {social.map((item, index) => {
                const Icon =
                  socialIconMap[item.icon as keyof typeof socialIconMap];
                return Icon ? (
                  <Link
                    key={index}
                    href={item.href}
                    className="text-muted-foreground transition-colors hover:text-primary"
                    aria-label={item.platform}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                ) : null;
              })}
            </div>
          </div>

          {/* Link Sections */}
          {sections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold">{section.title}</h3>
              <ul className="mt-4 space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        {/* Copyright */}
        <div className="text-center text-sm text-muted-foreground">
          {copyright}
        </div>
      </div>
    </footer>
  );
}

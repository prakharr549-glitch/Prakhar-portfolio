"use client";

import { Github, Linkedin, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com",
    icon: Github,
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com",
    icon: Linkedin,
  },
  {
    name: "X (formerly Twitter)",
    url: "https://x.com",
    icon: Twitter,
  },
];

export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-6", className)}>
      {socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Prakhar Ri's ${link.name} profile`}
          className="text-foreground/80 transition-all duration-300 ease-in-out hover:text-accent hover:scale-110"
        >
          <link.icon className="h-7 w-7" />
        </a>
      ))}
    </div>
  );
}

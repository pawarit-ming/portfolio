import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  viewBox: "0 0 24 24",
  "aria-hidden": true,
} as const;

export function MailIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3 7 8.13 5.42a1.6 1.6 0 0 0 1.74 0L21 7" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7.2 3.5H4.6A1.6 1.6 0 0 0 3 5.2c0 8.6 7.2 15.8 15.8 15.8a1.6 1.6 0 0 0 1.7-1.6v-2.6l-4.3-1.6-1.9 2.2a13.5 13.5 0 0 1-6.5-6.5l2.2-1.9Z" />
    </svg>
  );
}

export function PinIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20 10.5c0 5.2-8 11-8 11s-8-5.8-8-11a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10.3" r="2.8" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 12h15" />
      <path d="m13.5 6 6 6-6 6" />
    </svg>
  );
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M19.5 12h-15" />
      <path d="m10.5 6-6 6 6 6" />
    </svg>
  );
}

export function ExternalLinkIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M13.5 4.5H19.5V10.5" />
      <path d="m11.5 12.5 8-8" />
      <path d="M18 14.5v4a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6h4" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6 18 18M18 6 6 18" />
    </svg>
  );
}

export function SunIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4" />
    </svg>
  );
}

export function MoonIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z" />
    </svg>
  );
}

export function GithubIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 1.8a10.2 10.2 0 0 0-3.23 19.88c.51.1.7-.22.7-.49l-.01-1.9c-2.6.5-3.28-.63-3.5-1.22-.12-.3-.63-1.22-1.08-1.47-.37-.2-.9-.68-.02-.7.83-.01 1.42.77 1.62 1.08.95 1.6 2.46 1.15 3.06.88.1-.68.37-1.15.67-1.41-2.3-.26-4.72-1.15-4.72-5.12 0-1.13.4-2.06 1.06-2.79-.1-.26-.46-1.32.1-2.74 0 0 .87-.27 2.85 1.06a9.6 9.6 0 0 1 5.19 0c1.98-1.34 2.85-1.06 2.85-1.06.57 1.42.21 2.48.1 2.74a4 4 0 0 1 1.07 2.79c0 3.98-2.43 4.86-4.74 5.12.38.32.7.94.7 1.9l-.01 2.82c0 .27.19.6.7.49A10.2 10.2 0 0 0 12 1.8Z" />
    </svg>
  );
}

export function LinkedinIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M6.94 5.5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.3 8.94h3.4V21H3.3V8.94Zm5.53 0h3.26v1.65h.05c.45-.86 1.56-1.77 3.22-1.77 3.44 0 4.08 2.27 4.08 5.21V21h-3.4v-5.29c0-1.26-.02-2.89-1.76-2.89-1.76 0-2.03 1.38-2.03 2.8V21h-3.4V8.94Z" />
    </svg>
  );
}

export const socialIcons = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
} as const;

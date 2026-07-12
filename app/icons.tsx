import type { SVGProps } from "react";

export type IconName =
  | "arrow" | "box" | "chat" | "check" | "chevron" | "clock"
  | "document" | "globe" | "instagram" | "map" | "menu" | "package"
  | "phone" | "plane" | "shield" | "store" | "truck" | "whatsapp" | "x";

const paths: Record<IconName, React.ReactNode> = {
  arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
  box: <><path d="m21 8-9 5-9-5"/><path d="M3 8l9-5 9 5v8l-9 5-9-5Z"/><path d="M12 13v8"/></>,
  chat: <><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"/><path d="M8 9h8M8 13h5"/></>,
  check: <path d="m5 12 4 4L19 6"/>,
  chevron: <path d="m9 18 6-6-6-6"/>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  document: <><path d="M6 2h8l4 4v16H6Z"/><path d="M14 2v5h5M9 12h6M9 16h6"/></>,
  globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></>,
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></>,
  map: <><path d="M12 22s7-5 7-13a7 7 0 1 0-14 0c0 8 7 13 7 13Z"/><circle cx="12" cy="9" r="2.5"/></>,
  menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
  package: <><path d="M4 6.5 12 2l8 4.5v11L12 22l-8-4.5Z"/><path d="m4 6.5 8 4.5 8-4.5M12 11v11M8 4l8 4.5"/></>,
  phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/>,
  plane: <><path d="M22 2 9.5 14.5"/><path d="m22 2-7 20-4-9-9-4Z"/></>,
  shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-5"/></>,
  store: <><path d="M3 9l2-6h14l2 6"/><path d="M5 13v8h14v-8M9 21v-6h6v6"/><path d="M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0"/></>,
  truck: <><path d="M3 6h11v11H3Z"/><path d="M14 10h4l3 3v4h-7Z"/><circle cx="7" cy="19" r="2"/><circle cx="18" cy="19" r="2"/></>,
  whatsapp: <><path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.4-4.7A8.5 8.5 0 1 1 20.5 11.7Z"/><path d="M8 7.8c.3-.7.7-.7 1-.7h.5c.2 0 .4.1.5.4l.8 2c.1.3.1.5-.1.7l-.6.8c-.2.2-.3.4-.1.7.4.8 1 1.5 1.7 2 .7.5 1.4.9 2.2 1.1.3.1.5 0 .7-.2l.9-1.1c.2-.2.4-.3.7-.2l2 .9c.3.1.5.3.5.5 0 .3-.1 1.5-.7 2.1-.6.7-1.5 1-2.4.9-1.2-.2-2.4-.6-3.5-1.2-1-.6-4-2.3-5.4-5.2-.4-.9-.4-2.5.3-3.5Z"/></>,
  x: <><path d="m6 6 12 12M18 6 6 18"/></>,
};

export function Icon({ name, ...props }: { name: IconName } & SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>;
}

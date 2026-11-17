import type { ReactNode } from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import PlatformIcon from "@/components/live/PlatformIcon";
import type { ResolvedPlatform } from "@/lib/live-breakglass";

interface PlatformDrawerProps {
  /** The element that opens the drawer, rendered as the trigger itself. */
  children: ReactNode;
  title: string;
  platforms: ResolvedPlatform[];
}

/** Bottom sheet listing every platform for one song. Swipe down or tap outside to close. */
const PlatformDrawer = ({ children, title, platforms }: PlatformDrawerProps) => (
  <Drawer shouldScaleBackground={false}>
    <DrawerTrigger asChild>{children}</DrawerTrigger>
    {/* Tailwind classes here override the shared drawer's radius, border and site background. */}
    <DrawerContent className="lb-drawer rounded-none border-0 bg-[#f4e8d4]">
      <div className="lb-drawer-head">
        <div>
          {/* vaul primitives directly: the shared Title/Description add type styles that would override ours. */}
          <DrawerPrimitive.Description className="lb-eyebrow">Listen to the live version</DrawerPrimitive.Description>
          <DrawerPrimitive.Title className="lb-drawer-title">{title}</DrawerPrimitive.Title>
        </div>
        <DrawerClose className="lb-x" aria-label="Close">
          &#10005;
        </DrawerClose>
      </div>
      <ul className="lb-drawer-list">
        {platforms.map((p) => (
          <li key={p.key}>
            <a href={p.url} target="_blank" rel="noopener noreferrer">
              <PlatformIcon platform={p.key} />
              <b>{p.label}</b>
              <span aria-hidden="true">&#8599;</span>
            </a>
          </li>
        ))}
      </ul>
    </DrawerContent>
  </Drawer>
);

export default PlatformDrawer;

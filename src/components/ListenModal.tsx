import type { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { PlatformLink } from "@/lib/platforms";

interface ListenModalProps {
  /** The element that opens the modal — rendered as the trigger itself. */
  children: ReactNode;
  title: string;
  description: string;
  links: PlatformLink[];
}

const ListenModal = ({ children, title, description, links }: ListenModalProps) => (
  <Dialog>
    <DialogTrigger asChild>{children}</DialogTrigger>
    <DialogContent className="w-[calc(100%-2rem)] max-w-[440px] gap-0 rounded-none border-foreground/20 p-0 sm:rounded-none">
      <DialogHeader className="space-y-1.5 border-b border-foreground/[0.14] px-5 pb-4 pt-5 text-left">
        <DialogTitle className="font-hand text-[22px] font-normal uppercase leading-[1.1] tracking-[0.02em]">
          {title}
        </DialogTitle>
        <DialogDescription className="text-[13px] leading-[1.45] text-foreground/50">
          {description}
        </DialogDescription>
      </DialogHeader>

      <div className="flex flex-col gap-2 p-5">
        {links.map(({ label, url, blurb, Icon }) => (
          <a
            key={label}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-h-[58px] items-center gap-3.5 border border-foreground/[0.14] px-4 py-3 transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
          >
            <Icon className="h-5 w-5 shrink-0" />
            <span className="flex flex-col gap-0.5">
              <span className="font-hand text-[15px] uppercase leading-none">{label}</span>
              <span className="text-[11px] opacity-55">{blurb}</span>
            </span>
            <span aria-hidden className="ml-auto text-base leading-none">
              &#8599;
            </span>
          </a>
        ))}
      </div>
    </DialogContent>
  </Dialog>
);

export default ListenModal;

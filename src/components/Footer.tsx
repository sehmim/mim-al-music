import { useLanguage } from "@/contexts/LanguageContext";
import logo from "@/assets/mim-al-logo.png";

const Footer = () => {
  const { content } = useLanguage();

  return (
    <footer className="section-rule mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-5 pb-10 pt-7">
      <div className="flex items-center gap-3">
        <img src={logo} alt="" className="block h-[34px] w-[34px]" />
        <div className="flex flex-col">
          <span className="font-display text-[13px] tracking-[0.12em]">
            {content.footer.brand.name}
          </span>
          <span className="text-xs text-foreground/45">{content.footer.brand.location}</span>
        </div>
      </div>

      <span className="text-xs text-foreground/40">{content.footer.legal.copyright}</span>
    </footer>
  );
};

export default Footer;

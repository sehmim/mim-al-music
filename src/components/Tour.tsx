import { useLanguage } from "@/contexts/LanguageContext";
import { useEmailCapture } from "@/hooks/use-email-capture";

/**
 * The displayed date is translated ("AOÛT 31", "সেপ্টেম্বর 13"), so it can't be
 * parsed — `isoDate` is the machine-readable one. Reading it as local midnight
 * keeps a show "upcoming" for the whole of its own day.
 */
const showDate = (show: { isoDate: string }) => new Date(`${show.isoDate}T00:00:00`);

const isShowPast = (show: { isoDate: string }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return showDate(show) < today;
};

const pastShowLabel = (language: string) =>
  language === "fr" ? "Spectacle Passé" : language === "bn" ? "পাস্ট শো" : "Past Show";

const Tour = () => {
  const { content, language } = useLanguage();
  const { email, isLoading, isSuccess, error, setEmail, submitEmail, handleKeyPress } =
    useEmailCapture();

  // Newest show first.
  const sortedShows = [...content.tour.shows].sort(
    (a, b) => showDate(b).getTime() - showDate(a).getTime()
  );

  return (
    <section id="tour" className="section-rule px-5 py-11">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="section-heading mb-4">{content.tour.heading}</h2>

        <div className="flex flex-col">
          {sortedShows.map((show, index) => {
            const past = isShowPast(show);

            return (
              <a
                key={`${show.isoDate}-${index}`}
                href={show.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 border-t border-foreground/[0.12] px-0.5 py-2.5 transition-colors hover:bg-foreground/5"
              >
                <span className="w-[74px] shrink-0 whitespace-nowrap font-hand text-[15px] uppercase">
                  {show.date}
                </span>
                <span className="w-[30px] shrink-0 text-[11px] text-foreground/40">
                  {show.year}
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-px">
                  <span className="truncate text-sm font-semibold">{show.venue}</span>
                  <span className="truncate text-[11px] text-foreground/40">{show.city}</span>
                </span>
                <span className="shrink-0 whitespace-nowrap text-[9px] uppercase tracking-[0.14em] text-foreground/45">
                  {past ? pastShowLabel(language) : show.status}
                </span>
              </a>
            );
          })}
        </div>

        <div className="mt-[22px] flex flex-wrap items-end justify-between gap-3.5 border-t border-foreground/[0.12] pt-[22px]">
          <div className="max-w-[40ch]">
            <h3 className="m-0 mb-1.5 font-hand text-[17px] uppercase">
              {content.tour.newsletter.heading}
            </h3>
            <p className="m-0 text-[13px] leading-[1.45] text-foreground/[0.55]">
              {content.tour.newsletter.description}
            </p>
          </div>

          {isSuccess ? (
            <p className="flex-1 basis-[320px] text-[13px] font-semibold uppercase tracking-[0.1em]">
              {language === "fr"
                ? "Merci ! Vous êtes abonné aux mises à jour de tournée."
                : language === "bn"
                ? "ধন্যবাদ! আপনি ট্যুর আপডেটের জন্য সাবস্ক্রাইব করেছেন।"
                : "Thanks — you're subscribed to tour updates."}
            </p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitEmail("tour");
              }}
              className="flex max-w-[460px] flex-1 basis-[320px] flex-col gap-2"
            >
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, "tour")}
                  placeholder={content.tour.newsletter.placeholder}
                  required
                  disabled={isLoading}
                  aria-label="Email address for tour updates"
                  autoComplete="email"
                  className={`min-h-[48px] min-w-0 flex-1 rounded-full border bg-transparent px-4 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-1 focus:ring-foreground ${
                    error ? "border-destructive" : "border-foreground/[0.28]"
                  }`}
                />
                <button type="submit" disabled={isLoading} className="btn-hero shrink-0">
                  {isLoading
                    ? language === "fr"
                      ? "Abonnement..."
                      : language === "bn"
                      ? "সাবস্ক্রাইব হচ্ছে..."
                      : "Subscribing..."
                    : content.tour.newsletter.button}
                </button>
              </div>
              {error && <span className="text-xs text-destructive">{error}</span>}
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Tour;

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import PlatformIcon from "@/components/live/PlatformIcon";
import { useCountdown } from "@/hooks/use-release";
import { LIVE, PRESAVE_URL, RELEASE_AT, RELEASE_DAY, SIGNUP_ENDPOINT, SONGS } from "@/lib/live-breakglass";

const STORAGE_KEY = "lb-breakglass-signup";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const pad = (n: number) => String(n).padStart(2, "0");

/** Per-visitor memory of a signup, so a return visit shows "on the list". Storage can be blocked. */
const readSaved = (): string | null => {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};
const save = (email: string) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, email);
  } catch {
    /* private mode: the signup itself already went through */
  }
};

const Countdown = () => {
  const { days, hours, minutes, seconds } = useCountdown(RELEASE_AT);
  const units: [number, string][] = [
    [days, "Days"],
    [hours, "Hrs"],
    [minutes, "Min"],
    [seconds, "Sec"],
  ];

  return (
    <div
      className="lb-countdown"
      role="timer"
      aria-label={`${days} days, ${hours} hours and ${minutes} minutes until release`}
    >
      {units.map(([value, label]) => (
        <div className="lb-cd-unit" key={label} aria-hidden="true">
          <span className="lb-cd-num">{pad(value)}</span>
          <span className="lb-cd-label">{label}</span>
        </div>
      ))}
    </div>
  );
};

type Status = "idle" | "open" | "sending" | "done" | "error";

/**
 * "Notify me" opens an email field in place. Each signup is forwarded by email
 * through FormSubmit (the endpoint lives in the page's JSON); the site has no
 * database of its own.
 */
const Signup = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [savedEmail, setSavedEmail] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const honeyRef = useRef<HTMLInputElement>(null);
  const inputId = useId();
  const msgId = useId();

  useEffect(() => {
    const saved = readSaved();
    if (saved) {
      setSavedEmail(saved);
      setStatus("done");
    }
  }, []);

  useEffect(() => {
    if (status === "open") inputRef.current?.focus();
  }, [status]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const value = email.trim();
    if (!EMAIL_RE.test(value)) {
      setError("Enter an email address like name@example.com.");
      inputRef.current?.focus();
      return;
    }
    // Bots fill every field; people never see this one.
    if (honeyRef.current?.value) {
      setStatus("done");
      return;
    }
    setStatus("sending");
    setError("");
    try {
      const res = await fetch(SIGNUP_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          email: value,
          release: LIVE.title,
          page: `mimal.music${LIVE.path}`,
          _subject: `New signup: ${LIVE.artist} — ${LIVE.title}`,
          _template: "table",
          _replyto: value,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || String(data.success) !== "true") throw new Error(data.message || res.statusText);
      save(value);
      setSavedEmail(value);
      setStatus("done");
    } catch {
      setStatus("error");
      setError("That didn't go through. Check your connection and try again.");
    }
  };

  if (status === "done") {
    return (
      <p className="lb-signup-done" role="status">
        <strong>You're on the list.</strong>{" "}
        {savedEmail ? `We'll email ${savedEmail} the moment it's out.` : "We'll email you the moment it's out."}
      </p>
    );
  }

  if (status === "idle") {
    return (
      <button type="button" className="lb-pill lb-pill-cream lb-release-cta" onClick={() => setStatus("open")}>
        Notify me on release
      </button>
    );
  }

  return (
    <form className="lb-signup" onSubmit={submit} noValidate>
      <label htmlFor={inputId} className="lb-sr">
        Email address
      </label>
      <div className="lb-signup-row">
        <input
          ref={inputRef}
          id={inputId}
          className="lb-input"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError("");
          }}
          aria-invalid={Boolean(error)}
          aria-describedby={msgId}
          disabled={status === "sending"}
          required
        />
        <button type="submit" className="lb-pill lb-pill-cream" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Notify me"}
        </button>
      </div>
      <input ref={honeyRef} type="text" name="_honey" className="lb-hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <p id={msgId} className={error ? "lb-signup-msg lb-signup-err" : "lb-signup-msg"} aria-live="polite">
        {error || "One email when the songs go live. Nothing else."}
      </p>
    </form>
  );
};

interface HeroReleaseProps {
  released: boolean;
}

/**
 * The hero's call to action. Before release: the countdown, "Notify me" email
 * signup and Spotify pre-save. After release: "Out now" with listen and watch links.
 */
const HeroRelease = ({ released }: HeroReleaseProps) => (
  <div className="lb-hero-release">
    <span className="lb-eyebrow">Live album · {SONGS.length} songs</span>
    {released ? (
      <>
        <p className="lb-out-label">Out now</p>
        <p className="lb-release-date">Released {RELEASE_DAY}</p>
        <div className="lb-release-actions">
          <a className="lb-pill lb-pill-cream lb-release-cta" href={PRESAVE_URL} target="_blank" rel="noopener noreferrer">
            <PlatformIcon platform="spotify" />
            Listen now
          </a>
          <a className="lb-pill lb-pill-ghost" href={`#${SONGS[0].id}`}>
            Watch the session
          </a>
        </div>
      </>
    ) : (
      <>
        <p className="lb-out-label">Out in</p>
        <Countdown />
        <p className="lb-release-date">{RELEASE_DAY} · 12 AM ET</p>
        <div className="lb-release-actions">
          <Signup />
          <a className="lb-pill lb-pill-ghost" href={PRESAVE_URL} target="_blank" rel="noopener noreferrer">
            <PlatformIcon platform="spotify" />
            Pre-save on Spotify
          </a>
        </div>
      </>
    )}
  </div>
);

export default HeroRelease;

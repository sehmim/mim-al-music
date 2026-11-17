import { useState } from "react";
import { Play } from "lucide-react";
import PlatformIcon from "@/components/live/PlatformIcon";

interface LiveVideoProps {
  title: string;
  youtubeId: string | null;
  poster: string;
}

/**
 * A YouTube player that costs nothing until it is tapped: the frame shows a
 * still, and the iframe only loads on play. Without a video id yet, the frame
 * stays a still marked "Video soon".
 */
const LiveVideo = ({ title, youtubeId, poster }: LiveVideoProps) => {
  const [playing, setPlaying] = useState(false);

  if (playing && youtubeId) {
    return (
      <div className="lb-frame">
        <iframe
          className="lb-frame-player"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&playsinline=1&rel=0&modestbranding=1`}
          title={`${title} — live at Breakglass Studios`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  const chrome = (
    <>
      <img className="lb-frame-img" src={poster} alt="" loading="lazy" decoding="async" />
      <span className="lb-frame-grade" />
      <span className="lb-vf" />
      <span className="lb-frame-top">
        <span className="lb-rec">
          <i />
          Live
        </span>
        <span className="lb-frame-src">
          <PlatformIcon platform="youtube" />
          YouTube
        </span>
      </span>
      <span className="lb-play" aria-hidden="true">
        <Play />
      </span>
      <span className="lb-frame-bot">
        <span className="lb-tc">{youtubeId ? "Full video" : "Video soon"}</span>
        <span className="lb-tc">HD</span>
      </span>
    </>
  );

  if (!youtubeId) {
    return (
      <div className="lb-frame lb-frame-pending" role="img" aria-label={`${title}, live video coming soon`}>
        {chrome}
      </div>
    );
  }

  return (
    <button
      type="button"
      className="lb-frame"
      onClick={() => setPlaying(true)}
      aria-label={`Play ${title}, live at Breakglass Studios`}
    >
      {chrome}
    </button>
  );
};

export default LiveVideo;

import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <div className="text-center">
        <h1 className="mb-3 font-display text-[clamp(52px,18vw,140px)] uppercase leading-none tracking-[-0.03em]">
          404
        </h1>
        <p className="mb-7 text-[15px] text-foreground/[0.55]">
          That page doesn&apos;t exist.
        </p>
        <Link to="/" className="btn-hero">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

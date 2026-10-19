import { useId } from "react";

/*
  Brand marks for the studio's social profiles. lucide-react no longer ships
  brand icons, so the official glyphs are inlined here (filled marks from
  Simple Icons, CC0; Instagram drawn as its outline glyph).

  With `brand`, each mark is drawn in its own colours: the cut-out letters of
  LinkedIn, Facebook and Pinterest get a white backing so they read white on
  any background, and Instagram takes its gradient.
*/
const PATHS = {
  LinkedIn:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  Facebook:
    "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z",
  Pinterest:
    "M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z",
};

const COLOR = { LinkedIn: "#0A66C2", Facebook: "#0866FF", Pinterest: "#E60023" };

/* White shapes that sit behind the cut-out letters in brand mode */
const BACKING = {
  LinkedIn: <rect x="2" y="2" width="20" height="20" rx="2" fill="#fff" />,
  Facebook: <circle cx="12" cy="12" r="11.4" fill="#fff" />,
  Pinterest: <circle cx="12" cy="12" r="11.4" fill="#fff" />,
};

export default function SocialIcon({ name, size = 18, brand = false }) {
  const gid = useId().replace(/:/g, "");
  if (name === "Instagram") {
    const stroke = brand ? `url(#${gid})` : "currentColor";
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false">
        {brand && (
          <defs>
            <linearGradient id={gid} x1="0" y1="1" x2="1" y2="0">
              <stop offset="0" stopColor="#FEDA75" />
              <stop offset="0.3" stopColor="#FA7E1E" />
              <stop offset="0.55" stopColor="#D62976" />
              <stop offset="0.8" stopColor="#962FBF" />
              <stop offset="1" stopColor="#4F5BD5" />
            </linearGradient>
          </defs>
        )}
        <g fill="none" stroke={stroke} strokeWidth="2.2">
          <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
          <circle cx="12" cy="12" r="4.4" />
        </g>
        <circle cx="17.6" cy="6.4" r="1.2" fill={brand ? "#D62976" : "currentColor"} />
      </svg>
    );
  }
  const d = PATHS[name];
  if (!d) return null;
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false">
      {brand && BACKING[name]}
      <path d={d} fill={brand ? COLOR[name] : "currentColor"} />
    </svg>
  );
}

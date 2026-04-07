type VisualPalette = "sage" | "sky" | "amber" | "rose";

type StudioSceneVisualProps = {
  ariaLabel: string;
  badges: string[];
  palette?: VisualPalette;
  className?: string;
};

type ArchetypeMoodBoardVisualProps = {
  ariaLabel: string;
  title: string;
  cues: readonly string[];
  palette?: VisualPalette;
  className?: string;
};

type PortfolioComparisonVisualProps = {
  ariaLabel: string;
  beforeLabel: string;
  afterLabel: string;
  className?: string;
};

type ProgressPathVisualProps = {
  ariaLabel: string;
  steps: string[];
  palette?: VisualPalette;
  className?: string;
};

type StudentPortraitBadgeProps = {
  name: string;
  label: string;
  palette?: VisualPalette;
};

function getPalette(palette: VisualPalette) {
  if (palette === "sky") {
    return {
      bgFrom: "#edf4fb",
      bgTo: "#dbe6f3",
      panel: "#ffffff",
      line: "#4d6680",
      accent: "#6b8eac",
      accentSoft: "#d7e4f0",
      warm: "#d8b384",
      figure: "#f2d7bf",
      figureCloth: "#5d7d97",
    };
  }

  if (palette === "amber") {
    return {
      bgFrom: "#f8f1e4",
      bgTo: "#efe0c0",
      panel: "#fffdf9",
      line: "#7a5d33",
      accent: "#b78d54",
      accentSoft: "#ead7b5",
      warm: "#d8b384",
      figure: "#f0cfb2",
      figureCloth: "#7a6754",
    };
  }

  if (palette === "rose") {
    return {
      bgFrom: "#f7ecea",
      bgTo: "#ead9d5",
      panel: "#fffdfc",
      line: "#6c4f53",
      accent: "#b97c7b",
      accentSoft: "#ecd3d1",
      warm: "#cf9b74",
      figure: "#f0d1bf",
      figureCloth: "#8f6a6f",
    };
  }

  return {
    bgFrom: "#edf3eb",
    bgTo: "#dbe5d7",
    panel: "#ffffff",
    line: "#36553f",
    accent: "#6e8a64",
    accentSoft: "#dce7d6",
    warm: "#d8b384",
    figure: "#f0d0b4",
    figureCloth: "#6e8a64",
  };
}

export function StudioSceneVisual({
  ariaLabel,
  badges,
  palette = "sage",
  className = "",
}: StudioSceneVisualProps) {
  const colors = getPalette(palette);

  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className={`overflow-hidden rounded-(--radius-panel) border border-(--border-synthesis) bg-[rgba(255,255,255,0.9)] shadow-(--shadow-card) ${className}`}
    >
      <svg viewBox="0 0 760 520" className="h-auto w-full">
        <defs>
          <linearGradient id={`scene-bg-${palette}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={colors.bgFrom} />
            <stop offset="100%" stopColor={colors.bgTo} />
          </linearGradient>
        </defs>
        <rect width="760" height="520" rx="36" fill={`url(#scene-bg-${palette})`} />
        <circle cx="156" cy="176" r="58" fill={colors.figure} />
        <path d="M88 300c22-34 59-54 108-54 47 0 86 20 108 54v132H88z" fill={colors.figureCloth} />
        <path d="M210 174c44 12 80 38 118 82" stroke={colors.warm} strokeWidth="8" strokeLinecap="round" strokeDasharray="10 12" fill="none" />
        <rect x="272" y="88" width="312" height="286" rx="28" fill={colors.panel} stroke={colors.accent} strokeWidth="3" />
        <rect x="302" y="118" width="198" height="22" rx="11" fill={colors.accentSoft} />
        <rect x="302" y="156" width="154" height="14" rx="7" fill={colors.warm} opacity="0.82" />
        <rect x="302" y="196" width="236" height="62" rx="18" fill="#ffffff" stroke={colors.accentSoft} strokeWidth="2" />
        <rect x="302" y="274" width="236" height="62" rx="18" fill="#ffffff" stroke={colors.accentSoft} strokeWidth="2" />
        <circle cx="332" cy="226" r="14" fill={colors.accent} opacity="0.24" />
        <circle cx="332" cy="304" r="14" fill={colors.warm} opacity="0.28" />
        <path d="M584 146h24" stroke={colors.line} strokeWidth="6" strokeLinecap="round" />
        <path d="M584 220h24" stroke={colors.line} strokeWidth="6" strokeLinecap="round" />
        <path d="M584 294h24" stroke={colors.line} strokeWidth="6" strokeLinecap="round" />
        {badges.slice(0, 3).map((badge, index) => {
          const y = 120 + index * 74;
          return (
            <g key={badge}>
              <rect
                x="610"
                y={y}
                width="118"
                height="44"
                rx="22"
                fill="#ffffff"
                stroke={colors.accentSoft}
                strokeWidth="2"
              />
              <text
                x="669"
                y={y + 28}
                textAnchor="middle"
                fontSize="18"
                fontFamily="Georgia, serif"
                fill={colors.line}
              >
                {badge}
              </text>
            </g>
          );
        })}
        <rect x="78" y="418" width="172" height="16" rx="8" fill={colors.line} opacity="0.78" />
        <rect x="286" y="418" width="190" height="16" rx="8" fill={colors.line} opacity="0.78" />
        <rect x="522" y="418" width="152" height="16" rx="8" fill={colors.line} opacity="0.78" />
      </svg>
    </div>
  );
}

export function ArchetypeMoodBoardVisual({
  ariaLabel,
  title,
  cues,
  palette = "amber",
  className = "",
}: ArchetypeMoodBoardVisualProps) {
  const colors = getPalette(palette);
  const visibleCues = cues.slice(0, 3);

  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className={`overflow-hidden rounded-(--radius-panel) border border-(--border-proof) bg-[rgba(255,255,255,0.94)] shadow-(--shadow-card) ${className}`}
    >
      <svg viewBox="0 0 760 520" className="h-auto w-full">
        <defs>
          <linearGradient id={`mood-bg-${palette}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={colors.bgFrom} />
            <stop offset="100%" stopColor={colors.bgTo} />
          </linearGradient>
        </defs>
        <rect width="760" height="520" rx="36" fill={`url(#mood-bg-${palette})`} />
        <rect x="48" y="46" width="664" height="84" rx="28" fill="#ffffff" stroke={colors.accentSoft} strokeWidth="3" />
        <text x="78" y="96" fontSize="30" fontFamily="Georgia, serif" fill={colors.line}>
          {title}
        </text>
        <text x="78" y="72" fontSize="14" fontFamily="system-ui, sans-serif" fill={colors.accent}>
          Image direction board
        </text>
        {visibleCues.map((cue, index) => {
          const x = 48 + index * 220;

          return (
            <g key={cue}>
              <rect
                x={x}
                y="170"
                width="196"
                height="264"
                rx="28"
                fill="#ffffff"
                stroke={colors.accentSoft}
                strokeWidth="3"
              />
              <rect x={x + 18} y="188" width="160" height="112" rx="22" fill={colors.accentSoft} />
              <circle cx={x + 64} cy="242" r="26" fill={colors.figure} />
              <path
                d={`M${x + 30} 314c18-24 44-36 80-36 31 0 58 11 84 36v38H${x + 30}z`}
                fill={colors.figureCloth}
              />
              <rect x={x + 18} y="328" width="110" height="12" rx="6" fill={colors.accent} opacity="0.74" />
              <rect x={x + 18} y="350" width="144" height="10" rx="5" fill={colors.warm} opacity="0.78" />
              <rect x={x + 18} y="374" width="160" height="10" rx="5" fill={colors.line} opacity="0.26" />
              <rect x={x + 18} y="398" width="122" height="10" rx="5" fill={colors.line} opacity="0.2" />
              <rect
                x={x + 18}
                y="446"
                width="160"
                height="30"
                rx="15"
                fill="#ffffff"
                stroke={colors.accentSoft}
                strokeWidth="2"
              />
              <text
                x={x + 98}
                y="466"
                textAnchor="middle"
                fontSize="16"
                fontFamily="system-ui, sans-serif"
                fill={colors.line}
              >
                {cue}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function PortfolioComparisonVisual({
  ariaLabel,
  beforeLabel,
  afterLabel,
  className = "",
}: PortfolioComparisonVisualProps) {
  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className={`overflow-hidden rounded-(--radius-panel) border border-(--border-proof) bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(245,241,231,0.94))] shadow-(--shadow-card) ${className}`}
    >
      <svg viewBox="0 0 860 500" className="h-auto w-full">
        <rect width="860" height="500" rx="36" fill="#faf6ee" />
        <rect x="56" y="72" width="330" height="300" rx="28" fill="#ffffff" stroke="#d7d4ce" strokeWidth="3" />
        <rect x="474" y="72" width="330" height="300" rx="28" fill="#ffffff" stroke="#c7d6c0" strokeWidth="3" />
        <rect x="92" y="112" width="186" height="20" rx="10" fill="#ece7dd" />
        <rect x="92" y="150" width="222" height="18" rx="9" fill="#e7ddd0" />
        <rect x="92" y="188" width="250" height="18" rx="9" fill="#e7ddd0" />
        <rect x="92" y="228" width="268" height="48" rx="18" fill="#f5f1e7" stroke="#e5dfd4" strokeWidth="2" />
        <rect x="92" y="290" width="124" height="14" rx="7" fill="#e7ddd0" />
        <rect x="92" y="318" width="148" height="14" rx="7" fill="#e7ddd0" />
        <rect x="510" y="112" width="174" height="20" rx="10" fill="#dce7d6" />
        <rect x="510" y="150" width="230" height="18" rx="9" fill="#d8b384" opacity="0.86" />
        <rect x="510" y="188" width="248" height="56" rx="20" fill="#ffffff" stroke="#dce7d6" strokeWidth="2" />
        <rect x="510" y="260" width="248" height="56" rx="20" fill="#ffffff" stroke="#dce7d6" strokeWidth="2" />
        <rect x="510" y="332" width="132" height="16" rx="8" fill="#6e8a64" />
        <circle cx="540" cy="216" r="16" fill="#6e8a64" opacity="0.2" />
        <circle cx="540" cy="288" r="16" fill="#8f6c48" opacity="0.2" />
        <text x="222" y="418" textAnchor="middle" fontSize="24" fontFamily="Georgia, serif" fill="#223243">
          {beforeLabel}
        </text>
        <text x="640" y="418" textAnchor="middle" fontSize="24" fontFamily="Georgia, serif" fill="#223243">
          {afterLabel}
        </text>
      </svg>
    </div>
  );
}

export function ProgressPathVisual({
  ariaLabel,
  steps,
  palette = "sky",
  className = "",
}: ProgressPathVisualProps) {
  const colors = getPalette(palette);
  const visibleSteps = steps.slice(0, 4);

  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className={`overflow-hidden rounded-(--radius-panel) border border-(--border-neutral) bg-[rgba(255,255,255,0.95)] shadow-(--shadow-card) ${className}`}
    >
      <svg viewBox="0 0 860 360" className="h-auto w-full">
        <defs>
          <linearGradient id={`path-bg-${palette}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={colors.bgFrom} />
            <stop offset="100%" stopColor={colors.bgTo} />
          </linearGradient>
        </defs>
        <rect width="860" height="360" rx="36" fill={`url(#path-bg-${palette})`} />
        <circle cx="90" cy="182" r="28" fill={colors.figure} />
        <path d="M56 262c12-28 32-42 60-42 30 0 52 14 64 42v42H56z" fill={colors.figureCloth} />
        <path d="M150 182h72" stroke={colors.line} strokeWidth="8" strokeLinecap="round" />
        {visibleSteps.map((step, index) => {
          const x = 250 + index * 152;
          return (
            <g key={step}>
              <circle cx={x} cy="182" r="34" fill="#ffffff" stroke={colors.accent} strokeWidth="4" />
              <text x={x} y="188" textAnchor="middle" fontSize="18" fontFamily="Georgia, serif" fill={colors.line}>
                {index + 1}
              </text>
              <text x={x} y="266" textAnchor="middle" fontSize="16" fontFamily="system-ui, sans-serif" fill={colors.line}>
                {step}
              </text>
              {index < visibleSteps.length - 1 ? (
                <path d={`M${x + 34} 182h84`} stroke={colors.line} strokeWidth="6" strokeLinecap="round" />
              ) : null}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function StudentPortraitBadge({
  name,
  label,
  palette = "sage",
}: StudentPortraitBadgeProps) {
  const colors = getPalette(palette);

  return (
    <div className="flex items-center gap-3">
      <svg viewBox="0 0 88 88" className="h-14 w-14 shrink-0 overflow-hidden rounded-full border border-[rgba(34,50,67,0.12)] bg-white">
        <circle cx="44" cy="28" r="18" fill={colors.figure} />
        <path d="M18 78c7-17 20-26 38-26 18 0 31 9 38 26" fill={colors.figureCloth} />
      </svg>
      <div>
        <p className="type-concept text-(--ink-strong)">{name}</p>
        <p className="type-caption text-(--ink-muted)">{label}</p>
      </div>
    </div>
  );
}
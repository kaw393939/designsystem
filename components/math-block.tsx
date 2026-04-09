import katex from "katex";

type MathBlockProps = {
  /** LaTeX expression string */
  tex: string;
  /** Render inline (default) or as a display block */
  display?: boolean;
  /** Plain-language description for screen readers */
  label?: string;
  className?: string;
};

/**
 * Server-rendered KaTeX math expression.
 * Renders LaTeX to static HTML at build time — no client JS required.
 */
export function MathBlock({
  tex,
  display = false,
  label,
  className,
}: MathBlockProps) {
  const html = katex.renderToString(tex, {
    displayMode: display,
    throwOnError: false,
    output: "htmlAndMathml",
  });

  return (
    <span
      className={className}
      aria-label={label}
      role={label ? "math" : undefined}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

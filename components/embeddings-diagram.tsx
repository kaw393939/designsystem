/**
 * Embeddings neighborhood diagram — pure inline SVG.
 * Shows query → embedding model → vector store → retrieved chunks → LLM response.
 */
export function EmbeddingsDiagram() {
  return (
    <figure aria-labelledby="embeddings-diagram-title">
      <svg
        viewBox="0 0 760 420"
        role="img"
        aria-labelledby="embeddings-diagram-title embeddings-diagram-desc"
        className="w-full rounded-(--radius-card) bg-[var(--surface-reading)] p-4"
      >
        <title id="embeddings-diagram-title">
          Embeddings neighborhood diagram
        </title>
        <desc id="embeddings-diagram-desc">
          A schematic embeddings workflow showing a user query becoming a query
          vector, comparing against stored document vectors, retrieving nearest
          neighbors, and passing retrieved context into an LLM response.
        </desc>

        <defs>
          <marker
            id="viz-arrow"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="5"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent-strong)" />
          </marker>
        </defs>

        {/* Row 1: User query → Embedding model → Query vector */}
        <rect
          x="36" y="42" width="146" height="62" rx="18"
          fill="var(--surface-neutral)" stroke="var(--border-strong)" strokeWidth="1.5"
        />
        <text x="109" y="68" textAnchor="middle" fill="var(--ink-strong)" fontSize="14" fontWeight="600">
          User query
        </text>
        <text x="109" y="89" textAnchor="middle" fill="var(--ink-body)" fontSize="11">
          find similar notes
        </text>

        <rect
          x="228" y="42" width="168" height="62" rx="18"
          fill="var(--surface-neutral)" stroke="var(--border-strong)" strokeWidth="1.5"
        />
        <text x="312" y="68" textAnchor="middle" fill="var(--ink-strong)" fontSize="14" fontWeight="600">
          Embedding model
        </text>
        <text x="312" y="89" textAnchor="middle" fill="var(--ink-body)" fontSize="11">
          maps text to coordinates
        </text>

        <rect
          x="442" y="42" width="132" height="62" rx="18"
          fill="var(--surface-emphasis)" stroke="var(--accent-strong)" strokeWidth="2"
        />
        <text x="508" y="68" textAnchor="middle" fill="var(--ink-strong)" fontSize="14" fontWeight="600">
          Query vector
        </text>
        <text x="508" y="89" textAnchor="middle" fill="var(--ink-body)" fontSize="11">
          [0.12, -0.40, ...]
        </text>

        {/* Row 1 arrows */}
        <path d="M 182 73 L 228 73" stroke="var(--accent-strong)" strokeWidth="1.5" markerEnd="url(#viz-arrow)" />
        <path d="M 396 73 L 442 73" stroke="var(--accent-strong)" strokeWidth="1.5" markerEnd="url(#viz-arrow)" />

        {/* Vector store */}
        <rect
          x="498" y="150" width="214" height="188" rx="26"
          fill="var(--surface-neutral)" stroke="var(--border-strong)" strokeWidth="1.5" strokeDasharray="6 3"
        />
        <text x="605" y="180" textAnchor="middle" fill="var(--ink-strong)" fontSize="14" fontWeight="600">
          Vector store
        </text>
        <circle cx="558" cy="238" r="20" fill="var(--accent-strong)" opacity="0.7" />
        <circle cx="606" cy="214" r="16" fill="var(--accent-strong)" opacity="0.35" />
        <circle cx="648" cy="252" r="18" fill="var(--accent-strong)" opacity="0.35" />
        <circle cx="616" cy="284" r="15" fill="var(--accent-strong)" opacity="0.35" />
        <circle cx="684" cy="206" r="14" fill="var(--border-strong)" opacity="0.3" />
        <circle cx="543" cy="294" r="13" fill="var(--border-strong)" opacity="0.3" />
        <circle cx="667" cy="300" r="12" fill="var(--border-strong)" opacity="0.3" />
        {/* Neighborhood lines */}
        <path d="M 558 238 L 606 214" stroke="var(--accent-strong)" strokeWidth="1" strokeDasharray="4 2" opacity="0.5" />
        <path d="M 558 238 L 648 252" stroke="var(--accent-strong)" strokeWidth="1" strokeDasharray="4 2" opacity="0.5" />
        <path d="M 558 238 L 616 284" stroke="var(--accent-strong)" strokeWidth="1" strokeDasharray="4 2" opacity="0.5" />
        <text x="605" y="326" textAnchor="middle" fill="var(--ink-body)" fontSize="10" fontStyle="italic">
          nearest neighbors cluster around the query
        </text>

        {/* Arrow from query vector to vector store */}
        <path d="M 542 104 L 578 150" stroke="var(--accent-strong)" strokeWidth="1.5" markerEnd="url(#viz-arrow)" />

        {/* Row 2: Retrieved chunks → Context bundle */}
        <rect
          x="46" y="170" width="184" height="56" rx="16"
          fill="var(--surface-neutral)" stroke="var(--border-strong)" strokeWidth="1.5"
        />
        <text x="138" y="194" textAnchor="middle" fill="var(--ink-strong)" fontSize="14" fontWeight="600">
          Retrieved chunks
        </text>
        <text x="138" y="214" textAnchor="middle" fill="var(--ink-body)" fontSize="11">
          doc A, doc B, doc C
        </text>

        <rect
          x="274" y="170" width="172" height="56" rx="16"
          fill="var(--surface-neutral)" stroke="var(--border-strong)" strokeWidth="1.5"
        />
        <text x="360" y="194" textAnchor="middle" fill="var(--ink-strong)" fontSize="14" fontWeight="600">
          Context bundle
        </text>
        <text x="360" y="214" textAnchor="middle" fill="var(--ink-body)" fontSize="11">
          ranked passages + query
        </text>

        {/* LLM response */}
        <rect
          x="228" y="294" width="264" height="72" rx="20"
          fill="var(--surface-emphasis)" stroke="var(--accent-strong)" strokeWidth="2"
        />
        <text x="360" y="323" textAnchor="middle" fill="var(--ink-strong)" fontSize="14" fontWeight="600">
          LLM response
        </text>
        <text x="360" y="346" textAnchor="middle" fill="var(--ink-body)" fontSize="10">
          retrieval uses vector similarity before generation
        </text>

        {/* Row 2-3 arrows */}
        <path d="M 498 240 C 446 240, 432 198, 446 198" stroke="var(--accent-strong)" strokeWidth="1.5" fill="none" markerEnd="url(#viz-arrow)" />
        <path d="M 230 198 L 274 198" stroke="var(--accent-strong)" strokeWidth="1.5" markerEnd="url(#viz-arrow)" />
        <path d="M 360 226 L 360 294" stroke="var(--accent-strong)" strokeWidth="1.5" markerEnd="url(#viz-arrow)" />
      </svg>
      <figcaption className="mt-3 type-caption text-center text-(--ink-body)">
        Schematic, not literal. The goal is to show why embeddings are useful:
        learned coordinates make nearest-neighbor retrieval possible before the
        language model writes an answer.
      </figcaption>
    </figure>
  );
}

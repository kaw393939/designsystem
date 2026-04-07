# Mermaid Diagram Prototypes

## Purpose

Reusable Mermaid diagram code for the concept diagrams planned in the diagram inventory.

These can be embedded in markdown, rendered in the site, or exported to SVG for production.

## 1. Motivation to Opportunity Chain

```mermaid
flowchart LR
    subgraph NEED["1. Need"]
        N1[Deficiency need<br/>or growth need]
    end
    subgraph SIGNAL["2. Signal"]
        S1[Archetype]
        S2[Voice & style]
        S3[Visual identity]
    end
    subgraph PROOF["3. Proof"]
        P1[Portfolio artifacts]
        P2[Testimonials]
        P3[Metrics & outcomes]
    end
    subgraph PUBLISH["4. Publish"]
        PU1[Deploy publicly]
        PU2[Weak-tie circulation]
        PU3[Search & social reach]
    end
    subgraph OPPORTUNITY["5. Opportunity"]
        O1[Trust forms]
        O2[Offers arrive]
        O3[New needs emerge]
    end
    NEED --> SIGNAL --> PROOF --> PUBLISH --> OPPORTUNITY
    OPPORTUNITY -.->|feedback loop| NEED
    style NEED fill:#f5e6cc,stroke:#c9a96e
    style SIGNAL fill:#d4e8d4,stroke:#7ab87a
    style PROOF fill:#d4dde8,stroke:#7a8eb8
    style PUBLISH fill:#e8d4e8,stroke:#b87ab8
    style OPPORTUNITY fill:#f5d4cc,stroke:#c97a6e
```

## 2. Need to Publish Loop

```mermaid
flowchart TB
    subgraph cycle[" "]
        direction TB
        A["Recognize need"] --> B["Choose archetype<br/>& signal strategy"]
        B --> C["Build proof<br/>(portfolio artifact)"]
        C --> D["Style & refine<br/>(voice, visuals, layout)"]
        D --> E["Write CTA<br/>(call to action)"]
        E --> F["Publish<br/>(deploy publicly)"]
        F --> G["Circulate<br/>(weak ties, search, social)"]
        G --> H["Collect feedback<br/>& measure"]
        H --> A
    end
    style A fill:#f5e6cc,stroke:#c9a96e
    style B fill:#d4e8d4,stroke:#7ab87a
    style C fill:#d4dde8,stroke:#7a8eb8
    style D fill:#d4dde8,stroke:#7a8eb8
    style E fill:#e8d4e8,stroke:#b87ab8
    style F fill:#f5d4cc,stroke:#c97a6e
    style G fill:#f5d4cc,stroke:#c97a6e
    style H fill:#f5e6cc,stroke:#c9a96e
```

## 3. Archetype Coherence Model

```mermaid
flowchart TB
    CORE["Core Identity Signal<br/>(One archetype)"]
    CORE --> VOICE["Voice & Tone"]
    CORE --> VISUALS["Visual Language"]
    CORE --> PROOF["Proof Strategy"]
    CORE --> CTA["Call to Action"]
    VOICE --> OUT1["Portfolio copy<br/>Bio · Headlines · Captions"]
    VISUALS --> OUT2["Color · Type · Layout<br/>Photography style"]
    PROOF --> OUT3["Projects · Testimonials<br/>Metrics · Certifications"]
    CTA --> OUT4["Hire me · Read more<br/>Subscribe · Collaborate"]
    style CORE fill:#c9a96e,stroke:#8b6914,color:#fff
    style VOICE fill:#f5e6cc,stroke:#c9a96e
    style VISUALS fill:#f5e6cc,stroke:#c9a96e
    style PROOF fill:#f5e6cc,stroke:#c9a96e
    style CTA fill:#f5e6cc,stroke:#c9a96e
```

## 4. First-Read Hierarchy Ladder

```mermaid
flowchart TB
    H["HEADLINE ZONE<br/>Maximum visual weight<br/>50ms first impression"]
    H --> CR["CREDIBILITY BAND<br/>Logo · Title · Social proof<br/>Authority signals"]
    CR --> NAR["NARRATIVE ZONE<br/>Story · Context · Problem/Solution<br/>Engagement deepens"]
    NAR --> EV["EVIDENCE ZONE<br/>Project cards · Metrics<br/>Testimonials · Data"]
    EV --> ACT["CALL TO ACTION<br/>Clear next step<br/>Low friction"]
    style H fill:#1a365d,color:#fff
    style CR fill:#2c5282,color:#fff
    style NAR fill:#3182ce,color:#fff
    style EV fill:#63b3ed,color:#000
    style ACT fill:#bee3f8,color:#000
```

## 5. Whole-Person Education Stack

```mermaid
flowchart TB
    subgraph stack[" "]
        direction TB
        L5["DEPLOYMENT & PUBLIC WORK<br/>Portfolio live · Weak-tie circulation · Opportunity capture"]
        L4["CREATIVE PRODUCTION<br/>Portfolio building · Design systems · Content creation"]
        L3["LITERACY & REASONING<br/>Reading · Writing · Data reasoning · AI fluency"]
        L2["COACHING & MENTORSHIP<br/>Identity coaching · Archetype guidance · Feedback loops"]
        L1["READINESS & FOUNDATIONS<br/>Emotional readiness · Whole-person support · Motivation"]
    end
    L1 --> L2 --> L3 --> L4 --> L5
    style L1 fill:#d4a574,stroke:#b8863c,color:#000
    style L2 fill:#3d8b8b,stroke:#2d6b6b,color:#fff
    style L3 fill:#e8e8e8,stroke:#999,color:#000
    style L4 fill:#e07050,stroke:#c05030,color:#fff
    style L5 fill:#4a90d9,stroke:#2a6ab9,color:#fff
```

## 6. NIST AI RMF Core Functions

```mermaid
block-beta
    columns 4
    block:govern["GOVERN (6 cat, 19 sub)"]:4
        g1["Policies"]
        g2["Accountability"]
        g3["Workforce"]
        g4["Culture"]
    end
    block:map["MAP (5 cat, 18 sub)"]:2
        m1["Context"]
        m2["Stakeholders"]
    end
    block:measure["MEASURE (4 cat, 22 sub)"]:2
        me1["Quantify"]
        me2["Test & Monitor"]
    end
    block:manage["MANAGE (4 cat, 13 sub)"]:4
        ma1["Prioritize"]
        ma2["Respond"]
        ma3["Communicate"]
        ma4["Document"]
    end
    style govern fill:#1a365d,color:#fff
    style map fill:#2c5282,color:#fff
    style measure fill:#2b6cb0,color:#fff
    style manage fill:#3182ce,color:#fff
```

## 7. Second-Renaissance Institutional Shift

```mermaid
flowchart LR
    subgraph OLD["Pre-AI Model"]
        direction TB
        O1["Degree = credential"]
        O2["GPA = filter"]
        O3["Institution = brand"]
        O4["Transcript = proof"]
    end
    subgraph SHIFT["Transition Forces"]
        direction TB
        T1["AI changes task landscape"]
        T2["Skills-based hiring rises"]
        T3["Public work becomes visible"]
        T4["Portfolio replaces transcript"]
    end
    subgraph NEW["Post-AI Model"]
        direction TB
        N1["Identity portfolio = credential"]
        N2["Proof of work = filter"]
        N3["Individual signal = brand"]
        N4["Public artifacts = proof"]
    end
    OLD --> SHIFT --> NEW
    style OLD fill:#e8d4d4,stroke:#b87a7a
    style SHIFT fill:#f5e6cc,stroke:#c9a96e
    style NEW fill:#d4e8d4,stroke:#7ab87a
```

## 8. Weak-Ties Opportunity System

```mermaid
flowchart TB
    subgraph STRONG["Strong-Tie Cluster<br/>(close network)"]
        S1((You))
        S2((Friend))
        S3((Colleague))
        S1 --- S2
        S2 --- S3
        S3 --- S1
    end
    subgraph BRIDGE["Weak-Tie Bridges"]
        direction LR
        W1["Portfolio shared"]
        W2["Content circulates"]
        W3["Referral passes"]
    end
    subgraph REMOTE["Remote Clusters<br/>(new audiences)"]
        R1((Hiring mgr))
        R2((Collaborator))
        R3((Investor))
    end
    STRONG --> BRIDGE --> REMOTE
    REMOTE -.->|opportunity returns| STRONG
    style STRONG fill:#d4dde8,stroke:#7a8eb8
    style BRIDGE fill:#f5e6cc,stroke:#c9a96e
    style REMOTE fill:#d4e8d4,stroke:#7ab87a
```

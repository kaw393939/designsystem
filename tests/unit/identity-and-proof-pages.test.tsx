import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import IdentitySignalsPage from "@/app/modules/identity-and-proof/identity-signals/page";
import BuildingProofPage from "@/app/modules/identity-and-proof/building-proof/page";
import PortfolioAsProofPage from "@/app/modules/identity-and-proof/portfolio-as-proof/page";
import IdentityProofPracticePage from "@/app/modules/identity-and-proof/practice/page";
import IdentityProofCheckpointPage from "@/app/modules/identity-and-proof/checkpoint/page";

describe("Identity and Proof lesson pages", () => {
  it("Lesson 1 renders heading", () => {
    render(<IdentitySignalsPage />);
    expect(
      screen.getByRole("heading", { name: /identity signals/i, level: 1 }),
    ).toBeInTheDocument();
  });

  it("Lesson 1 links to identity portfolio experience", () => {
    render(<IdentitySignalsPage />);
    const link = screen.getByRole("link", {
      name: /identity portfolio experience/i,
    });
    expect(link).toHaveAttribute("href", "/experiences/identity-portfolio");
  });

  it("Lesson 1 covers coherence and mismatched signals", () => {
    render(<IdentitySignalsPage />);
    expect(screen.getAllByText(/mismatched signals/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/conflicting tones/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/borrowed identities/i).length).toBeGreaterThanOrEqual(1);
  });

  it("Lesson 2 renders heading", () => {
    render(<BuildingProofPage />);
    expect(
      screen.getByRole("heading", {
        name: /building proof that lands/i,
        level: 1,
      }),
    ).toBeInTheDocument();
  });

  it("Lesson 2 covers evidence types", () => {
    render(<BuildingProofPage />);
    expect(screen.getByText("Case studies")).toBeInTheDocument();
    expect(screen.getByText("Metrics")).toBeInTheDocument();
    expect(screen.getByText("Testimonials")).toBeInTheDocument();
    expect(screen.getByText("Process documentation")).toBeInTheDocument();
    expect(screen.getByText("Credentials")).toBeInTheDocument();
  });

  it("Lesson 2 links to Proof tour and attention-trust room", () => {
    render(<BuildingProofPage />);
    expect(
      screen.getByRole("link", { name: /the proof tour/i }),
    ).toHaveAttribute("href", "/tour/proof");
    expect(
      screen.getByRole("link", { name: /trust and proof room/i }),
    ).toHaveAttribute("href", "/browse/attention-trust");
  });

  it("Lesson 2 covers the attention-trust arc", () => {
    render(<BuildingProofPage />);
    expect(
      screen.getByText(/first scan → interest → investigation → trust/i),
    ).toBeInTheDocument();
  });

  it("Lesson 3 renders heading", () => {
    render(<PortfolioAsProofPage />);
    expect(
      screen.getByRole("heading", {
        name: /portfolio as proof system/i,
        level: 1,
      }),
    ).toBeInTheDocument();
  });

  it("Lesson 3 references student exemplars", () => {
    render(<PortfolioAsProofPage />);
    expect(screen.getByText(/jules morrow/i)).toBeInTheDocument();
    expect(screen.getByText(/nia okafor/i)).toBeInTheDocument();
    expect(screen.getByText(/noor valdez/i)).toBeInTheDocument();
  });

  it("Lesson 3 covers common failures", () => {
    render(<PortfolioAsProofPage />);
    expect(screen.getByText(/all surface, no substance/i)).toBeInTheDocument();
    expect(screen.getByText(/all evidence, no identity/i)).toBeInTheDocument();
  });

  it("Practice page renders heading and claim-evidence map", () => {
    render(<IdentityProofPracticePage />);
    expect(
      screen.getByRole("heading", {
        name: /redesign your proof section/i,
        level: 1,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/what does the headline promise/i),
    ).toBeInTheDocument();
  });

  it("Checkpoint renders heading and review questions", () => {
    render(<IdentityProofCheckpointPage />);
    expect(
      screen.getByRole("heading", {
        name: /peer review: identity and proof/i,
        level: 1,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/do the identity signals align or contradict/i),
    ).toBeInTheDocument();
  });

  it("Checkpoint renders studio review criteria", () => {
    render(<IdentityProofCheckpointPage />);
    expect(screen.getByText(/signal clarity/i)).toBeInTheDocument();
    expect(screen.getByText(/curatorial judgment/i)).toBeInTheDocument();
  });
});

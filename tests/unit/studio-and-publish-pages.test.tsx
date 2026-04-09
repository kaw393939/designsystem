import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import FromBriefToBuildPage from "@/app/modules/studio-and-publish/from-brief-to-build/page";
import ReviewAndRevisionPage from "@/app/modules/studio-and-publish/review-and-revision/page";
import DeploymentAndIterationPage from "@/app/modules/studio-and-publish/deployment-and-iteration/page";
import ProfessionalPracticePage from "@/app/modules/studio-and-publish/professional-practice/page";
import StudioPublishPracticePage from "@/app/modules/studio-and-publish/practice/page";
import StudioPublishCheckpointPage from "@/app/modules/studio-and-publish/checkpoint/page";

describe("Studio and Publish lesson pages", () => {
  it("Lesson 1 renders heading", () => {
    render(<FromBriefToBuildPage />);
    expect(
      screen.getByRole("heading", {
        name: /from brief to build/i,
        level: 1,
      }),
    ).toBeInTheDocument();
  });

  it("Lesson 1 covers decision hierarchy", () => {
    render(<FromBriefToBuildPage />);
    expect(screen.getByText("First screen")).toBeInTheDocument();
    expect(screen.getByText("Proof section")).toBeInTheDocument();
    expect(screen.getByText("Everything else")).toBeInTheDocument();
  });

  it("Lesson 1 links to Build tour", () => {
    render(<FromBriefToBuildPage />);
    expect(
      screen.getByRole("link", { name: /the build tour/i }),
    ).toHaveAttribute("href", "/tour/build");
  });

  it("Lesson 2 renders heading", () => {
    render(<ReviewAndRevisionPage />);
    expect(
      screen.getByRole("heading", {
        name: /review and revision/i,
        level: 1,
      }),
    ).toBeInTheDocument();
  });

  it("Lesson 2 covers giving and receiving feedback", () => {
    render(<ReviewAndRevisionPage />);
    expect(screen.getAllByText(/name the page job/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/check against the brief/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/suggest one concrete change/i).length).toBeGreaterThanOrEqual(1);
  });

  it("Lesson 2 includes peer review template", () => {
    render(<ReviewAndRevisionPage />);
    expect(
      screen.getByText(/what is the page job/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/what one change would improve the page/i),
    ).toBeInTheDocument();
  });

  it("Lesson 3 renders heading", () => {
    render(<DeploymentAndIterationPage />);
    expect(
      screen.getByRole("heading", {
        name: /deployment and iteration/i,
        level: 1,
      }),
    ).toBeInTheDocument();
  });

  it("Lesson 3 covers three post-launch checks", () => {
    render(<DeploymentAndIterationPage />);
    expect(screen.getByText(/does the first read land/i)).toBeInTheDocument();
    expect(screen.getByText(/does the proof register/i)).toBeInTheDocument();
    expect(
      screen.getByText(/do people take the intended action/i),
    ).toBeInTheDocument();
  });

  it("Lesson 3 links to Publish tour", () => {
    render(<DeploymentAndIterationPage />);
    expect(
      screen.getByRole("link", { name: /the publish tour/i }),
    ).toHaveAttribute("href", "/tour/publish");
  });

  it("Lesson 4 renders heading", () => {
    render(<ProfessionalPracticePage />);
    expect(
      screen.getByRole("heading", {
        name: /professional practice/i,
        level: 1,
      }),
    ).toBeInTheDocument();
  });

  it("Lesson 4 covers maintenance rhythm", () => {
    render(<ProfessionalPracticePage />);
    expect(screen.getByText("Monthly")).toBeInTheDocument();
    expect(screen.getByText("Quarterly")).toBeInTheDocument();
    expect(screen.getByText("Yearly")).toBeInTheDocument();
  });

  it("Lesson 4 reads as workshop content, not filler", () => {
    render(<ProfessionalPracticePage />);
    expect(
      screen.getByText(/career inflection points/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/stale content reads as abandoned ambition/i),
    ).toBeInTheDocument();
  });

  it("Practice page renders heading and before/after template", () => {
    render(<StudioPublishPracticePage />);
    expect(
      screen.getByRole("heading", {
        name: /publish a real revision/i,
        level: 1,
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/the one change/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/next fix/i).length).toBeGreaterThanOrEqual(1);
  });

  it("Checkpoint renders heading and ten-second question", () => {
    render(<StudioPublishCheckpointPage />);
    expect(
      screen.getByRole("heading", {
        name: /final portfolio review/i,
        level: 1,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(/would you hire, trust, or follow this person/i).length,
    ).toBeGreaterThanOrEqual(1);
  });

  it("Checkpoint renders studio review criteria", () => {
    render(<StudioPublishCheckpointPage />);
    expect(screen.getByText(/signal clarity/i)).toBeInTheDocument();
    expect(screen.getByText(/curatorial judgment/i)).toBeInTheDocument();
  });

  it("Checkpoint includes tour step self-assessment", () => {
    render(<StudioPublishCheckpointPage />);
    expect(
      screen.getByText(
        /signal: audience and promise are clear on the first screen/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /publish: the page is live and you have measured it/i,
      ),
    ).toBeInTheDocument();
  });
});

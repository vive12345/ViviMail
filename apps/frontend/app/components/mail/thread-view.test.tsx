import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { ThreadView } from "~/components/mail/thread-view";
import { MOCK_THREADS } from "~/lib/mock-threads";

function renderThread(threadId: string | undefined) {
  const thread = MOCK_THREADS.find((t) => t.id === threadId);
  return render(
    <MemoryRouter>
      <ThreadView thread={thread} />
    </MemoryRouter>,
  );
}

describe("ThreadView", () => {
  it("asks to select an email when none is open", () => {
    renderThread(undefined);
    expect(screen.getByText("Select an email to read")).toBeInTheDocument();
  });

  it("shows the subject and every message in the thread", () => {
    renderThread("t1");
    expect(screen.getByRole("heading", { name: "Q3 planning" })).toBeInTheDocument();
    expect(screen.getByText(/Can we move the Q3 planning meeting/)).toBeInTheDocument();
    expect(screen.getByText("Sure, Thursday 10:00 works for me.")).toBeInTheDocument();
    expect(screen.getByText(/Adding Carlos/)).toBeInTheDocument();
  });

  it("lists to and cc recipients", () => {
    renderThread("t1");
    expect(screen.getByText("to Me, Carlos Rivera")).toBeInTheDocument();
  });

  it("shows attachments with their size", () => {
    renderThread("t2");
    expect(screen.getByText("invoice-2041.pdf")).toBeInTheDocument();
    expect(screen.getByText("84 KB")).toBeInTheDocument();
  });

  it("has a close link", () => {
    renderThread("t1");
    expect(screen.getByRole("link", { name: "Close" })).toBeInTheDocument();
  });

  it("renders HTML in a body as plain text, not markup", () => {
    const thread = structuredClone(MOCK_THREADS.find((t) => t.id === "t4")!);
    thread.messages[0]!.body = "<script>alert('x')</script>";
    const { container } = render(
      <MemoryRouter>
        <ThreadView thread={thread} />
      </MemoryRouter>,
    );
    expect(screen.getByText("<script>alert('x')</script>")).toBeInTheDocument();
    expect(container.querySelector("script")).toBeNull();
  });
});

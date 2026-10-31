import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { MailList } from "~/components/mail/mail-list";
import { MOCK_THREADS } from "~/lib/mock-threads";

const inbox = MOCK_THREADS.filter((t) => t.folder === "inbox");

function renderList(props: Partial<Parameters<typeof MailList>[0]> = {}) {
  return render(
    <MemoryRouter>
      <MailList folder="inbox" threads={inbox} selectedId={null} {...props} />
    </MemoryRouter>,
  );
}

describe("MailList", () => {
  it("shows the folder name and one row per thread", () => {
    renderList();
    expect(screen.getByRole("heading", { name: "Inbox" })).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(inbox.length);
  });

  it("marks the selected thread", () => {
    renderList({ selectedId: "t1" });
    expect(screen.getByRole("link", { current: true })).toHaveTextContent("Q3 planning");
  });

  it("shows an empty state", () => {
    renderList({ folder: "bin", threads: [] });
    expect(screen.getByText("Nothing in bin.")).toBeInTheDocument();
  });
});

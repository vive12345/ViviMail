import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { MailSidebar } from "~/components/mail/mail-sidebar";
import { FOLDERS } from "~/lib/folders";

function renderSidebar(path = "/mail/inbox") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <MailSidebar />
    </MemoryRouter>,
  );
}

describe("MailSidebar", () => {
  it("links to every folder", () => {
    renderSidebar();
    for (const folder of FOLDERS) {
      expect(screen.getByRole("link", { name: new RegExp(folder.label) })).toHaveAttribute(
        "href",
        `/mail/${folder.id}`,
      );
    }
  });

  it("highlights the current folder", () => {
    renderSidebar("/mail/sent");
    expect(screen.getByRole("link", { name: /Sent/ })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: /Inbox/ })).not.toHaveAttribute("aria-current");
  });

  it("shows unread counts only for folders with unread threads", () => {
    renderSidebar();
    expect(screen.getByRole("link", { name: /Inbox/ })).toHaveTextContent("Inbox3");
    expect(screen.getByRole("link", { name: /Spam/ })).toHaveTextContent("Spam1");
    expect(screen.getByRole("link", { name: /Sent/ })).toHaveTextContent(/^Sent$/);
  });
});

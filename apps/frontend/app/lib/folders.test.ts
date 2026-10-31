import { describe, expect, it } from "vitest";
import { getFolderLabel, isFolder } from "~/lib/folders";

describe("isFolder", () => {
  it.each(["inbox", "draft", "sent", "snoozed", "archive", "spam", "bin"])("accepts %s", (f) => {
    expect(isFolder(f)).toBe(true);
  });

  it.each(["banana", "", "INBOX", undefined])("rejects %s", (f) => {
    expect(isFolder(f)).toBe(false);
  });
});

describe("getFolderLabel", () => {
  it("returns the display label", () => {
    expect(getFolderLabel("draft")).toBe("Drafts");
  });
});

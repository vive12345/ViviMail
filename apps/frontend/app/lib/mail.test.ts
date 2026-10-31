import { describe, expect, it } from "vitest";
import { displayName, formatMailDate, initials, isUnread, latestMessage } from "~/lib/mail";
import { MOCK_THREADS } from "~/lib/mock-threads";

describe("formatMailDate", () => {
  const now = new Date(2026, 9, 30, 15, 0); // Oct 30 2026, 15:00 local time

  it("shows the time for today", () => {
    expect(formatMailDate(new Date(2026, 9, 30, 9, 5).toISOString(), now)).toMatch(/\d:\d\d/);
  });

  it("shows month and day (no time, no year) earlier this year", () => {
    const result = formatMailDate(new Date(2026, 1, 3).toISOString(), now);
    expect(result).not.toMatch(/\d:\d\d/);
    expect(result).not.toMatch(/26/);
  });

  it("includes the 2-digit year for older dates", () => {
    expect(formatMailDate(new Date(2025, 0, 5).toISOString(), now)).toMatch(/25/);
  });
});

describe("displayName", () => {
  it("uses the name when there is one", () => {
    expect(displayName({ name: "Alice Chen", email: "alice@example.com" })).toBe("Alice Chen");
  });

  it("falls back to the email", () => {
    expect(displayName({ email: "no-reply@example.com" })).toBe("no-reply@example.com");
  });
});

describe("initials", () => {
  it("takes the first letters of the first two words", () => {
    expect(initials({ name: "Alice Chen", email: "alice@example.com" })).toBe("AC");
  });

  it("works from an email address", () => {
    expect(initials({ email: "no-reply@example.com" })).toBe("NE");
  });
});

describe("thread helpers", () => {
  const thread = MOCK_THREADS.find((t) => t.id === "t1")!;

  it("latestMessage returns the last message", () => {
    expect(latestMessage(thread).id).toBe("m3");
  });

  it("isUnread is true if any message is unread", () => {
    expect(isUnread(thread)).toBe(true);
  });

  it("isUnread is false when every message is read", () => {
    const read = MOCK_THREADS.find((t) => t.id === "t3")!;
    expect(isUnread(read)).toBe(false);
  });
});

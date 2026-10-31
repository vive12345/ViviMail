import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useThread, useThreads, useUnreadCounts } from "~/hooks/use-threads";
import { latestMessage } from "~/lib/mail";

describe("useThreads", () => {
  it("returns only threads in the folder", () => {
    const { result } = renderHook(() => useThreads("inbox"));
    expect(result.current.length).toBeGreaterThan(0);
    expect(result.current.every((t) => t.folder === "inbox")).toBe(true);
  });

  it("sorts newest first", () => {
    const { result } = renderHook(() => useThreads("inbox"));
    const dates = result.current.map((t) => latestMessage(t).receivedOn);
    expect(dates).toEqual([...dates].sort().reverse());
  });

  it("returns an empty list for an empty folder", () => {
    const { result } = renderHook(() => useThreads("bin"));
    expect(result.current).toEqual([]);
  });
});

describe("useThread", () => {
  it("finds a thread by id", () => {
    const { result } = renderHook(() => useThread("t2"));
    expect(result.current?.id).toBe("t2");
  });

  it("returns undefined when nothing is selected or the id is unknown", () => {
    expect(renderHook(() => useThread(null)).result.current).toBeUndefined();
    expect(renderHook(() => useThread("nope")).result.current).toBeUndefined();
  });
});

describe("useUnreadCounts", () => {
  it("counts unread threads per folder", () => {
    const { result } = renderHook(() => useUnreadCounts());
    expect(result.current).toMatchObject({ inbox: 3, spam: 1, sent: 0, bin: 0 });
  });
});

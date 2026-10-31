// The only file that knows the data is fake. Phase 3 swaps MOCK_THREADS for an API call.
import { useMemo } from "react";
import { FOLDERS } from "~/lib/folders";
import { isUnread, latestMessage } from "~/lib/mail";
import { MOCK_THREADS } from "~/lib/mock-threads";
import type { Folder, Thread } from "~/types/mail";

/** Threads in a folder, newest first. */
export function useThreads(folder: Folder): Thread[] {
  return useMemo(
    () =>
      MOCK_THREADS.filter((thread) => thread.folder === folder).sort((a, b) =>
        latestMessage(b).receivedOn.localeCompare(latestMessage(a).receivedOn),
      ),
    [folder],
  );
}

/** One thread by id, or undefined if none is selected / it doesn't exist. */
export function useThread(threadId: string | null): Thread | undefined {
  return useMemo(() => MOCK_THREADS.find((thread) => thread.id === threadId), [threadId]);
}

/** Unread thread count per folder, for the sidebar. */
export function useUnreadCounts(): Record<Folder, number> {
  return useMemo(() => {
    const counts = Object.fromEntries(FOLDERS.map((f) => [f.id, 0])) as Record<Folder, number>;
    for (const thread of MOCK_THREADS) {
      if (isUnread(thread)) counts[thread.folder] += 1;
    }
    return counts;
  }, []);
}

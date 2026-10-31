import { data, useSearchParams } from "react-router";
import type { Route } from "./+types/mail.$folder";
import { MailList } from "~/components/mail/mail-list";
import { ThreadView } from "~/components/mail/thread-view";
import { useThread, useThreads } from "~/hooks/use-threads";
import { isFolder } from "~/lib/folders";

export function clientLoader({ params }: Route.ClientLoaderArgs) {
  if (!isFolder(params.folder)) {
    throw data("Folder not found", { status: 404 });
  }
  return { folder: params.folder };
}

export default function FolderPage({ loaderData }: Route.ComponentProps) {
  const { folder } = loaderData;
  const [searchParams] = useSearchParams();
  const threadId = searchParams.get("threadId");

  const threads = useThreads(folder);
  const thread = useThread(threadId);

  return (
    <>
      <MailList folder={folder} threads={threads} selectedId={threadId} />
      <ThreadView thread={thread} />
    </>
  );
}

import { MailRow } from "~/components/mail/mail-row";
import { getFolderLabel } from "~/lib/folders";
import type { Folder, Thread } from "~/types/mail";

interface MailListProps {
  folder: Folder;
  threads: Thread[];
  selectedId: string | null;
}

export function MailList({ folder, threads, selectedId }: MailListProps) {
  const label = getFolderLabel(folder);

  return (
    <section aria-label={`${label} emails`} className="flex w-96 shrink-0 flex-col border-r">
      <header className="flex h-14 shrink-0 items-center border-b px-4">
        <h1 className="text-lg font-semibold">{label}</h1>
      </header>

      {threads.length === 0 ? (
        <p className="p-6 text-center text-sm text-muted-foreground">
          Nothing in {label.toLowerCase()}.
        </p>
      ) : (
        <ul className="flex-1 overflow-y-auto">
          {threads.map((thread) => (
            <li key={thread.id}>
              <MailRow thread={thread} selected={thread.id === selectedId} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

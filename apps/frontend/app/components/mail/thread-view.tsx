// Layout adapted from Mail-0/Zero (MIT): apps/mail/components/mail/thread-display.tsx
import { X } from "lucide-react";
import { Fragment } from "react";
import { Link } from "react-router";
import { MessageView } from "~/components/mail/message-view";
import { buttonVariants } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import type { Thread } from "~/types/mail";

export function ThreadView({ thread }: { thread: Thread | undefined }) {
  if (!thread) {
    return (
      <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
        Select an email to read
      </div>
    );
  }

  return (
    <article className="flex min-w-0 flex-1 flex-col">
      <header className="flex h-14 shrink-0 items-center justify-between gap-2 border-b px-6">
        <h2 className="truncate text-lg font-semibold">{thread.messages[0]!.subject}</h2>
        <Link
          to="."
          aria-label="Close"
          className={buttonVariants({ variant: "ghost", size: "icon" })}
        >
          <X className="size-4" />
        </Link>
      </header>

      <div className="flex-1 overflow-y-auto">
        {thread.messages.map((message, i) => (
          <Fragment key={message.id}>
            {i > 0 && <Separator />}
            <MessageView message={message} />
          </Fragment>
        ))}
      </div>
    </article>
  );
}

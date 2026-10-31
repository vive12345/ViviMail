// Row layout adapted from Mail-0/Zero (MIT): apps/mail/components/mail/mail-list.tsx
import { Paperclip } from "lucide-react";
import { Link } from "react-router";
import { SenderAvatar } from "~/components/mail/sender-avatar";
import { Badge } from "~/components/ui/badge";
import { displayName, formatMailDate, isUnread, latestMessage } from "~/lib/mail";
import { cn } from "~/lib/utils";
import type { Thread } from "~/types/mail";

export function MailRow({ thread, selected }: { thread: Thread; selected: boolean }) {
  const latest = latestMessage(thread);
  const unread = isUnread(thread);
  const count = thread.messages.length;
  const hasAttachment = thread.messages.some((m) => m.attachments?.length);

  return (
    <Link
      to={{ search: `?threadId=${thread.id}` }}
      preventScrollReset
      aria-current={selected ? "true" : undefined}
      className={cn("flex gap-3 border-b px-4 py-3 hover:bg-muted/60", selected && "bg-muted")}
    >
      <SenderAvatar sender={latest.sender} />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          {unread && (
            <span className="size-2 shrink-0 rounded-full bg-primary" aria-label="Unread" />
          )}
          <span className={cn("truncate text-sm", unread && "font-semibold")}>
            {displayName(latest.sender)}
          </span>
          {count > 1 && <span className="text-xs text-muted-foreground">{count}</span>}
          <time
            dateTime={latest.receivedOn}
            className="ml-auto shrink-0 text-xs text-muted-foreground"
          >
            {formatMailDate(latest.receivedOn)}
          </time>
        </div>
        <p className={cn("truncate text-sm", unread ? "font-semibold" : "text-foreground/80")}>
          {latest.subject}
        </p>
        <div className="flex items-center gap-2">
          <p className="truncate text-xs text-muted-foreground">{latest.body}</p>
          {hasAttachment && (
            <Paperclip
              className="size-3 shrink-0 text-muted-foreground"
              aria-label="Has attachment"
            />
          )}
        </div>
        {latest.tags.length > 0 && (
          <div className="mt-1 flex gap-1">
            {latest.tags.map((tag) => (
              <Badge key={tag.id} variant="secondary">
                {tag.name}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

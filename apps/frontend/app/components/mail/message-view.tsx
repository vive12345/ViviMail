// Message header adapted from Mail-0/Zero (MIT): apps/mail/components/mail/mail-display.tsx
import { Paperclip } from "lucide-react";
import { SenderAvatar } from "~/components/mail/sender-avatar";
import { displayName, formatFullDate } from "~/lib/mail";
import type { ParsedMessage } from "~/types/mail";

export function MessageView({ message }: { message: ParsedMessage }) {
  const recipients = [...message.to, ...(message.cc ?? [])].map(displayName).join(", ");

  return (
    <div className="px-6 py-5">
      <div className="flex items-start gap-3">
        <SenderAvatar sender={message.sender} />
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <p className="truncate text-sm font-medium">
              {displayName(message.sender)}{" "}
              <span className="font-normal text-muted-foreground">
                &lt;{message.sender.email}&gt;
              </span>
            </p>
            <time dateTime={message.receivedOn} className="shrink-0 text-xs text-muted-foreground">
              {formatFullDate(message.receivedOn)}
            </time>
          </div>
          <p className="truncate text-xs text-muted-foreground">to {recipients}</p>
        </div>
      </div>

      {/* Plain text only. React escapes it, so no HTML/scripts can run. */}
      <div className="mt-4 whitespace-pre-wrap text-sm leading-6">{message.body}</div>

      {message.attachments && message.attachments.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {message.attachments.map((file) => (
            <li
              key={file.id}
              className="flex items-center gap-2 rounded-md border px-3 py-2 text-xs"
            >
              <Paperclip className="size-3" aria-hidden />
              {file.filename}
              <span className="text-muted-foreground">{Math.round(file.size / 1000)} KB</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

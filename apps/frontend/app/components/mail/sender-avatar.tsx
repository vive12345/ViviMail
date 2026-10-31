import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { initials } from "~/lib/mail";
import type { Sender } from "~/types/mail";

export function SenderAvatar({ sender }: { sender: Sender }) {
  return (
    <Avatar className="size-9">
      <AvatarFallback className="text-xs">{initials(sender)}</AvatarFallback>
    </Avatar>
  );
}

import { NavLink } from "react-router";
import { useUnreadCounts } from "~/hooks/use-threads";
import { FOLDERS } from "~/lib/folders";
import { cn } from "~/lib/utils";

export function MailSidebar() {
  const unread = useUnreadCounts();

  return (
    <nav aria-label="Folders" className="flex w-56 shrink-0 flex-col gap-1 border-r p-3">
      <p className="px-3 pb-3 text-lg font-semibold">ViviMail</p>
      {FOLDERS.map(({ id, label, icon: Icon }) => (
        <NavLink
          key={id}
          to={`/mail/${id}`}
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-muted",
              isActive && "bg-muted font-medium",
            )
          }
        >
          <Icon className="size-4" aria-hidden />
          <span className="flex-1">{label}</span>
          {unread[id] > 0 && <span className="text-xs text-muted-foreground">{unread[id]}</span>}
        </NavLink>
      ))}
    </nav>
  );
}

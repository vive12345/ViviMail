import { Outlet } from "react-router";
import type { Route } from "./+types/mail";
import { MailSidebar } from "~/components/mail/mail-sidebar";

export const meta: Route.MetaFunction = () => [{ title: "Mail · ViviMail" }];

export default function MailLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <MailSidebar />
      <main className="flex min-w-0 flex-1">
        <Outlet />
      </main>
    </div>
  );
}

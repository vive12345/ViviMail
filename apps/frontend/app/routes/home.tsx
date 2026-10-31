import { Link } from "react-router";
import { buttonVariants } from "~/components/ui/button";
import type { Route } from "./+types/home";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

export const meta: Route.MetaFunction = () => [
  { title: "ViviMail" },
  { name: "description", content: "AI-powered email client" },
];

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">ViviMail</CardTitle>
          <CardDescription>AI-powered email client. Early development.</CardDescription>
        </CardHeader>
        <CardContent>
          <Link to="/mail/inbox" className={buttonVariants({ className: "w-full" })}>
            Open inbox (demo)
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}

import type { Route } from "./+types/home";
import { Button } from "~/components/ui/button";
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
          <Button className="w-full">Sign in with Google</Button>
        </CardContent>
      </Card>
    </main>
  );
}

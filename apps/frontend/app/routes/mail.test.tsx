import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider, useLoaderData } from "react-router";
import { describe, expect, it } from "vitest";
import type { Route } from "./+types/mail.$folder";
import MailLayout from "~/routes/mail";
import FolderPage, { clientLoader } from "~/routes/mail.$folder";
import MailIndex from "~/routes/mail._index";

// In the real app React Router passes loaderData as a prop; do the same here.
function FolderRoute() {
  const loaderData = useLoaderData<typeof clientLoader>();
  return <FolderPage {...({ loaderData } as Route.ComponentProps)} />;
}

// Same route tree as app/routes.ts, in memory instead of the browser.
function renderApp(path: string) {
  const router = createMemoryRouter(
    [
      {
        path: "/mail",
        Component: MailLayout,
        children: [
          { index: true, Component: MailIndex },
          {
            path: ":folder",
            loader: ({ params }) => clientLoader({ params } as Route.ClientLoaderArgs),
            Component: FolderRoute,
            ErrorBoundary: () => <p>Folder not found</p>,
          },
        ],
      },
    ],
    { initialEntries: [path] },
  );
  render(<RouterProvider router={router} />);
  return router;
}

describe("mail routes", () => {
  it("redirects /mail to the inbox", async () => {
    const router = renderApp("/mail");
    expect(await screen.findByRole("heading", { name: "Inbox" })).toBeInTheDocument();
    expect(router.state.location.pathname).toBe("/mail/inbox");
  });

  it("opens a thread when a row is clicked and keeps it in the URL", async () => {
    const router = renderApp("/mail/inbox");
    await userEvent.click(await screen.findByRole("link", { name: /Q3 planning/ }));
    expect(await screen.findByRole("heading", { name: "Q3 planning" })).toBeInTheDocument();
    expect(router.state.location.search).toBe("?threadId=t1");
  });

  it("closes the thread", async () => {
    const router = renderApp("/mail/inbox?threadId=t1");
    await userEvent.click(await screen.findByRole("link", { name: "Close" }));
    expect(await screen.findByText("Select an email to read")).toBeInTheDocument();
    expect(router.state.location.search).toBe("");
  });

  it("shows an error for an unknown folder", async () => {
    renderApp("/mail/banana");
    expect(await screen.findByText("Folder not found")).toBeInTheDocument();
  });
});

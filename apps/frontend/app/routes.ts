import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("mail", "routes/mail.tsx", [
    index("routes/mail._index.tsx"),
    route(":folder", "routes/mail.$folder.tsx"),
  ]),
] satisfies RouteConfig;

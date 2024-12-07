import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import "./tailwind.css";
import { LoaderFunctionArgs } from "@remix-run/node";

export const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

const sampleData = [
  {
    data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    meta: {
      page: 0,
      totalPages: 3,
      totalItems: 100,
    },
  },
  {
    data: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    meta: {
      page: 1,
      totalPages: 3,
      totalItems: 100,
    },
  },
  {
    data: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    meta: {
      page: 2,
      totalPages: 3,
      totalItems: 100,
    },
  },
  {
    data: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
    meta: {
      page: 3,
      totalPages: 3,
      totalItems: 100,
    },
  },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const page = Number(new URL(request.url).searchParams.get("page") || 0);

  return sampleData[page];
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

import { Head, Html, Main, NextScript } from "next/document";

const themeBootstrapScript = `
  (function () {
    try {
      var key = "wm_theme";
      var saved = localStorage.getItem(key);
      var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      var theme = saved === "dark" || saved === "light" ? saved : (prefersDark ? "dark" : "light");
      if (theme === "dark") document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
    } catch (e) {}
  })();
`;

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="theme-color" content="#0b69bd" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

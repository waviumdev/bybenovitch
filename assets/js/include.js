(function () {
  const host = window.location.hostname.toLowerCase();
  const isGithubPages = host.endsWith("github.io");

  function computePrefix() {
    let segments = window.location.pathname.split("/").filter(Boolean);

    // On github pages, first segment is usually the repo name
    if (isGithubPages && segments.length > 0) segments = segments.slice(1);

    const endsWithSlash = window.location.pathname.endsWith("/");
    const dirDepth = endsWithSlash ? segments.length : Math.max(0, segments.length - 1);
    return "../".repeat(dirDepth);
  }

  const BASE = computePrefix();

  async function inject(selector, partialFile) {
    const el = document.querySelector(selector);
    if (!el) return;

    const url = BASE + "partials/" + partialFile;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      el.innerHTML = `<!-- Missing partial: ${partialFile} (${res.status}) -->`;
      return;
    }
    let html = await res.text();
    html = html.replaceAll("{{BASE}}", BASE);
    el.innerHTML = html;
  }

  function highlightBrand() {
    const bar = document.querySelector("#bb-brandbar");
    if (!bar) return;

    let key = null;
    if (host.startsWith("playlist.")) key = "playlist";
    else if (host.startsWith("studio.")) key = "studio";
    else if (host.startsWith("artists.")) key = "artists";

    if (!key) return;

    const pill = bar.querySelector(`[data-active="${key}"]`);
    if (pill) pill.classList.add("active");
  }

  function highlightLocalNav() {
    const path = window.location.pathname.toLowerCase();
    const links = document.querySelectorAll(".navlink");
    links.forEach((a) => a.classList.remove("active"));

    const pick =
      path.includes("/about/") ? "about" :
      path.includes("/contact/") ? "contact" :
      "home";

    const active = document.querySelector(`.navlink[data-nav="${pick}"]`);
    if (active) active.classList.add("active");
  }

  (async function main() {
    await inject("#bb-brandbar", "brandbar.html");
    await inject("#bb-hubheader", "hubheader.html");
    await inject("#bb-footer", "footer.html");
    highlightBrand();
    highlightLocalNav();
  })();
})();
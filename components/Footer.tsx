import { site } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-white/55">
      <div className="shell flex flex-col gap-3 border-t border-white/10 py-8 text-[0.85rem] sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="text-white/80">{site.footer.credit}</span>
          {site.footer.aside && <span className="ml-2">{site.footer.aside}</span>}
        </p>
        <p className="flex items-center gap-5">
          <span>© {year}</span>
          <a href="#main" className="inline-flex min-h-11 items-center hover:text-white sm:min-h-0">
            Back to top ↑
          </a>
        </p>
      </div>
    </footer>
  );
}

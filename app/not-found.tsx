import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[70vh] flex-col justify-center pt-24">
      <p className="eyebrow">404</p>
      <h1 className="display-lg mt-5 max-w-[16ch]">This page doesn’t exist — yet.</h1>
      <Link href="/" className="mt-8 inline-flex min-h-11 w-fit items-center rounded-full border border-ink px-5 text-[0.95rem] font-medium hover:bg-ink hover:text-paper">
        Back to the homepage
      </Link>
    </section>
  );
}

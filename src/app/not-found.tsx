import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 pt-32 text-center">
      <p className="eyebrow mb-4">404</p>
      <h1 className="h-display text-4xl text-ink sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-sm font-body text-sm text-mist">
        That page — or that car — isn&rsquo;t here any more. It may have been
        sold or moved.
      </p>
      <Link href="/cars" className="btn-primary mt-8">
        View Available Cars
      </Link>
    </div>
  );
}

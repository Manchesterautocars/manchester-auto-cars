import EnquireButton from "./EnquireButton";

export default function CantFindCarPanel() {
  return (
    <div className="mt-14 rounded-2xl border border-gold/15 bg-ink px-6 py-10 text-center text-surface sm:mt-16 sm:px-10">
      <h2 className="h-display text-xl text-surface sm:text-2xl">
        Can&rsquo;t find what you&rsquo;re looking for?
      </h2>
      <p className="mx-auto mt-2 max-w-sm font-body text-sm leading-relaxed text-surface/60">
        Looking for a specific make or model? Ask our team about availability
        and we&rsquo;ll get back to you.
      </p>
      <EnquireButton
        label="Enquire About a Car"
        variant="outline-dark"
        className="mt-6"
      />
    </div>
  );
}

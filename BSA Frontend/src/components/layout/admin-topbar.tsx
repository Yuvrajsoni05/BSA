export function AdminTopbar({ title }: { title: string }) {
  return (
    <div className="flex h-20 items-center border-b border-ivory/10 px-6 md:px-10">
      <h1 className="font-display text-2xl text-ivory">{title}</h1>
    </div>
  );
}

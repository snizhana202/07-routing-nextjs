type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export default function NotesLayout({ sidebar, children }: Props) {
  return (
    <section className="flex flex-col gap-6 md:flex-row">
      <aside className="shrink-0 md:w-52">{sidebar}</aside>
      <div className="min-w-0 flex-1 md:border-l md:border-border md:pl-6">
        {children}
        </div>
    </section>
  );
};



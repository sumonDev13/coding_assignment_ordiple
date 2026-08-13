export default function Header() {
  return (
    <header className="border-b border-border bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-5xl px-4 py-4">
        <h1 className="text-2xl font-bold text-foreground">Task Board</h1>
        <p className="text-sm text-muted-foreground">
          A small, clean task manager.
        </p>
      </div>
    </header>
  );
}

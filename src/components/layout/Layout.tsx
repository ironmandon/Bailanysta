
import { Navbar } from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="layout-container py-8">
          {children}
        </div>
      </main>
      <footer className="border-t border-border/40 bg-muted/40 py-6">
        <div className="layout-container text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Bailanysta. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

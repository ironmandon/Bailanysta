
import { Link, useLocation } from "react-router-dom";
import { Home, User, Bell } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/button";
import { usePosts } from "@/context/PostContext";

export function Navbar() {
  const location = useLocation();
  const { currentUser } = usePosts();
  
  return (
    <div className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-6xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-xl bg-gradient-to-r from-bailanysta-400 to-bailanysta-600 bg-clip-text text-transparent">Bailanysta</span>
          </Link>
        </div>
        
        <div className="flex flex-1 items-center justify-center md:justify-start">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              to="/"
              className={`flex items-center gap-2 transition-colors hover:text-bailanysta-500 ${
                location.pathname === "/" ? "text-bailanysta-500" : "text-muted-foreground"
              }`}
            >
              <Home size={20} />
              <span className="hidden sm:inline">Home</span>
            </Link>
            <Link
              to="/profile"
              className={`flex items-center gap-2 transition-colors hover:text-bailanysta-500 ${
                location.pathname === "/profile" ? "text-bailanysta-500" : "text-muted-foreground"
              }`}
            >
              <User size={20} />
              <span className="hidden sm:inline">Profile</span>
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center justify-end space-x-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-bailanysta-500"></span>
          </Button>
          <ThemeToggle />
          <Link to="/profile" className="relative h-8 w-8 overflow-hidden rounded-full">
            {currentUser.avatar ? (
              <img src={currentUser.avatar} alt={currentUser.name} className="h-full w-full object-cover" />
            ) : (
              <div className="user-avatar flex h-full w-full items-center justify-center text-sm font-medium">
                {currentUser.name.charAt(0)}
              </div>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}


import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, PlusCircle } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-primary">
          <BookOpen className="w-8 h-8" />
          <span>Ogene</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            Home
          </Link>
        </nav>

        <Link to="/admin">
          <Button className="flex items-center gap-2">
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">New Article</span>
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;

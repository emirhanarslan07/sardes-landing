import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-2xl font-bold tracking-tight font-poppins">
          sardes<span className="text-primary">.</span>
        </div>
        <Button variant="outline" size="sm" className="font-medium">
          Giriş Yap
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;

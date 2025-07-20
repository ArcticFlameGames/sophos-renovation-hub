import { useTranslation } from "react-i18next";
import { Link } from "react-scroll";
import { useTheme } from "next-themes";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { LanguageToggle } from "./LanguageToggle";
import { useState, useEffect } from "react";
import logo from "@/assets/logotransparent.png";

export const Navbar = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: t('navigation.home'), to: 'home' },
    { name: t('navigation.services'), to: 'services' },
    { name: t('navigation.projects'), to: 'portfolio' },
    { name: t('navigation.about'), to: 'about' },
    { name: t('navigation.contact'), to: 'contact' },
  ];

  const handleNavClick = (to: string) => {
    setIsOpen(false);
    const element = document.getElementById(to);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/95 backdrop-blur-md shadow-md' : 'bg-background/80 backdrop-blur-md border-b border-border'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link 
              to="home" 
              smooth={true} 
              duration={500} 
              className="flex items-center h-12"
              onClick={() => setIsOpen(false)}
            >
              <img 
                src={logo} 
                alt="Sophos Construction" 
                className="h-full w-auto object-contain"
              />
            </Link>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="text-foreground/70 hover:text-foreground"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.to}
                activeClass="!text-construction-red"
                to={item.to}
                spy={true}
                smooth={true}
                duration={500}
                offset={-80}
                className="text-sm font-medium text-foreground/80 hover:text-construction-red transition-colors cursor-pointer py-2 px-1 border-b-2 border-transparent hover:border-construction-red/30"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-background shadow-lg rounded-b-lg border-t border-border">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <div
                    key={item.to}
                    onClick={() => handleNavClick(item.to)}
                    className="block px-3 py-2 text-base font-medium text-foreground/80 hover:text-construction-red hover:bg-foreground/5 rounded-md cursor-pointer"
                  >
                    {item.name}
                  </div>
                ))}
                <div className="flex items-center justify-center p-4 border-t border-border mt-2">
                  <LanguageToggle />
                </div>
              </div>
            </div>
          )}
          <div className="hidden md:block">
            <LanguageToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

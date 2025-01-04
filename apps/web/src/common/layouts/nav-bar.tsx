"use client"

import { Menu, Globe } from "lucide-react";
import { Button } from "@prep-ai/ui/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@prep-ai/ui/components/ui/dropdown-menu";
import { useTranslation } from "../i18n";

const Navbar = () => {
  const { t, language, setLanguage } = useTranslation();
  /* const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false); */

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            {t('nav.home')}
            </span>
          </a>

          {/* Main Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            
           
          </nav>

          {/* Auth and Language */}
          <div className="hidden md:flex items-center gap-4">
          <a href="#features" className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">
              {t('nav.features')}
            </a>
            <a href="#experts" className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">
            {t('nav.findExperts')}
            </a>
            <a href="talent" className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">
              {t('nav.talents')}
            </a>  
            <a href="/login">
              <Button variant="ghost">{t('nav.signIn')}</Button>
            </a>
            <Button onClick={() => window.location.href = '/register'}>{t('nav.getStarted')}</Button>

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium p-2 hover:bg-slate-100 rounded-md">
                <Globe className="h-4 w-4" />
                <span className="uppercase">{language}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem 
                  onSelect={() => setLanguage('en')}
                  className={language === 'en' ? 'bg-slate-100' : ''}
                >
                  English
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onSelect={() => setLanguage('fr')}
                  className={language === 'fr' ? 'bg-slate-100' : ''}
                >
                  Français
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

const HeaderSection: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg text-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <Image
            src="/images/logo_blanc.png"
            alt="Logo Dinero Photographie"
            width={80}
            height={80}
            className="w-16 h-16 sm:w-20 sm:h-20"
          />
        </Link>
        <nav className="hidden sm:flex items-center gap-6">
          <Link
            href="/"
            className="text-white/70 hover:text-white transition-colors duration-300"
          >
            Accueil
          </Link>
          <Link
            href="/#gallery"
            className="text-white/70 hover:text-white transition-colors duration-300"
          >
            Galerie
          </Link>
          <Link
            href="/#services"
            className="text-white/70 hover:text-white transition-colors duration-300"
          >
            Services
          </Link>
          <Link
            href="/#contact"
            className="text-white/70 hover:text-white transition-colors duration-300"
          >
            Contact
          </Link>
        </nav>
        <Button
          variant="ghost"
          size="icon"
          className="sm:hidden text-white"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>
      <div
        className={`sm:hidden overflow-hidden ${isMenuOpen ? 'h-auto opacity-100' : 'h-0 opacity-0'} transition-all duration-500`}
      >
        <div className="flex flex-col items-center gap-4 py-4">
          <Link
            href="/"
            className="text-white/70 hover:text-white transition-colors duration-300"
            onClick={toggleMenu}
          >
            Accueil
          </Link>
          <Link
            href="/#gallery"
            className="text-white/70 hover:text-white transition-colors duration-300"
            onClick={toggleMenu}
          >
            Galerie
          </Link>
          <Link
            href="/#services"
            className="text-white/70 hover:text-white transition-colors duration-300"
            onClick={toggleMenu}
          >
            Services
          </Link>
          <Link
            href="/#contact"
            className="text-white/70 hover:text-white transition-colors duration-300"
            onClick={toggleMenu}
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
};

export default HeaderSection;
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-900">Landing</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Home
            </a>
            <a href="#services" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Services
            </a>
            <a href="#about" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              About
            </a>
            <a href="#contact" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Contact
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <a href="#home" className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium">
                Home
              </a>
              <a href="#services" className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium">
                Services
              </a>
              <a href="#about" className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium">
                About
              </a>
              <a href="#contact" className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium">
                Contact
              </a>
              <div className="pt-4">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
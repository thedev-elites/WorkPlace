
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Button from '../ui-components/Button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLoggedIn = false; // Replace with actual auth state
  
  const renderAuthButtons = () => {
    if (isLoggedIn) {
      return (
        <div className="flex items-center gap-4">
          <Link to="/dashboard">
            <Button variant="primary">Dashboard</Button>
          </Link>
        </div>
      );
    }
    
    return (
      <div className="flex items-center gap-4">
        <Link to="/login">
          <Button variant="outline" size="sm">Log In</Button>
        </Link>
        <Link to="/signup">
          <Button variant="primary" size="sm">Sign Up</Button>
        </Link>
      </div>
    );
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center">
            <span className="text-xl md:text-2xl font-bold text-blue">CareerSync<span className="text-foreground">AI</span></span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'text-blue font-medium' : 'text-foreground hover:text-blue transition-colors'}`}>
              Home
            </Link>
            <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'text-blue font-medium' : 'text-foreground hover:text-blue transition-colors'}`}>
              Dashboard
            </Link>
            <Link to="/resume-builder" className={`nav-link ${location.pathname === '/resume-builder' ? 'text-blue font-medium' : 'text-foreground hover:text-blue transition-colors'}`}>
              Resume
            </Link>
            <Link to="/auto-apply" className={`nav-link ${location.pathname === '/auto-apply' ? 'text-blue font-medium' : 'text-foreground hover:text-blue transition-colors'}`}>
              Auto Apply
            </Link>
          </nav>
          
          <div className="hidden md:block">
            {renderAuthButtons()}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-md"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background">
          <div className="px-4 py-5 space-y-3">
            <Link to="/" className={`block py-2 ${location.pathname === '/' ? 'text-blue font-medium' : 'text-foreground'}`}>
              Home
            </Link>
            <Link to="/dashboard" className={`block py-2 ${location.pathname === '/dashboard' ? 'text-blue font-medium' : 'text-foreground'}`}>
              Dashboard
            </Link>
            <Link to="/resume-builder" className={`block py-2 ${location.pathname === '/resume-builder' ? 'text-blue font-medium' : 'text-foreground'}`}>
              Resume
            </Link>
            <Link to="/auto-apply" className={`block py-2 ${location.pathname === '/auto-apply' ? 'text-blue font-medium' : 'text-foreground'}`}>
              Auto Apply
            </Link>
            <div className="pt-3">
              {renderAuthButtons()}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

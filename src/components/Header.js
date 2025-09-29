import React, { useState } from 'react';
import { Sun, Moon, Menu, X, Download, Home } from 'lucide-react';
import { navigationItems } from '../data/portfolioData';
import { scrollToSection } from '../hooks/useScrollspy';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from '../data/translations';
import LanguageToggle from './LanguageToggle';

const Header = ({ 
  activeSection, 
  scrollY 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentLanguage } = useLanguage();
  const { darkMode, toggleTheme } = useTheme();
  const { t } = useTranslation(currentLanguage);

  const handleNavClick = (sectionId) => {
    scrollToSection(sectionId);
    setMobileMenuOpen(false);
  };

  const handleDownloadResume = () => {
    // Add your resume download logic here
    console.log('Downloading resume...');
  };

  const getNavLabel = (item) => {
    if (item.id === 'home') {
      return <Home size={18} />;
    }
    return typeof item.label === 'object' ? item.label[currentLanguage] : item.label;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrollY > 50 
        ? darkMode 
          ? 'bg-gray-900/95 backdrop-blur-md shadow-2xl border-b border-gray-700/50' 
          : 'bg-white/95 backdrop-blur-md shadow-2xl border-b border-gray-200/50'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mr-8">
            NB
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-2">
            {navigationItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-5 py-3 text-sm font-medium transition-all duration-300 ${
                  activeSection === item.id 
                    ? 'text-blue-600' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                {getNavLabel(item)}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></span>
                )}
              </button>
            ))}
            
            {/* Language Toggle */}
            <div className="ml-4">
              <LanguageToggle />
            </div>
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-gray-200 dark:border-gray-700 ml-2"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            {/* Download Resume Button */}
            <a 
                href="/resume.pdf" 
                download="Nisasu_Bozkurt_Resume.pdf"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2 ml-4"
              >
              <Download size={18} />
              {t('nav.resume')}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-3">
            <LanguageToggle />
            <button
              onClick={toggleTheme}
              className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-xl">
            <div className="px-4 sm:px-6 py-6 space-y-3">
              {navigationItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-3 w-full text-left py-4 px-5 rounded-lg transition-colors ${
                    activeSection === item.id
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {getNavLabel(item)}
                </button>
              ))}
              <button 
                onClick={handleDownloadResume}
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl flex items-center justify-center gap-2 mt-4"
              >
                <Download size={18} />
                {t('nav.downloadResume')}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
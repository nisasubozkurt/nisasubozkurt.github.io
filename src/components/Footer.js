import React from 'react';
import { Linkedin, Mail } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../data/translations';

const Footer = () => {
  const { currentLanguage } = useLanguage();
  const { t } = useTranslation(currentLanguage);

  return (
    <footer className="py-12 px-6 lg:px-8 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo/Name */}
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {personalInfo.name}
          </div>
          
          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a 
              href={personalInfo.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={24} />
            </a>
            <a 
              href={`mailto:${personalInfo.email}`} 
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors"
              aria-label="Email Contact"
            >
              <Mail size={24} />
            </a>
          </div>
          
          {/* Copyright */}
          <p className="text-gray-600 dark:text-gray-400 text-center md:text-right">
            © 2025 {personalInfo.name}. {t('footer.allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
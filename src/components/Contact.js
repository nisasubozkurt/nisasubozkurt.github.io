import React from 'react';
import { Mail, Phone, Linkedin, Github, ArrowRight } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../data/translations';

const Contact = () => {
  const { currentLanguage } = useLanguage();
  const { t } = useTranslation(currentLanguage);

  const handleEmailClick = () => {
    window.open(`mailto:${personalInfo.email}`);
  };

  const handlePhoneClick = () => {
    window.open(`tel:${personalInfo.phone}`);
  };

  const handleLinkedInClick = () => {
    window.open(personalInfo.linkedin, '_blank', 'noopener noreferrer');
  };

  const handleGitHubClick = () => {
    window.open(personalInfo.github, '_blank', 'noopener noreferrer');
  };

  return (
    <section id="contact" className="py-20 px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-4xl mx-auto text-center">
        {/* Section Header */}
        <h2 className="text-4xl lg:text-5xl font-bold mb-6">{t('contact.title')}</h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-16 max-w-2xl mx-auto">
          {t('contact.subtitle')}
        </p>
        
        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Email Card */}
          <button 
            onClick={handleEmailClick}
            className="group bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-2 hover:border-blue-300 transition-all duration-500 text-center min-h-[200px] flex flex-col justify-center"
          >
            <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-xl">
              <Mail className="text-white transition-transform duration-300" size={20} />
            </div>
            <h3 className="text-lg font-bold mb-3 group-hover:text-blue-600 transition-colors duration-300">{t('contact.email')}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 break-words group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300 leading-relaxed">
              {personalInfo.email} <br />
              {personalInfo.email2}
            </p>
          </button>
          
          {/* Phone Card */}
          <button 
            onClick={handlePhoneClick}
            className="group bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-2 hover:border-green-300 transition-all duration-500 text-center min-h-[200px] flex flex-col justify-center"
          >
            <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-xl">
              <Phone className="text-white transition-transform duration-300" size={20} />
            </div>
            <h3 className="text-lg font-bold mb-3 group-hover:text-green-600 transition-colors duration-300">{t('contact.phone')}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">{personalInfo.phone}</p>
          </button>
          
          {/* LinkedIn Card */}
          <button 
            onClick={handleLinkedInClick}
            className="group bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-2 hover:border-blue-400 transition-all duration-500 text-center min-h-[200px] flex flex-col justify-center"
          >
            <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-xl">
              <Linkedin className="text-white transition-transform duration-300" size={20} />
            </div>
            <h3 className="text-lg font-bold mb-3 group-hover:text-blue-600 transition-colors duration-300">{t('contact.linkedin')}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">{t('contact.connectWithMe')}</p>
          </button>

          {/* GitHub Card */}
          <button 
            onClick={handleGitHubClick}
            className="group bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-2 hover:border-blue-400 transition-all duration-500 text-center min-h-[200px] flex flex-col justify-center"
          >
            <div className="w-14 h-14 bg-gradient-to-r from-gray-700 to-gray-900 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-xl">
              <Github className="text-white transition-transform duration-300" size={20} />
            </div>
            <h3 className="text-lg font-bold mb-3 group-hover:text-gray-700 transition-colors duration-300">{t('contact.github')}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">{t('contact.connectWithMe')}</p>
          </button>
        </div>
        
        {/* Main CTA Button */}
        <div className="text-center">
          <button 
            onClick={handleEmailClick}
            className="group px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 hover:scale-110 text-lg font-semibold flex items-center gap-3 mx-auto hover:from-blue-700 hover:to-purple-700"
          >
            {t('contact.startConversation')}
            <ArrowRight size={20} className="group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
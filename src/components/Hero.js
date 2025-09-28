import React from 'react';
import { ArrowRight, Target, Award, TrendingUp, Zap, Brain, Code } from 'lucide-react';
import { stats } from '../data/portfolioData';
import { scrollToSection } from '../hooks/useScrollspy';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../data/translations';
import { useTypewriter } from '../hooks/useTypewriter';
import profilePhoto from '../assets/images/profile/nisasu_bozkurt.jpg';


const Hero = () => {
  const { currentLanguage } = useLanguage();
  const { t } = useTranslation(currentLanguage);
  
  // Get titles for typewriter effect
  const titles = t('hero.titles');
  const { text: typewriterText } = useTypewriter(titles, 80, 40, 2500);
  
  const iconMap = {
    Target,
    Award, 
    TrendingUp,
    Zap
  };

  const getStatLabel = (stat) => {
    return typeof stat.label === 'object' ? stat.label[currentLanguage] : stat.label;
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900/20"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-20">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              {t('hero.availableForOpportunities')}
            </div>
            
            {/* Name */}
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-gray-900 dark:text-white">Nisasu</span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Bozkurt
              </span>
            </h1>
            
            {/* Typewriter Title */}
            <div className="mb-8">
              <h2 className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 font-light min-h-[3rem] flex items-center justify-center lg:justify-start">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-medium">
                  {typewriterText}
                </span>
                <span className="animate-pulse text-blue-600 ml-1 font-bold">|</span>
              </h2>
            </div>
            
            {/* Description */}
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
              {t('hero.description')}
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <button 
                onClick={() => scrollToSection('projects')}
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 hover:scale-110 flex items-center justify-center gap-2 hover:from-blue-700 hover:to-purple-700"
              >
                {t('hero.viewMyWork')}
                <ArrowRight size={20} className="group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300" />
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300"
              >
                {t('hero.getInTouch')}
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const IconComponent = iconMap[stat.icon];
                return (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mb-2">
                      <IconComponent className="text-white" size={20} />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{getStatLabel(stat)}</div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Profile Image/Avatar */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-3xl bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 p-1 shadow-2xl">
                <div className="w-full h-full rounded-3xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                  {/* Profil fotoğrafını buraya ekleyebilirsin */}
                  <img 
                    src={profilePhoto}
                    alt="Nisasu Bozkurt"
                    className="w-full h-full rounded-3xl object-cover"
                  />
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-xl animate-bounce">
                <Brain className="text-yellow-800" size={24} />
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-green-400 rounded-xl flex items-center justify-center shadow-xl animate-pulse">
                <Code className="text-green-800" size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
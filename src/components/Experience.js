import React from 'react';
import { Briefcase, TrendingUp } from 'lucide-react';
import { experiences } from '../data/portfolioData';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../data/translations';

const Experience = () => {
  const { currentLanguage } = useLanguage();
  const { t } = useTranslation(currentLanguage);

  const getExperienceValue = (exp, field) => {
    return typeof exp[field] === 'object' ? exp[field][currentLanguage] : exp[field];
  };

  const getHighlights = (exp) => {
    if (typeof exp.highlights === 'object' && exp.highlights[currentLanguage]) {
      return exp.highlights[currentLanguage];
    }
    return exp.highlights || [];
  };

  return (
    <section id="experience" className="py-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">{t('experience.title')}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('experience.subtitle')}
          </p>
        </div>
        
        {/* Experience Timeline */}
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Column - Basic Info */}
                <div className="lg:w-1/3">
                  <div className="sticky top-32">
                    {/* Type Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-3">
                      {getExperienceValue(exp, 'type')}
                    </div>
                    
                    {/* Position & Company */}
                    <h3 className="text-2xl font-bold mb-2">{getExperienceValue(exp, 'title')}</h3>
                    <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold mb-1">
                      {getExperienceValue(exp, 'company')}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      {getExperienceValue(exp, 'period')}
                    </p>
                    <p className="text-gray-500 dark:text-gray-500 text-sm">
                      {getExperienceValue(exp, 'location')}
                    </p>
                  </div>
                </div>
                
                {/* Right Column - Detailed Content */}
                <div className="lg:w-2/3">
                  <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group">
                    {/* Description */}
                    {exp.description && exp.description !== '#' && (
                    <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed text-lg">
                      {getExperienceValue(exp, 'description')}
                    </p>
                    )}
                    
                    {/* Key Responsibilities */}
                    {exp.highlights && exp.highlights !== '#' && (
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
                        <Briefcase className="text-blue-600 group-hover:scale-110 transition-transform duration-300" size={16} />
                        {t('experience.keyResponsibilities')}
                      </h4>
                      <div className="grid gap-3">
                        {getHighlights(exp).map((highlight, idx) => (
                          <div key={idx} className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-300">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                            <span className="text-gray-600 dark:text-gray-300">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    )}
                    
                    {/* Impact Section */}
                    {exp.impact && exp.impact !== '#' && (
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-xl border-l-4 border-green-500 hover:border-l-8 hover:shadow-lg transition-all duration-300">
                      <h4 className="font-semibold text-green-800 dark:text-green-400 mb-1 flex items-center gap-2">
                        <TrendingUp size={16} className="group-hover:scale-110 transition-transform duration-300" />
                        {t('experience.impact')}
                      </h4>
                      <p className="text-green-700 dark:text-green-300 text-sm">
                        {getExperienceValue(exp, 'impact')}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Timeline Connector */}
              {index < experiences.length - 1 && (
                <div className="absolute left-6 lg:left-1/3 top-20 w-0.5 h-20 bg-gradient-to-b from-blue-600 to-purple-600 hidden lg:block"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;

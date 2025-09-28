import React from 'react';
import { 
  Star, 
  Brain, 
  GraduationCap, 
  MapPin, 
  Award, 
  CheckCircle, 
  Target 
} from 'lucide-react';
import { personalInfo, achievements } from '../data/portfolioData';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../data/translations';

const About = () => {
  const { currentLanguage } = useLanguage();
  const { t } = useTranslation(currentLanguage);

  const getPersonalInfoValue = (field) => {
    return typeof personalInfo[field] === 'object' ? personalInfo[field][currentLanguage] : personalInfo[field];
  };

  return (
    <section id="about" className="py-20 px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">{t('about.title')}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            {/* Professional Excellence */}
            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Star className="text-white" size={16} />
                </div>
                {t('about.professionalExcellence')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {t('about.professionalText')}
              </p>
            </div>
            
            {/* Technical Expertise */}
            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Brain className="text-white" size={16} />
                </div>
                {t('about.technicalExpertise')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {t('about.technicalText')}
              </p>
            </div>

            {/* Personal Info Cards */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <GraduationCap className="text-blue-600 mb-3 transition-colors duration-300" size={24} />
                <h4 className="font-semibold mb-1">{t('about.education')}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{getPersonalInfoValue('degree')}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">GPA: {personalInfo.gpa}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <MapPin className="text-green-600 mb-3 transition-colors duration-300" size={24} />
                <h4 className="font-semibold mb-1">{t('about.location')}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{getPersonalInfoValue('location')}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('about.locationDetails')}</p>
              </div>
            </div>
          </div>
          
          {/* Right Column - Cards */}
          <div className="space-y-6">
            {/* Key Achievements Card */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <Award className="text-yellow-500 group-hover:scale-110 transition-transform duration-300" size={24} />
                {t('about.keyAchievements')}
              </h3>
              <div className="space-y-4">
                {t('about.achievements').map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3 hover:translate-x-2 transition-transform duration-300">
                    <CheckCircle className="text-green-500 flex-shrink-0 transition-colors duration-300" size={16} />
                    <span className="text-gray-700 dark:text-gray-300">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Core Specializations Card */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <Target className="text-purple-500 group-hover:scale-110 transition-transform duration-300" size={24} />
                {t('about.coreSpecializations')}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {t('about.specializations').map((spec, index) => (
                  <div key={index} className="flex items-center gap-2 hover:translate-x-2 transition-transform duration-300">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300"></div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
import React from 'react';
import { Brain, Code, Database, Users } from 'lucide-react';
import { skills } from '../data/portfolioData';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../data/translations';

const Skills = () => {
  const { currentLanguage } = useLanguage();
  const { t } = useTranslation(currentLanguage);
  
  const iconMap = {
    Brain,
    Code,
    Database,
    Users
  };

  const getSkillValue = (skill, field) => {
    return typeof skill[field] === 'object' ? skill[field][currentLanguage] : skill[field];
  };

  const getSkillName = (skillItem) => {
    return typeof skillItem.name === 'object' ? skillItem.name[currentLanguage] : skillItem.name;
  };

  return (
    <section id="skills" className="py-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">{t('skills.title')}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('skills.subtitle')}
          </p>
        </div>
        
        {/* Skills Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {skills.map((skillGroup, index) => {
            const IconComponent = iconMap[skillGroup.icon];
            return (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group"
              >
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-14 h-14 bg-gradient-to-r ${skillGroup.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <IconComponent className="text-white" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold group-hover:text-blue-600 transition-colors duration-300">{getSkillValue(skillGroup, 'category')}</h3>
                </div>
                
                {/* Skills with Progress Bars */}
                <div className="space-y-6">
                  {skillGroup.items && skillGroup.items.map((skill, idx) => (
                    <div key={idx} className="space-y-2 group/skill hover:translate-x-2 transition-transform duration-300">
                      {/* Skill Name and Level */}
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 dark:text-gray-300 font-medium group-hover/skill:text-blue-600 transition-colors duration-300">
                          {getSkillName(skill)}
                        </span>
                        <span className="text-sm text-gray-500 group-hover/skill:text-blue-500 transition-colors duration-300">{skill.level}%</span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                        <div 
                          className={`bg-gradient-to-r ${skillGroup.color} h-2.5 rounded-full transition-all duration-1000 ease-out group-hover/skill:shadow-lg`}
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
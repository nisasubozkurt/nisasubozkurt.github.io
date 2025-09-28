import React from 'react';
import { Award, TrendingUp, ExternalLink } from 'lucide-react';
import { projects } from '../data/portfolioData';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../data/translations';

const Projects = () => {
  const { currentLanguage } = useLanguage();
  const { t } = useTranslation(currentLanguage);

  const getProjectValue = (project, field) => {
    return typeof project[field] === 'object' ? project[field][currentLanguage] : project[field];
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Production':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
      case 'Live':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
      case 'Development':
        return 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300';
      case 'Pilot':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300';
      case 'Concept':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300';
      case 'Prototype':
        return 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <section id="projects" className="py-20 px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">{t('projects.title')}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </div>
        
        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            const isLastOdd = projects.length % 2 === 1 && index === projects.length - 1;
            return (
              <div 
                key={index} 
                className={`group bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${isLastOdd ? 'lg:col-start-1 lg:col-end-3 lg:max-w-2xl lg:mx-auto' : ''}`}
              >
              <div className="p-8">
                {/* Header with Category and Status */}
                <div className="flex items-start justify-between mb-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                    {getProjectValue(project, 'category')}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status}
                  </div>
                </div>
                
                {/* Project Title */}
                <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-600 transition-colors">
                  {getProjectValue(project, 'title') || project.title}
                </h3>
                
                {/* Project Description */}
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {getProjectValue(project, 'description')}
                </p>
                
                {/* Technology Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech && project.tech.map((tech, idx) => (
                    <span 
                      key={idx} 
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* Achievement, Impact, and Link */}
                <div className="space-y-4">
                  {/* Achievement */}
                  <div className="flex items-center gap-3">
                    <Award className="text-yellow-500 flex-shrink-0" size={20} />
                    <span className="text-yellow-600 dark:text-yellow-400 font-medium">
                      {getProjectValue(project, 'achievement')}
                    </span>
                  </div>
                  
                  {/* Impact */}
                  {project.impact && project.impact !== '#' && (
                    <div className="flex items-center gap-3">
                      <TrendingUp className="text-green-500 flex-shrink-0" size={20} />
                      <span className="text-gray-600 dark:text-gray-300">
                        {getProjectValue(project, 'impact')}
                      </span>
                    </div>
                  )}
                 
                  
                  {/* Project Link */}
                  {project.link && project.link !== '#' && (
                    <div className="pt-4">
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors font-medium group"
                      >
                        {t('projects.viewProject')}
                        <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Star, 
  GitFork, 
  Eye, 
  Calendar, 
  Code, 
  ExternalLink,
  AlertCircle,
  RefreshCw,
  Clock
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../data/translations';

const GitHubProjects = () => {
  const [allRepos, setAllRepos] = useState([]);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [languageFilter, setLanguageFilter] = useState('all');
  const [sortBy, setSortBy] = useState('updated');
  const [showAll, setShowAll] = useState(false);
  
  const { currentLanguage } = useLanguage();
  const { t } = useTranslation(currentLanguage);

  const GITHUB_USERNAME = 'nisasubozkurt';
  const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

  // Extract unique languages from all repos
  const getUniqueLanguages = (repos) => {
    const languages = repos
      .map(repo => repo.language)
      .filter(language => language !== null && language !== undefined)
      .filter((language, index, self) => self.indexOf(language) === index)
      .sort();
    return languages;
  };

  // Filter and sort repos based on current filters
  const filterAndSortRepos = (allRepos, filter, languageFilter, sortBy) => {
    return allRepos
      .filter(repo => {
        // Filter by source/fork
        const sourceFilter = filter === 'all' || (filter === 'source' && !repo.fork);
        // Filter by language
        const languageFilterPass = languageFilter === 'all' || repo.language === languageFilter;
        return sourceFilter && languageFilterPass;
      })
      .sort((a, b) => {
        if (sortBy === 'stars') return b.stargazers_count - a.stargazers_count;
        if (sortBy === 'updated') return new Date(b.updated_at) - new Date(a.updated_at);
        if (sortBy === 'created') return new Date(b.created_at) - new Date(a.created_at);
        return 0;
      });
  };

  const fetchGitHubRepos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${GITHUB_API_URL}?sort=${sortBy}&per_page=50`);
      
      if (!response.ok) {
        throw new Error(`GitHub API Error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Store all repos
      setAllRepos(data);
      
      // Apply current filters
      const filteredRepos = filterAndSortRepos(data, filter, languageFilter, sortBy);
      setRepos(filteredRepos);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching GitHub repos:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch repos from GitHub
  useEffect(() => {
    fetchGitHubRepos();
  }, []);

  // Apply filters when they change
  useEffect(() => {
    if (allRepos.length > 0) {
      const filteredRepos = filterAndSortRepos(allRepos, filter, languageFilter, sortBy);
      setRepos(filteredRepos);
    }
  }, [filter, languageFilter, sortBy, allRepos]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return currentLanguage === 'tr' ? '1 gün önce' : '1 day ago';
    if (diffDays < 7) return currentLanguage === 'tr' ? `${diffDays} gün önce` : `${diffDays} days ago`;
    if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return currentLanguage === 'tr' ? `${weeks} hafta önce` : `${weeks} weeks ago`;
    }
    if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return currentLanguage === 'tr' ? `${months} ay önce` : `${months} months ago`;
    }
    const years = Math.floor(diffDays / 365);
    return currentLanguage === 'tr' ? `${years} yıl önce` : `${years} years ago`;
  };

  const getLanguageColor = (language) => {
    const colors = {
      JavaScript: '#f1e05a',
      TypeScript: '#2b7489',
      Python: '#3572A5',
      Java: '#b07219',
      HTML: '#e34c26',
      CSS: '#1572B6',
      React: '#61dafb',
      Vue: '#4FC08D',
      PHP: '#777bb4',
      C: '#555555',
      'C++': '#f34b7d',
      'C#': '#239120',
      Go: '#00ADD8',
      Rust: '#dea584',
      Swift: '#ffac45',
      Kotlin: '#F18E33',
      Dart: '#00B4AB',
      Ruby: '#701516',
      Shell: '#89e051',
      Dockerfile: '#384d54'
    };
    return colors[language] || '#8b949e';
  };

  if (loading) {
    return (
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 text-lg text-gray-600 dark:text-gray-300">
              <RefreshCw className="animate-spin" size={24} />
              {currentLanguage === 'tr' ? 'GitHub projeleri yükleniyor...' : 'Loading GitHub projects...'}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 text-red-600 dark:text-red-400 mb-4">
              <AlertCircle size={24} />
              <span>{currentLanguage === 'tr' ? 'Projeler yüklenirken hata oluştu' : 'Error loading projects'}</span>
            </div>
            <button
              onClick={fetchGitHubRepos}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {currentLanguage === 'tr' ? 'Tekrar Dene' : 'Try Again'}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="github" className="py-20 px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <Github className="text-gray-800 dark:text-white" size={32} />
            <h2 className="text-4xl lg:text-5xl font-bold">
              {currentLanguage === 'tr' ? 'GitHub Projeleri' : 'GitHub Projects'}
            </h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {currentLanguage === 'tr' 
              ? 'GitHub\'daki açık kaynak projelerim ve kod örnekleri. Gerçek zamanlı olarak güncellenir.'
              : 'My open source projects and code examples on GitHub. Updated in real-time.'
            }
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {currentLanguage === 'tr' ? 'Dil:' : 'Language:'}
            </span>
            <select
              value={languageFilter}
              onChange={(e) => setLanguageFilter(e.target.value)}
              className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">{currentLanguage === 'tr' ? 'Tüm Diller' : 'All Languages'}</option>
              {getUniqueLanguages(allRepos).map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {currentLanguage === 'tr' ? 'Sırala:' : 'Sort by:'}
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="updated">{currentLanguage === 'tr' ? 'Son Güncelleme' : 'Last Updated'}</option>
              <option value="stars">{currentLanguage === 'tr' ? 'Yıldız Sayısı' : 'Stars'}</option>
              <option value="created">{currentLanguage === 'tr' ? 'Oluşturma Tarihi' : 'Created Date'}</option>
            </select>
          </div>
          
          <button
            onClick={fetchGitHubRepos}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            <RefreshCw size={16} />
            {currentLanguage === 'tr' ? 'Yenile' : 'Refresh'}
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {(showAll ? repos : repos.slice(0, 8)).map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer block"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors duration-300 truncate">
                    {repo.name}
                  </h3>
                  {repo.fork && (
                    <span className="inline-flex items-center gap-1 text-xs text-gray-500 mt-1">
                      <GitFork size={12} />
                      Fork
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 ml-2">
                  <ExternalLink size={14} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 text-xs mb-3 line-clamp-2 min-h-[2rem]">
                {repo.description || (currentLanguage === 'tr' ? 'Açıklama bulunmuyor' : 'No description available')}
              </p>

              {/* Language & Stats */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                  {repo.language && (
                    <div className="flex items-center gap-1">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: getLanguageColor(repo.language) }}
                      ></div>
                      <span>{repo.language}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                  {repo.stargazers_count > 0 && (
                    <div className="flex items-center gap-1">
                      <Star size={12} />
                      <span>{repo.stargazers_count}</span>
                    </div>
                  )}
                  {repo.forks_count > 0 && (
                    <div className="flex items-center gap-1">
                      <GitFork size={12} />
                      <span>{repo.forks_count}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock size={10} />
                  <span>{formatDate(repo.updated_at)}</span>
                </div>
                
                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {repo.topics.slice(0, 1).map((topic) => (
                      <span
                        key={topic}
                        className="px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full"
                      >
                        {topic}
                      </span>
                    ))}
                    {repo.topics.length > 1 && (
                      <span className="text-xs text-gray-500">
                        +{repo.topics.length - 1}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>

        {/* Show More Button */}
        {repos.length > 8 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {showAll ? (
                <>
                  <Eye className="w-5 h-5" />
                  {currentLanguage === 'tr' ? 'Daha Az Göster' : 'Show Less'}
                </>
              ) : (
                <>
                  <Github className="w-5 h-5" />
                  {currentLanguage === 'tr' ? 'Daha Fazla Göster' : 'Show More'}
                </>
              )}
            </button>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {currentLanguage === 'tr' 
                ? `${repos.length} projeden ${showAll ? '8' : repos.length} tanesi gösteriliyor`
                : `Showing ${showAll ? '8' : repos.length} of ${repos.length} projects`
              }
            </p>
          </div>
        )}

        {repos.length === 0 && (
          <div className="text-center py-12">
            <Github className="mx-auto mb-4 text-gray-400" size={48} />
            <p className="text-gray-600 dark:text-gray-400">
              {currentLanguage === 'tr' ? 'Proje bulunamadı' : 'No projects found'}
            </p>
          </div>
        )}

        {/* Footer Info */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {currentLanguage === 'tr' 
              ? `Toplam ${repos.length} proje GitHub'dan anlık olarak çekildi`
              : `Total ${repos.length} projects fetched live from GitHub`
            }
          </p>
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
          >
            <Github size={20} />
            {currentLanguage === 'tr' ? 'GitHub Profilimi Ziyaret Et' : 'Visit My GitHub Profile'}
          </a>
        </div>
      </div>
    </section>
  );
};

export default GitHubProjects;
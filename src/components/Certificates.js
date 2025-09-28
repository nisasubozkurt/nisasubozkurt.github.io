import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Calendar, 
  ExternalLink, 
  Building, 
  Filter,
  Search,
  CheckCircle,
  Star,
  Trophy,
  Medal,
  BookOpen
} from 'lucide-react';
import { certificates } from '../data/portfolioData';
import { useLanguage } from '../contexts/LanguageContext';

const Certificates = () => {
  const { currentLanguage } = useLanguage();
  
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(10);

  // Kategorileri portfolioData'daki sertifikalardan dinamik olarak oluştur
  const getUniqueCategories = () => {
    const categorySet = new Set(certificates.map(cert => cert.category));
    const categoryLabels = {
      ai: { en: 'AI & ML', tr: 'Yapay Zeka' },
      programming: { en: 'Programming', tr: 'Programlama' },
      rpa: { en: 'RPA', tr: 'RPA' },
      mobile: { en: 'Mobile', tr: 'Mobil' },
      cloud: { en: 'Cloud', tr: 'Bulut' },
      management: { en: 'Management', tr: 'Yönetim' },
      database: { en: 'Database', tr: 'Veritabanı' },
      web: { en: 'Web Development', tr: 'Web Geliştirme' },
      language: { en: 'Language', tr: 'Dil' },
      entrepreneurship: { en: 'Entrepreneurship', tr: 'Girişimcilik' }
    };

    return [
      { id: 'all', label: currentLanguage === 'tr' ? 'Tümü' : 'All', count: certificates.length },
      ...Array.from(categorySet).map(category => ({
        id: category,
        label: categoryLabels[category] ? categoryLabels[category][currentLanguage] : category,
        count: certificates.filter(c => c.category === category).length
      }))
    ];
  };

  const categories = getUniqueCategories();

  const iconMap = {
    Award,
    Trophy,
    Medal,
    Star,
    BookOpen
  };

  const getCertificateValue = (cert, field) => {
    if (typeof cert[field] === 'object' && cert[field][currentLanguage]) {
      return cert[field][currentLanguage];
    }
    return cert[field];
  };

  const filteredCertificates = certificates.filter(cert => {
    const matchesFilter = filter === 'all' || cert.category === filter;
    const title = getCertificateValue(cert, 'title');
    const organization = getCertificateValue(cert, 'organization');
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const displayedCertificates = filteredCertificates.slice(0, visibleCount);
  const hasMoreCertificates = filteredCertificates.length > visibleCount;
  const hasLessCertificates = visibleCount > 10;

  // Filtre veya arama değiştiğinde görüntülenen sertifika sayısını sıfırla
  useEffect(() => {
    setVisibleCount(10);
  }, [filter, searchTerm]);

  const formatDate = (dateString) => {
    const [year, month] = dateString.split('-');
    const months = currentLanguage === 'tr' 
      ? ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara']
      : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[parseInt(month) - 1]} ${year}`;
  };

  const getCategoryColor = (category) => {
    const colors = {
      ai: 'from-purple-500 to-pink-500',
      programming: 'from-blue-500 to-cyan-500',
      rpa: 'from-green-500 to-emerald-500',
      mobile: 'from-orange-500 to-red-500',
      cloud: 'from-indigo-500 to-purple-500',
      management: 'from-yellow-500 to-orange-500',
      database: 'from-teal-500 to-cyan-500',
      web: 'from-emerald-500 to-green-500',
      language: 'from-rose-500 to-pink-500',
      entrepreneurship: 'from-amber-500 to-yellow-500'
    };
    return colors[category] || 'from-gray-500 to-gray-600';
  };

  return (
    <section id="certificates" className="py-20 px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <Award className="text-yellow-500" size={32} />
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              {currentLanguage === 'tr' ? 'Sertifikalar' : 'Certificates'}
            </h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {currentLanguage === 'tr' 
              ? 'Teknik yetkinliklerimi gösteren profesyonel sertifikalar ve eğitim programları.'
              : 'Professional certificates and training programs showcasing my technical expertise.'
            }
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-col md:flex-row gap-6 mb-12">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  filter === category.id
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:transform hover:scale-105'
                }`}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {displayedCertificates.map((cert) => {
            const IconComponent = iconMap[cert.icon];
            return (
              <div
                key={cert.id}
                onClick={() => cert.link && cert.link !== '#' && window.open(cert.link, '_blank', 'noopener,noreferrer')}
                className={`group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden cursor-pointer ${
                  cert.link && cert.link !== '#' ? 'hover:border-blue-300 dark:hover:border-blue-600' : 'cursor-default'
                }`}
              >
                {/* Background Gradient */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${getCategoryColor(cert.category)}`}></div>
                
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-8 h-8 bg-gradient-to-r ${getCategoryColor(cert.category)} rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300`}>
                    <IconComponent className="text-white" size={16} />
                  </div>
                  {cert.link && cert.link !== '#' && (
                    <ExternalLink className="text-gray-400 group-hover:text-blue-500 transition-colors" size={14} />
                  )}
                </div>

                {/* Content */}
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 leading-tight">
                  {getCertificateValue(cert, 'title')}
                </h3>
                
                <div className="flex items-center gap-1 mb-2">
                  <Building className="text-gray-500" size={12} />
                  <span className="text-xs text-gray-600 dark:text-gray-400 truncate">
                    {getCertificateValue(cert, 'organization')}
                  </span>
                </div>
                
                <div className="flex items-center gap-1 mb-3">
                  <Calendar className="text-gray-500" size={12} />
                  <span className="text-xs text-gray-600 dark:text-gray-400">{formatDate(cert.date)}</span>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {cert.skills.slice(0, 2).map((skill, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 text-xs rounded-full text-white bg-gradient-to-r ${getCategoryColor(cert.category)}`}
                    >
                      {skill}
                    </span>
                  ))}
                  {cert.skills.length > 2 && (
                    <span className="text-xs text-gray-500 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">+{cert.skills.length - 2}</span>
                  )}
                </div>

                {/* Status */}
                <div className="flex items-center gap-1">
                  <CheckCircle className="text-green-500" size={12} />
                  <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                    {currentLanguage === 'tr' ? 'Doğrulandı' : 'Verified'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {displayedCertificates.length === 0 && (
          <div className="text-center py-12">
            <Award className="mx-auto mb-4 text-gray-400" size={48} />
            <p className="text-gray-600 dark:text-gray-400">
              {currentLanguage === 'tr' ? 'Arama kriterlerine uygun sertifika bulunamadı' : 'No certificates found matching your criteria'}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        {(hasMoreCertificates || hasLessCertificates) && (
          <div className="text-center mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            {hasMoreCertificates && (
              <button
                onClick={() => setVisibleCount(prev => prev + 10)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <BookOpen size={18} />
                {currentLanguage === 'tr' ? 'Daha Fazla Göster' : 'Show More'}
                <span className="text-sm opacity-80">
                  ({filteredCertificates.length - visibleCount} {currentLanguage === 'tr' ? 'daha' : 'more'})
                </span>
              </button>
            )}
            
            {hasLessCertificates && (
              <button
                onClick={() => setVisibleCount(10)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-medium rounded-xl hover:from-gray-700 hover:to-gray-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Filter size={18} />
                {currentLanguage === 'tr' ? 'Daha Az Göster' : 'Show Less'}
                <span className="text-sm opacity-80">
                  ({currentLanguage === 'tr' ? 'İlk 10' : 'First 10'})
                </span>
              </button>
            )}
          </div>
        )}

        {/* Summary */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl font-bold text-blue-600 mb-2">{certificates.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {currentLanguage === 'tr' ? 'Toplam Sertifika' : 'Total Certificates'}
              </div>
            </div>
            <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl font-bold text-purple-600 mb-2">{categories.length - 1}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {currentLanguage === 'tr' ? 'Farklı Kategori' : 'Different Categories'}
              </div>
            </div>
            <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {certificates.filter(c => c.date.startsWith('2025')).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {currentLanguage === 'tr' ? '2025 Sertifikaları' : '2025 Certificates'}
              </div>
            </div>
            <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {new Set(certificates.map(c => getCertificateValue(c, 'organization'))).size}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {currentLanguage === 'tr' ? 'Farklı Kurum' : 'Different Organizations'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certificates;
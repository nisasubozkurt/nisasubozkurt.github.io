import React from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import GitHubProjects from './components/GitHubProjects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Certificates from './components/Certificates';
import { useScrollspy, useScrollPosition, useScrollReveal } from './hooks/useScrollspy';
import { navigationItems } from './data/portfolioData';
import './styles/globals.css';

function AppContent() {
  const scrollY = useScrollPosition();
  const activeSection = useScrollspy(
    navigationItems.map(item => item.id),
    100
  );

  // Initialize scroll reveal animations
  useScrollReveal();

  return (
    <div className="min-h-screen transition-all duration-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <Header 
        activeSection={activeSection}
        scrollY={scrollY}
      />
      
      <main>
        <Hero />
        <div className="fade-in">
          <About />
        </div>
        <div className="fade-in">
          <Experience />
        </div>
        <div className="fade-in">
          <Projects />
        </div>
        <div className="fade-in">
          <GitHubProjects />
        </div>
        <div className="fade-in">
          <Skills />
        </div>
        <div className="fade-in">
          <Certificates />
        </div>
        <div className="fade-in">
          <Contact />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}
export default App;

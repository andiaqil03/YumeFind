import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TopNav = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [searchInView, setSearchInView] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY || currentScrollY < 80) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToSearch = () => {
    const el = document.getElementById('search-bar');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      // As fallback, navigate to home which contains the search bar
      navigate('/');
    }
  };

  useEffect(() => {
    const target = document.getElementById('search-bar');
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Consider in view when 60% visible
          setSearchInView(entry.isIntersecting && entry.intersectionRatio > 0.6);
        });
      },
      { threshold: [0.0, 0.25, 0.5, 0.6, 0.75, 1] }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Top floating navigation"
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-400 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-28 opacity-0'
      }`}
    >
      <div className="bg-white/6 backdrop-blur-md border border-white/8 rounded-full px-5 py-2 shadow-lg flex items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-neutral-100">YumeFind ✨</span>
        </div>

        <button
          onClick={scrollToSearch}
          aria-label="Scroll to search"
          className="ml-2 inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-800/60 hover:bg-gray-800/70 text-neutral-100 transition-shadow shadow-md relative"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>

          {/* indicator when search bar is in view */}
          {searchInView && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full shadow-md animate-pulse" aria-hidden="true" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default TopNav;

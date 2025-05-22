import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Gallery from './Gallery';
import { FiMoon, FiSun, FiSearch, FiX, FiChevronDown, FiUser, FiBook, FiDownload, FiImage } from 'react-icons/fi';
import '../css/Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  // Toggle dark mode and save preference
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
    localStorage.setItem('darkMode', newMode);
  };

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
    document.documentElement.classList.toggle('dark', savedMode);
  }, []);

  // Dropdown toggle with delay for better UX
  const toggleDropdown = (menu) => {
    if (activeDropdown === menu) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(menu);
    }
  };

  // Courses dropdown items
  const coursesMenu = [
    { title: 'Culinary Arts', path: '/courses/culinary' },
    { title: 'Hotel Management', path: '/courses/hotel-management' },
    { title: 'Hospitality', path: '/courses/hospitality' },
    { title: 'Food Safety', path: '/courses/food-safety' },
  ];

  // Faculty dropdown items
  const facultyMenu = [
    { title: 'Our Professors', path: '/faculty/professors' },
    { title: 'Guest Lecturers', path: '/faculty/guest-lecturers' },
    { title: 'Research Team', path: '/faculty/research' },
  ];

  // Resources dropdown items
  const resourcesMenu = [
    { title: 'Gallery', path: '/Component/Gallery', icon: <FiImage /> },
    { title: 'Downloads', path: '/resources/downloads', icon: <FiDownload /> },
    { title: 'Library', path: '/resources/library', icon: <FiBook /> },
    { title: 'Student Portal', path: '/resources/portal', icon: <FiUser /> },
  ];
  // Top navbar links
  const topNavLinks = [
    { title: 'Admissions', path: '/admissions' },
    { title: 'Events', path: '/events' },
    { title: 'News', path: '/news' },
    { title: 'Alumni', path: '/alumni' },
    { title: 'Careers', path: '/careers' },
  ];

  return (
    <>
      {/* Top Navigation Bar */}
      <div className={`top-navbar ${darkMode ? 'dark' : ''}`}>
        <div className="top-nav-container">
          <ul className="top-nav-menu">
            {topNavLinks.map((item) => (
              <li key={item.path} className="top-nav-item">
                <Link to={item.path} className="top-nav-links">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="top-nav-controls">
            <button className="login-btn">
              <FiUser className="icon" />
              <span>Login</span>
            </button>
            <div className="language-selector">
              <select className="language-dropdown">
                <option value="en">EN</option>
                <option value="es">ES</option>
                <option value="fr">FR</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className={`navbar ${darkMode ? 'dark' : ''}`}>
        <div className="navbar-container">
          {/* Logo with animation */}
          <Link to="/" className="navbar-logo">
            <span className="logo-text animate-pulse">INC</span>
            <span className="logo-subtext">Hotel Management</span>
            <div className="logo-decoration"></div>
          </Link>

          {/* Desktop Navigation */}
          <div className="desktop-nav">
            <ul className="nav-menu">
              <li className="nav-item">
                <Link to="/" className="nav-links">
                  Home
                </Link>
              </li>
              
              <li 
                className="nav-item dropdown"
                onMouseEnter={() => toggleDropdown('courses')}
                onMouseLeave={() => toggleDropdown(null)}
              >
                <div className="dropdown-toggle">
                  <span>Courses</span>
                  <FiChevronDown className={`dropdown-icon ${activeDropdown === 'courses' ? 'rotate-180' : ''}`} />
                </div>
                {activeDropdown === 'courses' && (
                  <div className="dropdown-menu">
                    {coursesMenu.map((item) => (
                      <Link 
                        key={item.path} 
                        to={item.path} 
                        className="dropdown-item"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
              
              <li 
                className="nav-item dropdown"
                onMouseEnter={() => toggleDropdown('faculty')}
                onMouseLeave={() => toggleDropdown(null)}
              >
                <div className="dropdown-toggle">
                  <span>Faculty</span>
                  <FiChevronDown className={`dropdown-icon ${activeDropdown === 'faculty' ? 'rotate-180' : ''}`} />
                </div>
                {activeDropdown === 'faculty' && (
                  <div className="dropdown-menu">
                    {facultyMenu.map((item) => (
                      <Link 
                        key={item.path} 
                        to={item.path} 
                        className="dropdown-item"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
              
              <li 
                className="nav-item dropdown"
                onMouseEnter={() => toggleDropdown('resources')}
                onMouseLeave={() => toggleDropdown(null)}
              >
                <div className="dropdown-toggle">
                  <span>Resources</span>
                  <FiChevronDown className={`dropdown-icon ${activeDropdown === 'resources' ? 'rotate-180' : ''}`} />
                </div>
                {activeDropdown === 'resources' && (
                  <div className="dropdown-menu">
                    {resourcesMenu.map((item) => (
                      <Link 
                        key={item.path} 
                        to={item.path} 
                        className="dropdown-item"
                      >
                        <span className="dropdown-icon">{item.icon}</span>
                        {item.title}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
              
              <li className="nav-item">
                <Link to="/about" className="nav-links">
                  About
                </Link>
              </li>
              
              <li className="nav-item">
                <Link to="/contact" className="nav-links">
                  Contact
                </Link>
              </li>
            </ul>

            {/* Right side controls */}
            <div className="nav-controls">
              <div className={`search-container ${searchOpen ? 'open' : ''}`}>
                {searchOpen ? (
                  <>
                    <input
                      type="text"
                      placeholder="Search courses..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="search-input"
                    />
                    <FiX 
                      className="search-icon" 
                      onClick={() => setSearchOpen(false)}
                    />
                  </>
                ) : (
                  <FiSearch 
                    className="search-icon" 
                    onClick={() => setSearchOpen(true)}
                  />
                )}
              </div>
              
              <button 
                className="theme-toggle"
                onClick={toggleDarkMode}
                aria-label="Toggle dark mode"
              >
                {darkMode ? <FiSun /> : <FiMoon />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div 
            className={`menu-icon ${isMenuOpen ? 'open' : ''}`} 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
          <div className="mobile-nav-content">
            <ul className="mobile-nav-menu">
              <li className="mobile-nav-item">
                <Link to="/" className="mobile-nav-links">
                  Home
                </Link>
              </li>
              
              <li className="mobile-nav-item">
                <div 
                  className="mobile-dropdown-toggle"
                  onClick={() => toggleDropdown('mobile-courses')}
                >
                  <span>Courses</span>
                  <FiChevronDown className={`mobile-dropdown-icon ${activeDropdown === 'mobile-courses' ? 'rotate-180' : ''}`} />
                </div>
                {activeDropdown === 'mobile-courses' && (
                  <div className="mobile-dropdown-menu">
                    {coursesMenu.map((item) => (
                      <Link 
                        key={item.path} 
                        to={item.path} 
                        className="mobile-dropdown-item"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
              
              <li className="mobile-nav-item">
                <div 
                  className="mobile-dropdown-toggle"
                  onClick={() => toggleDropdown('mobile-faculty')}
                >
                  <span>Faculty</span>
                  <FiChevronDown className={`mobile-dropdown-icon ${activeDropdown === 'mobile-faculty' ? 'rotate-180' : ''}`} />
                </div>
                {activeDropdown === 'mobile-faculty' && (
                  <div className="mobile-dropdown-menu">
                    {facultyMenu.map((item) => (
                      <Link 
                        key={item.path} 
                        to={item.path} 
                        className="mobile-dropdown-item"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
              
              <li className="mobile-nav-item">
                <div 
                  className="mobile-dropdown-toggle"
                  onClick={() => toggleDropdown('mobile-resources')}
                >
                  <span>Resources</span>
                  <FiChevronDown className={`mobile-dropdown-icon ${activeDropdown === 'mobile-resources' ? 'rotate-180' : ''}`} />
                </div>
                {activeDropdown === 'mobile-resources' && (
                  <div className="mobile-dropdown-menu">
                    {resourcesMenu.map((item) => (
                      <Link 
                        key={item.path} 
                        to={item.path} 
                        className="mobile-dropdown-item"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="dropdown-icon">{item.icon}</span>
                        {item.title}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
              
              <li className="mobile-nav-item">
                <Link to="/about" className="mobile-nav-links">
                  About
                </Link>
              </li>
              
              <li className="mobile-nav-item">
                <Link to="/contact" className="mobile-nav-links">
                  Contact
                </Link>
              </li>
            </ul>

            <div className="mobile-nav-controls">
              <div className="mobile-search">
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mobile-search-input"
                />
                <FiSearch className="mobile-search-icon" />
              </div>
              
              <button 
                className="mobile-theme-toggle"
                onClick={toggleDarkMode}
                aria-label="Toggle dark mode"
              >
                {darkMode ? <FiSun /> : <FiMoon />}
              </button>
              
              <button className="mobile-login-btn">
                <FiUser className="icon" />
                <span>Login</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
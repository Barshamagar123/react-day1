import { useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';
import '../css/Gallery.css';

// ✅ Import images directly from assets
import industrailvisit from '../assets/insdustrailvisit.jpeg';
import foodandb from '../assets/foodb.jpeg';
import hospitality from '../assets/hospitality.jpeg';
import cristmas from '../assets/cristmas.jpeg';
import events from '../assets/events.jpeg';
// import campus from '../assets/campus.jpg';


const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  // Sample gallery images - replace with your actual images
  const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  // ✅ Use imported images in the array
  const galleryImages = [
    {
      id: 1,
      src: industrailvisit, // Direct reference to imported image
      alt: 'students in industrial visit',
      category: 'industrial visit',
    },
    {
      id: 2,
      src: foodandb,
      alt: 'food and beverage service practical',
      category: 'food and beverage',
    },
   {
      id: 3,
      src: hospitality,
      alt: 'hospitality learning',
      category: 'hospitality',
    },
    {
      id: 4,
      src: cristmas,
      alt: 'christmas joy',
      category: 'christmas',
    },
    {
      id: 5,
      src: events,
      alt: 'events picture',
      category: 'events',
    },
    {
      id: 6,
      src: campus,
           alt: 'College campus',
      category: 'Campus',
    },
  ];


  // Filter options
  const filters = ['All', 'Culinary Arts', 'Hotel Management', 'Events', 'Campus'];
  const [activeFilter, setActiveFilter] = useState('All');

  // Filter images based on active filter
  const filteredImages = activeFilter === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeFilter);

  // Navigation functions for image viewer
  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? filteredImages.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === filteredImages.length - 1 ? 0 : prev + 1));
  };

  const openImageViewer = (index) => {
    setCurrentIndex(index);
    setIsViewerOpen(true);
  };

  return (
    <div className="gallery-container">
      <h1 className="gallery-title">College Gallery</h1>
      <p className="gallery-subtitle">Explore moments from our campus life and activities</p>
      
      {/* Filter buttons */}
      <div className="gallery-filters">
        {filters.map(filter => (
          <button
            key={filter}
            className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      
      {/* Image grid */}
      <div className="gallery-grid">
        {filteredImages.map((image, index) => (
          <div 
            key={image.id} 
            className="gallery-item"
            onClick={() => openImageViewer(index)}
          >
            <img 
              src={image.src} 
              alt={image.alt} 
              className="gallery-image"
              loading="lazy"
            />
            <div className="image-overlay">
              <span className="image-category">{image.category}</span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Image viewer modal */}
      {isViewerOpen && (
        <div className="image-viewer">
          <div className="viewer-content">
            <button 
              className="close-btn"
              onClick={() => setIsViewerOpen(false)}
            >
              <FiX />
            </button>
            
            <img 
              src={filteredImages[currentIndex].src} 
              alt={filteredImages[currentIndex].alt}
              className="viewer-image"
            />
            
            <div className="image-info">
              <h3>{filteredImages[currentIndex].category}</h3>
              <p>{filteredImages[currentIndex].alt}</p>
            </div>
            
            <button 
              className="nav-btn prev-btn"
              onClick={prevImage}
            >
              <FiChevronLeft />
            </button>
            
            <button 
              className="nav-btn next-btn"
              onClick={nextImage}
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
};

export default Gallery;
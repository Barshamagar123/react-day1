import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/Home.css';

// Import images (place these in your public/images folder)
// Or use image URLs from a CDN
const images = {
  hero: '/images/hotel-management-hero.jpg',
  course1: '/images/course-diploma.jpg',
  course2: '/images/course-bachelor.jpg',
  student1: '/images/student1.jpg',
  student2: '/images/student2.jpg',
  campus: '/images/campus.jpg'
};

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [stats, setStats] = useState([
    { number: 0, title: 'Years Experience', target: 15 },
    { number: 0, title: 'Graduates', target: 1200 },
    { number: 0, title: 'Industry Partners', target: 45 },
    { number: 0, title: 'Certified Instructors', target: 28 }
  ]);

  // Testimonial data
  const testimonials = [
    {
      id: 1,
      name: 'Anita Shrestha',
      role: 'BHM Graduate, 2022',
      text: 'The practical training at INC gave me the confidence to excel at my job at Hyatt Regency.',
      image: images.student1
    },
    {
      id: 2,
      name: 'Rohan Karki',
      role: 'Diploma Student',
      text: 'The industry exposure and guest lectures from hotel managers are invaluable.',
      image: images.student2
    }
  ];

  // Featured courses
  const featuredCourses = [
    {
      id: 1,
      title: 'Diploma in Hotel Management',
      duration: '2 Years',
      highlight: 'Practical-focused curriculum'
    },
    {
      id: 2,
      title: 'BHM Program',
      duration: '4 Years',
      highlight: 'With internship opportunities'
    }
  ];

  // Animate statistics
  useEffect(() => {
    const duration = 2000; // Animation duration in ms
    const startTime = Date.now();

    const animateStats = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);

      setStats(prevStats =>
        prevStats.map(stat => ({
          ...stat,
          number: Math.floor(progress * stat.target)
        }))
      );

      if (progress < 1) {
        requestAnimationFrame(animateStats);
      }
    };

    animateStats();
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-image-container">
          <img 
            src={images.hero} 
            alt="Hotel Management Students" 
            className="hero-image"
          />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <h1>Shape Your Future in Hospitality</h1>
          <p className="hero-subtitle">
            Premier hotel management education at Itahari Namuna College
          </p>
          <div className="hero-buttons">
            <Link to="/courses" className="btn btn-primary">
              Explore Courses
            </Link>
            <Link to="/contact" className="btn btn-outline">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-number">
                <span className="counter">{stat.number}</span>+
              </div>
              <div className="stat-title">{stat.title}</div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-content">
            <h2>Why Choose INC Hotel Management?</h2>
            <p>
              Our program combines academic excellence with hands-on training in
              state-of-the-art facilities. With industry-experienced faculty and
              strong corporate partnerships, we prepare students for successful
              careers in the global hospitality industry.
            </p>
            <ul className="features-list">
              <li>Fully equipped training kitchen and restaurant</li>
              <li>Housekeeping and front office labs</li>
              <li>Industry visits and guest lectures</li>
              <li>100% placement assistance</li>
            </ul>
          </div>
          <div className="about-image">
            <img src={images.campus} alt="INC Campus" />
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="courses-section">
        <h2 className="section-title">Featured Courses</h2>
        <div className="courses-grid">
          {featuredCourses.map(course => (
            <div key={course.id} className="course-card">
              <h3>{course.title}</h3>
              <p className="duration">{course.duration}</p>
              <p className="highlight">{course.highlight}</p>
              <Link to="/courses" className="learn-more">
                Learn More →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <h2 className="section-title">What Our Students Say</h2>
        <div className="testimonials-container">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className={`testimonial ${index === currentSlide ? 'active' : ''}`}
            >
              <div className="testimonial-content">
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="author-image"
                  />
                  <div className="author-info">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="testimonial-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2>Ready to Start Your Hospitality Journey?</h2>
          <p>
            Applications for 2024 intake are now open. Limited seats available.
          </p>
          <div className="cta-buttons">
            <Link to="/contact" className="btn btn-primary">
              Apply Now
            </Link>
            <Link to="/courses" className="btn btn-secondary">
              Explore Programs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
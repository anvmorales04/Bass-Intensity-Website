import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import bassintWhiteIcon from './assets/icons/bassint-icon-white.png';
import backgroundVideo from './assets/videos/Video-Background.mp4'; 
import phoneIcon from './assets/icons/phone-icon.png'; 

import emailIcon from './assets/icons/email-icon.png';
import fbIcon from './assets/icons/fb-icon.png';


import picDiv from './assets/gallery/picDivider.jpg';
import img1 from './assets/gallery/pic1.jpg';
import img2 from './assets/gallery/pic2.jpg';
import img3 from './assets/gallery/pic3.jpg';
import img4 from './assets/gallery/pic4.jpg';
import img5 from './assets/gallery/pic5.jpg';
import img6 from './assets/gallery/pic6.jpg';
import img7 from './assets/gallery/pic7.jpg';
import img8 from './assets/gallery/pic8.jpg';
import img9 from './assets/gallery/pic9.jpg';
import img10 from './assets/gallery/pic10.jpg';
import img11 from './assets/gallery/pic11.jpg';
import img12 from './assets/gallery/pic12.jpg';
import img13 from './assets/gallery/pic13.jpg';
import img14 from './assets/gallery/pic14.jpg';
import img15 from './assets/gallery/pic15.jpg';
import img16 from './assets/gallery/pic16.jpg';
import img17 from './assets/gallery/pic17.jpg';
import img18 from './assets/gallery/pic18.jpg';
import img19 from './assets/gallery/pic19.jpg';
import img20 from './assets/gallery/pic20.jpg';
import img21 from './assets/gallery/pic21.jpg';
import img22 from './assets/gallery/pic22.jpg';
import img23 from './assets/gallery/pic23.jpg';
import img24 from './assets/gallery/pic24.jpg';
import img25 from './assets/gallery/pic25.jpg';

const initialGalleryImages = [img7, img8, img9, img10, img11, img12, img13, img14, img15];
const extendedGalleryImages = [img16, img17, img18, img19, img20, img21, img22, img23, img24, img25];

const getImageOrientation = (src) => {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image.naturalWidth > image.naturalHeight ? 'landscape' : 'portrait');
    image.onerror = () => resolve('portrait');
    image.src = src;
  });
};

import './components/App.css';

const ScrollReveal = ({ children, delay = 0 }) => { // 1. Add the delay prop (defaults to 0)
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.15 } 
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      className={`reveal-wrapper ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }} // 2. Applies the delay to the CSS animation
    >
      {children}
    </div>
  );
};

const sectionOneImages = [img3, img1, img4];
const sectionTwoImages = [img5, img2, img6];

function GalleryCarousel({ images, className = '' }) {
  const [activeIndex, setActiveIndex] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setActiveIndex(1);
    setSelectedImage(null);
  }, [images]);

  useEffect(() => {
    document.body.style.overflow = selectedImage ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedImage]);

  const previousIndex = (activeIndex - 1 + images.length) % images.length;
  const nextIndex = (activeIndex + 1) % images.length;

  const visibleCards = [
    { key: previousIndex, variant: 'left', src: images[previousIndex], alt: 'Previous gallery image' },
    { key: activeIndex, variant: 'center', src: images[activeIndex], alt: 'Selected gallery image' },
    { key: nextIndex, variant: 'right', src: images[nextIndex], alt: 'Next gallery image' },
  ];

  const handlePrevious = (event) => {
    event.stopPropagation();
    setActiveIndex((current) => (current - 1 + images.length) % images.length);
  };

  const handleNext = (event) => {
    event.stopPropagation();
    setActiveIndex((current) => (current + 1) % images.length);
  };

  const handleCardClick = (currentCard) => {
    setSelectedImage(currentCard.src);
  };

  const closeLightbox = () => setSelectedImage(null);

  return (
    <>
      <div className={`gallery-carousel ${className}`} aria-label="Gallery carousel">
        <button
          type="button"
          className="gallery-nav gallery-nav-left"
          onClick={handlePrevious}
          aria-label="Previous image"
        >
          &#8249;
        </button>

        <div className="gallery-viewport">
          {visibleCards.map((card) => (
            <button
              type="button"
              key={`${card.variant}-${card.key}`}
              className={`gallery-card gallery-card--${card.variant}`}
              onClick={() => handleCardClick(card)}
              aria-label={`View ${card.alt}`}
            >
              <img src={card.src} alt={card.alt} className="gallery-image" />
            </button>
          ))}
        </div>

        <button
          type="button"
          className="gallery-nav gallery-nav-right"
          onClick={handleNext}
          aria-label="Next image"
        >
          &#8250;
        </button>
      </div>

      {selectedImage && createPortal(
        <div className="lightbox-backdrop" onClick={closeLightbox} role="dialog" aria-modal="true">
          <div className="lightbox-panel" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="lightbox-close" onClick={closeLightbox} aria-label="Close image view">
              &times;
            </button>
            <div className="lightbox-frame">
              <img src={selectedImage} alt="Expanded gallery view" className="lightbox-image" />
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

const ServicesSection = () => {
  const [scrollOffset, setScrollOffset] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollOffset(window.scrollY);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="services" 
      className="page-section services-interactive-section"
      ref={containerRef}
    >
      {/* --- Ambient Background Squares (Now floating behind everything) --- */}
      <div className="ambient-square ambient-square-1" style={{ transform: `translate(${scrollOffset * 0.04}px, ${scrollOffset * 0.03}px)` }}></div>
      <div className="ambient-square ambient-square-2" style={{ transform: `translate(${scrollOffset * -0.06}px, ${scrollOffset * -0.04}px)` }}></div>
      <div className="ambient-square ambient-square-3" style={{ transform: `translate(${scrollOffset * 0.02}px, ${scrollOffset * 0.04}px)` }}></div>
      <div className="ambient-square ambient-square-4" style={{ transform: `translate(${scrollOffset * -0.03}px, ${scrollOffset * -0.02}px)` }}></div>
      <div className="ambient-square ambient-square-5" style={{ transform: `translate(${scrollOffset * 0.05}px, ${scrollOffset * -0.05}px)` }}></div>

      {/* --- All Services Content --- */}
      <div className="section-2">
        <ScrollReveal>
          <h2 className="section-title">Services</h2>
          <p className="about-text services-intro">Dependable audio for any occasion. Rates are tailored to your specific event; 
            message us on Facebook for a personalized quote and availability.</p>
        </ScrollReveal>

        <br/>

        <ScrollReveal className="services-container">
          <div className="services-square">
            <span className="quote-pretitle">EVENT SETUP</span>
            <br/>
            <span className="quote-title">Custom Quote</span>
            <span className="quote-pretitle">/per event</span>
            <br/><br/>
            <p>Whether it is an intimate birthday or a full live band performance, we provide a complete, scalable audio and visual experience tailored to your venue and audience.</p>
            
            <ul className="service-list">
              <li><span className="service-bullet" aria-hidden="true">&gt;</span><span>High-quality speakers with clear, powerful audio</span></li>
              <li><span className="service-bullet" aria-hidden="true">&gt;</span><span>Dynamic event lighting included</span></li>
              <li><span className="service-bullet" aria-hidden="true">&gt;</span><span>Branded audio mixers &amp; complete sound control</span></li>
              <li><span className="service-bullet" aria-hidden="true">&gt;</span><span>Wireless and wired microphones</span></li>
              <li><span className="service-bullet" aria-hidden="true">&gt;</span><span>Delivery, installation, sound check, and dismantling</span></li>
              <li><span className="service-bullet" aria-hidden="true">&gt;</span><span>Dedicated on-site technical assistance</span></li>
              <li><span className="service-bullet" aria-hidden="true">&gt;</span><span>Available for full setups or sound reinforcement for existing gear</span></li>
            </ul>

            <a href="tel:+639179610770" className="request-quote-button">
              Request Quote <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </ScrollReveal>

        <section id="contact" className="contact-section">
          <ScrollReveal>
            <div className="contact-columns">
              <div className="contact-copy">
                <h2 className="contact-title">Let&apos;s make it sound unforgettable.</h2>
                <p className="contact-subtitle">Tell us about your event and we&apos;ll help shape the right setup for your audience.</p>
              </div>

              <div className="contact-actions">
                <a className="contact-action" href="https://www.facebook.com/aris.l.morales" target="_blank" rel="noopener noreferrer">
                  <img src={fbIcon} alt="" />
                  <span className="contact-action-copy">
                    <strong>Message us on Facebook</strong>
                    <small>facebook.com/aris.l.morales</small>
                  </span>
                  <span className="contact-action-arrow" aria-hidden="true">&rarr;</span>
                </a>
                <a className="contact-action" href="mailto:arislm4@yahoo.com.ph">
                  <img src={phoneIcon} alt="" />
                  <span className="contact-action-copy">
                    <strong>Phone Number</strong>
                    <small>+63 917-961-0770</small>
                  </span>
                  <span className="contact-action-arrow" aria-hidden="true">&rarr;</span>
                </a>
                <a className="contact-action" href="tel:+639179610770">
                  <img src={emailIcon} alt="" />
                  <span className="contact-action-copy">
                    <strong>Email</strong>
                    <small>arislm4@yahoo.com.ph</small>
                  </span>
                  <span className="contact-action-arrow" aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <footer className="services-footer">
          <img src={bassintWhiteIcon} alt="Bass Intensity ProAudio" className="services-footer-logo" />
          <div className="services-footer-copy">
            <p>&copy; Bass Intensity ProAudio &middot; Lalayat, San Jose, Batangas</p>
            <p>Rates are determined by receiving a quota.</p>
            <p>Website created by <strong>Aryll Nevin Morales</strong></p>
          </div>
        </footer>
      </div>
    </section>
  );
};

function App() {
  const [isNavScrolled, setIsNavScrolled] = useState(false);
  const [isTextRevealed, setIsTextRevealed] = useState(false);
  const [isSubtitleRevealed, setIsSubtitleRevealed] = useState(false);
  const [isButtonsRevealed, setIsButtonsRevealed] = useState(false); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [slantScrollOffset, setSlantScrollOffset] = useState(0);
  
  const [showExpandedGallery, setShowExpandedGallery] = useState(false);
  const [fullGalleryLightbox, setFullGalleryLightbox] = useState(null);
  const [galleryOrientations, setGalleryOrientations] = useState({});

  useEffect(() => {
    const allGalleryImages = [...initialGalleryImages, ...extendedGalleryImages];

    const loadOrientations = async () => {
      const nextOrientations = {};

      for (const imageSrc of allGalleryImages) {
        nextOrientations[imageSrc] = await getImageOrientation(imageSrc);
      }

      setGalleryOrientations(nextOrientations);
    };

    loadOrientations();
  }, []);

  useEffect(() => {
    document.body.style.overflow = fullGalleryLightbox ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [fullGalleryLightbox]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsNavScrolled(true);  
      } else {
        setIsNavScrolled(false); 
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const titleTimer = setTimeout(() => {
      setIsTextRevealed(true);
    }, 100);

    const subtitleTimer = setTimeout(() => {
      setIsSubtitleRevealed(true);
    }, 700);

    const buttonsTimer = setTimeout(() => {
      setIsButtonsRevealed(true);
    }, 1200);

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(subtitleTimer);
      clearTimeout(buttonsTimer);
    };
  }, []); 

  const scrollToTop = (e) => {
    e.preventDefault(); 
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const targetElement = document.getElementById(sectionId);
    
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    setIsMobileMenuOpen(false); 
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => setSlantScrollOffset(window.scrollY);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  

  return (
    <>
      <nav className={`top-bar ${isNavScrolled ? 'scrolled' : ''}`}>
        <div className="top-bar-logo" onClick={scrollToTop} style={{ cursor: 'pointer' }}>
          <img src={bassintWhiteIcon} alt="Bass Intensity Logo" />
        </div>

        <ul className={`top-bar-links ${isMobileMenuOpen ? 'open' : ''}`}>
          <li><a href="#home" onClick={(e) => scrollToSection(e, 'home')}>Home</a></li>
          <li><a href="#about" onClick={(e) => scrollToSection(e, 'about')}>About</a></li>
          <li><a href="#gallery" onClick={(e) => scrollToSection(e, 'gallery')}>Gallery</a></li>
          <li><a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>Services</a></li>
          <li><a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>Contact</a></li>
        </ul>

        <div className="top-bar-action">
          <button className="book-btn">Book us!</button>
          
          <button 
            className="mobile-menu-btn" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              {isMobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>
      
      <main>
        <section id="home" style={{ position: 'relative', height: '100vh', width: '100%', overflow: 'hidden' }}>
          
          <video
            src={backgroundVideo} 
            autoPlay    
            muted       
            loop        
            playsInline 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%', 
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 50%', 
              zIndex: -1 
            }}
          />

          <div 
            style={{
              position: 'absolute', 
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(to top, var(--color-background) 0%, transparent 100%)',
              zIndex: 0, 
              pointerEvents: 'none' 
            }}
          />
          
          <div className="content-layer" style={{ position: 'relative', zIndex: 1 }}>
            <section className="hero-section">
              <div className="hero-text-box">
                <h1 className={`hero-title ${isTextRevealed ? 'visible' : ''}`}>
                  SOUNDS BEYOND <br />
                  YOUR <span className="highlight-text">EXPECTATIONS.</span>
                </h1>
                
                <p className={`hero-subtitle ${isSubtitleRevealed ? 'visible' : ''}`}>
                  Make every announcement, speech, and performance sound clear with our professional sound system rental service.
                </p>

                <div className={`hero-cta-group ${isButtonsRevealed ? 'visible' : ''}`}>
                  
                  <a 
                    href="https://www.facebook.com/aris.l.morales" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hero-btn hero-btn-outline"
                  >
                    Contact us in Facebook <span>&rarr;</span>
                  </a>

                  <a href="tel:+639179610770" className="hero-btn hero-btn-solid">
                    +63 917-961-0770 
                    <img src={phoneIcon} alt="Phone Icon" className="btn-icon" />
                  </a>

                </div>
                
              </div>
            </section>
          </div>
        </section>

        <section id="about" className="page-section">

          <div className="section-1">

            <ScrollReveal>
              <h2 className="section-title">About us</h2>
              <div className="about-content">
                <div className="about-text">
                  <p> 
                    A trusted partner for professional sound and lighting system rentals. 
                    Whether you are hosting an intimate family gathering, a corporate event, 
                    or a large-scale outdoor concert, we are dedicated to making every announcement, 
                    speech, and performance crystal clear. We provide top-tier, reliable audio and 
                    visual equipment tailored to meet the unique needs of your occasion, ensuring a 
                    memorable and immersive experience for you and your guests.
                  </p>
                </div>

                <div className="about-image-container">
                  <GalleryCarousel images={sectionOneImages} />
                </div>
              </div>
            </ScrollReveal>
          </div>


          <div className="section-2">

            <ScrollReveal>
              <div className="about-content">
                
                <div className="about-image-container">
                  <GalleryCarousel images={sectionTwoImages} className="gallery-carousel--section-two" />
                </div>

                <div className="about-text">
                  <p> 
                    Our comprehensive services go beyond simply providing equipment; 
                    we offer a complete, hassle-free production experience from start to finish. 
                    We supply clean, well-maintained gear, including high-quality speakers, 
                    branded audio mixers, wireless microphones, and dynamic lighting setups 
                    designed to elevate your event's atmosphere.
                  </p>
                </div>

              </div>
            </ScrollReveal>

          </div>

          <div>
            <img src={picDiv} alt="Bass Intensity Sound Setup" className="image-divider" />
          </div>

          <div
            className="section-1 hollow-slant-container"
          >
            <div className="slant-ambient-rectangles" aria-hidden="true">
              <span className="slant-ambient-rectangle slant-ambient-rectangle-1" style={{ transform: `translate(${slantScrollOffset * 0.024}px, ${slantScrollOffset * 0.016}px) rotate(-12deg)` }}></span>
              <span className="slant-ambient-rectangle slant-ambient-rectangle-2" style={{ transform: `translate(${slantScrollOffset * -0.036}px, ${slantScrollOffset * -0.024}px) rotate(-12deg)` }}></span>
              <span className="slant-ambient-rectangle slant-ambient-rectangle-3" style={{ transform: `translate(${slantScrollOffset * 0.048}px, ${slantScrollOffset * 0.032}px) rotate(-12deg)` }}></span>
              <span className="slant-ambient-rectangle slant-ambient-rectangle-4" style={{ transform: `translate(${slantScrollOffset * -0.06}px, ${slantScrollOffset * -0.04}px) rotate(-12deg)` }}></span>
              <span className="slant-ambient-rectangle slant-ambient-rectangle-5" style={{ transform: `translate(${slantScrollOffset * 0.072}px, ${slantScrollOffset * 0.048}px) rotate(-12deg)` }}></span>
            </div>

            <ScrollReveal>
              <h2 className="hollow-text slant-1">Elevate every moment with </h2>
            </ScrollReveal>
  
            <ScrollReveal delay={300}>
              <h2 className="hollow-text slant-2">crystal-clear sound </h2>
            </ScrollReveal>

            <ScrollReveal delay={600}>
              <h2 className="hollow-text slant-3">and dynamic lighting.</h2>
            </ScrollReveal>
          </div>

          <div className="section-2">
            <ScrollReveal>
              <div className="worked-with-block">
                <h2 className="worked-with-label">We also worked with</h2>

                <h2 className="marquee marquee-slow worked-with-marquee" aria-label="Worked with partners list">
                  <span className="marquee-track">
                    <span>December Avenue</span>
                    <span>●</span>
                    <span>Barbie Almalbis</span>
                    <span>●</span>
                    <span>Aegis</span>
                    <span>●</span>
                    <span>Khel Pangilinan &amp; The Yudawans</span>
                    <span>●</span>
                    <span>Side A</span>
                    <span>●</span>
                    <span>South Border</span>
                    <span>●</span>
                    <span>Silent Sanctuary</span>
                    <span>●</span>
                    <span>Imago</span>
                    <span>●</span>
                    <span>SoapDish</span>
                    <span>●</span>
                    <span>Marco Rudio &amp; Band</span>
                    <span>●</span>
                    <span>Typecast</span>
                    <span>●</span>
                    <span>December Avenue</span>
                    <span>●</span>
                    <span>Barbie Almalbis</span>
                    <span>●</span>
                    <span>Aegis</span>
                    <span>●</span>
                    <span>Khel Pangilinan &amp; The Yudawans</span>
                    <span>●</span>
                    <span>Side A</span>
                    <span>●</span>
                    <span>South Border</span>
                    <span>●</span>
                    <span>Silent Sanctuary</span>
                    <span>●</span>
                    <span>Imago</span>
                    <span>●</span>
                    <span>SoapDish</span>
                    <span>●</span>
                    <span>Marco Rudio &amp; Band</span>
                    <span>●</span>
                    <span>Typecast</span>
                  </span>
                </h2>

                <h2 className="marquee marquee-fast worked-with-marquee" aria-label="Worked with partners list second row">
                  <span className="marquee-track">
                    <span>Sunkissed Lola</span>
                    <span>●</span>
                    <span>Disband</span>
                    <span>●</span>
                    <span>6Cyclemind</span>
                    <span>●</span>
                    <span>Jose &amp; Wally &amp; Band</span>
                    <span>●</span>
                    <span>Mitoy Unting</span>
                    <span>●</span>
                    <span>Siakol &amp; Repakol</span>
                    <span>●</span>
                    <span>Whos Your Daddy</span>
                    <span>●</span>
                    <span>Helera</span>
                    <span>●</span>
                    <span>Slapshock</span>
                    <span>●</span>
                    <span>Mayonnaise</span>
                    <span>●</span>
                    <span>Ice Bucket Band</span>
                    <span>●</span>
                    <span>Shamrock</span>
                    <span>●</span>
                    <span>Sunkissed Lola</span>
                    <span>●</span>
                    <span>Disband</span>
                    <span>●</span>
                    <span>6Cyclemind</span>
                    <span>●</span>
                    <span>Jose &amp; Wally &amp; Band</span>
                    <span>●</span>
                    <span>Mitoy Unting</span>
                    <span>●</span>
                    <span>Siakol &amp; Repakol</span>
                    <span>●</span>
                    <span>Whos Your Daddy</span>
                    <span>●</span>
                    <span>Helera</span>
                    <span>●</span>
                    <span>Slapshock</span>
                    <span>●</span>
                    <span>Mayonnaise</span>
                    <span>●</span>
                    <span>Ice Bucket Band</span>
                    <span>●</span>
                    <span>Shamrock</span>
                  </span>
                </h2>

                <h2 className="worked-with-label worked-with-end">&amp; Many More.</h2>
              </div>
            </ScrollReveal>
          </div>

          



        </section>


      <section id="gallery" className="gallery-section">
          <ScrollReveal>
            <h2 className="section-title">Gallery</h2>
          </ScrollReveal>

          {/* --- THE DYNAMIC GALLERY --- */}
          <div className="gallery-container">
            {/* Render Initial Images (7 to 15) */}
            {initialGalleryImages.map((imgSrc, index) => (
                <img 
                  key={`init-${index}`}
                  src={imgSrc} 
                  alt={`Gallery ${index + 7}`}
                  className="gallery-item reveal-wrapper visible"
                  onClick={() => setFullGalleryLightbox(imgSrc)}
                  aria-label={`Open gallery image ${index + 7}`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      setFullGalleryLightbox(imgSrc);
                    }
                  }}
                />
            ))}

            {showExpandedGallery && extendedGalleryImages.map((imgSrc, index) => (
                <img 
                  key={`ext-${index}`}
                  src={imgSrc} 
                  alt={`Gallery ${index + 16}`}
                  className="gallery-item"
                  style={{ animation: 'fadeIn 0.5s ease-out forwards' }}
                  onClick={() => setFullGalleryLightbox(imgSrc)}
                  aria-label={`Open gallery image ${index + 16}`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      setFullGalleryLightbox(imgSrc);
                    }
                  }}
                />
            ))}
          </div>

          <ScrollReveal>
            <button
              className="show-more-btn"
              onClick={() => setShowExpandedGallery((current) => !current)}
            >
              {showExpandedGallery ? 'Show less -' : 'Show more +'}
            </button>
          </ScrollReveal>
        </section>

        {/* --- NEW LIGHTBOX MODAL --- */}
        {fullGalleryLightbox && createPortal(
          <div className="lightbox-overlay" onClick={() => setFullGalleryLightbox(null)} role="dialog" aria-modal="true">
            <div className="lightbox-content-wrapper" onClick={(event) => event.stopPropagation()}>
              <img src={fullGalleryLightbox} alt="Expanded gallery view" className="lightbox-media" />
            </div>
          </div>,
          document.body
        )}

        <ServicesSection />

        <section id="contact" className="contact">
          <div className="section-1">

          </div>
        </section>


      </main>
    </>
  )
}

export default App;
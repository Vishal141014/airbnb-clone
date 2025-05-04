'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiMapPin } from 'react-icons/fi';
import { gsap } from 'gsap';

// Mock data for inspiration destinations
const destinations = [
  {
    id: 'dest1',
    name: 'Santorini',
    country: 'Greece',
    description: 'Discover white-washed buildings with blue domes overlooking the Aegean Sea.',
    image: '/images/img1.jpg',
    rating: 4.97,
    tags: ['Island', 'Beach', 'Views'],
  },
  {
    id: 'dest2',
    name: 'Kyoto',
    country: 'Japan',
    description: 'Experience traditional Japanese culture among historic temples and gardens.',
    image: '/images/img2.jpg',
    rating: 4.92,
    tags: ['Historical', 'Cultural', 'Temples'],
  },
  {
    id: 'dest3',
    name: 'Marrakech',
    country: 'Morocco',
    description: 'Explore colorful souks, palaces, and gardens in this vibrant North African city.',
    image: '/images/img3.jpg',
    rating: 4.89,
    tags: ['Markets', 'Culture', 'Architecture'],
  },
  {
    id: 'dest4',
    name: 'Bora Bora',
    country: 'French Polynesia',
    description: 'Relax in overwater bungalows surrounded by crystal clear turquoise waters.',
    image: '/images/img4.jpg',
    rating: 4.98,
    tags: ['Luxury', 'Beach', 'Romance'],
  },
  {
    id: 'dest5',
    name: 'Cappadocia',
    country: 'Turkey',
    description: 'Witness the magical landscape of fairy chimneys and hot air balloons at sunrise.',
    image: '/images/img5.jpg',
    rating: 4.96,
    tags: ['Unique', 'Balloons', 'Landscape'],
  },
  {
    id: 'dest6',
    name: 'Banff',
    country: 'Canada',
    description: 'Discover stunning mountain landscapes, turquoise lakes, and abundant wildlife.',
    image: '/images/img6.jpg',
    rating: 4.95,
    tags: ['Mountains', 'Nature', 'Hiking'],
  },
];

const InspirationCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Initialize slide refs
  useEffect(() => {
    slideRefs.current = slideRefs.current.slice(0, destinations.length);
  }, []);

  // GSAP animations
  useEffect(() => {
    if (slideRefs.current[currentSlide]) {
      // Animate the background particles
      const particles = slideRefs.current[currentSlide]?.querySelectorAll('.particle');
      
      if (particles?.length) {
        gsap.fromTo(
          particles,
          {
            opacity: 0,
            scale: 0,
            x: (i) => `random(-100, 100)`,
            y: (i) => `random(-100, 100)`,
          },
          {
            opacity: 0.6,
            scale: 1,
            x: 0,
            y: 0,
            stagger: 0.05,
            duration: 1,
            ease: 'power3.out',
          }
        );
      }
      
      // Animate the content
      const content = slideRefs.current[currentSlide]?.querySelector('.content');
      if (content) {
        gsap.fromTo(
          content.children,
          {
            y: direction >= 0 ? 30 : -30,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: 'power2.out',
          }
        );
      }
    }
  }, [currentSlide, direction]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev === 0 ? destinations.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev === destinations.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative overflow-hidden bg-airbnb-dark-gray text-white py-8 md:py-12">
      <h2 className="text-3xl font-bold text-center mb-6">Find inspiration for your next trip</h2>
      <div 
        ref={carouselRef}
        className="relative max-w-6xl mx-auto h-[500px] md:h-[600px] overflow-hidden rounded-2xl"
      >
        {/* Background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={`particle-${i}`}
              className="particle absolute rounded-full bg-white opacity-0"
              style={{
                width: `${Math.random() * 8 + 2}px`,
                height: `${Math.random() * 8 + 2}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Slides */}
        {destinations.map((destination, index) => (
          <motion.div
            key={destination.id}
            ref={el => slideRefs.current[index] = el}
            className={`absolute inset-0 ${
              index === currentSlide ? 'z-10' : 'z-0'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentSlide ? 1 : 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            {/* Background image */}
            <div className="absolute inset-0">
              <Image
                src={destination.image}
                alt={destination.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 90vw"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70" />
            </div>

            {/* Content */}
            <div className="content absolute inset-0 flex flex-col justify-end p-8 md:p-12">
              <h3 className="text-4xl md:text-5xl font-bold mb-2">{destination.name}</h3>
              <div className="flex items-center mb-4">
                <FiMapPin className="mr-1" />
                <span className="text-lg">{destination.country}</span>
              </div>
              <p className="text-lg md:text-xl max-w-xl mb-4">{destination.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {destination.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <button className="bg-airbnb-pink text-white py-3 px-6 rounded-lg font-medium hover:bg-opacity-90 transition w-full sm:w-auto">
                Explore {destination.name}
              </button>
            </div>
          </motion.div>
        ))}

        {/* Navigation buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 backdrop-blur-sm text-white rounded-full p-2 hover:bg-white/50 transition-colors"
          aria-label="Previous destination"
        >
          <FiChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 backdrop-blur-sm text-white rounded-full p-2 hover:bg-white/50 transition-colors"
          aria-label="Next destination"
        >
          <FiChevronRight className="w-6 h-6" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
          {destinations.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentSlide ? 1 : -1);
                setCurrentSlide(index);
              }}
              className={`w-2.5 h-2.5 rounded-full ${
                index === currentSlide
                  ? 'bg-white'
                  : 'bg-white/40 hover:bg-white/60'
              } transition-colors`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InspirationCarousel; 
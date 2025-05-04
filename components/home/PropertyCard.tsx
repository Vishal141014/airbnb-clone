'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FiHeart, FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  images: string[];
  price: number;
  currency?: string;
  rating?: number;
  date?: string;
  favorite?: boolean;
  superHost?: boolean;
  onFavoriteToggle?: (id: string) => void;
}

const PropertyCard = ({
  id,
  title,
  location,
  images,
  price,
  currency = 'USD',
  rating,
  date,
  favorite = false,
  superHost = false,
  onFavoriteToggle,
}: PropertyCardProps) => {
  const [isFavorite, setIsFavorite] = useState(favorite);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showControls, setShowControls] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    if (onFavoriteToggle) {
      onFavoriteToggle(id);
    }
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="group cursor-pointer"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Image Carousel */}
      <div className="relative aspect-square rounded-xl overflow-hidden mb-2">
        <div className="relative w-full h-full">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image 
                src={images[currentImageIndex]} 
                alt={title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                className="object-cover"
                priority={currentImageIndex === 0}
                quality={80}
              />
            </motion.div>
          </AnimatePresence>

          {/* Image Navigation - Only shown on hover or touch */}
          {showControls && images.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md opacity-80 hover:opacity-100 transition-opacity z-10"
                aria-label="Previous image"
              >
                <FiChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md opacity-80 hover:opacity-100 transition-opacity z-10"
                aria-label="Next image"
              >
                <FiChevronRight className="h-4 w-4" />
              </button>
            </>
          )}

          {/* Image Indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1 z-10">
              {images.map((_, index) => (
                <span
                  key={index}
                  className={`h-1.5 w-1.5 rounded-full ${
                    index === currentImageIndex
                      ? 'bg-white'
                      : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-2 right-2 z-10"
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <FiHeart
              className={`h-6 w-6 transition-colors ${
                isFavorite
                  ? 'text-airbnb-pink fill-airbnb-pink'
                  : 'text-white stroke-2'
              }`}
            />
          </button>

          {/* SuperHost Badge */}
          {superHost && (
            <div className="absolute top-2 left-2 bg-white text-xs font-medium px-2 py-1 rounded-full z-10">
              Superhost
            </div>
          )}
        </div>
      </div>

      {/* Property Details */}
      <div className="space-y-1">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-airbnb-dark-gray line-clamp-1">
            {location}
          </h3>
          {rating !== undefined && (
            <div className="flex items-center">
              <FiStar className="h-4 w-4 fill-current" />
              <span className="ml-1 text-sm">{rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        
        <p className="text-airbnb-light-gray text-sm line-clamp-1">{title}</p>
        
        {date && (
          <p className="text-airbnb-light-gray text-sm">{date}</p>
        )}
        
        <p className="text-airbnb-dark-gray">
          <span className="font-semibold">
            {currency === 'USD' ? '$' : currency} {price}
          </span>{' '}
          <span className="text-airbnb-light-gray">night</span>
        </p>
      </div>
    </motion.div>
  );
};

export default PropertyCard; 
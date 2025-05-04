'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight, FiSliders } from 'react-icons/fi';
import { 
  FaSwimmingPool, 
  FaUmbrellaBeach, 
  FaMountain, 
  FaCity, 
  FaTree, 
  FaSnowflake, 
  FaWater, 
  FaCampground, 
  FaHouseUser, 
  FaFire, 
  FaSpa, 
  FaGolfBall,
  FaFortAwesome
} from 'react-icons/fa';
import { GiIsland, GiWindmill, GiTreehouse, GiBarn } from 'react-icons/gi';
import { MdCabin, MdOutlineHouseboat } from 'react-icons/md';

interface CategoryItemProps {
  name: string;
  icon: React.ReactNode;
  imageIcon?: string;
  isSelected: boolean;
  onClick: () => void;
}

const categories = [
  { name: 'Beachfront', imageIcon: '/images/type1.jpeg' },
  { name: 'Amazing views', imageIcon: '/images/type2.jpeg' },
  { name: 'Trending', icon: <FaFire /> },
  { name: 'Iconic cities', imageIcon: '/images/type3.jpeg' },
  { name: 'Countryside', imageIcon: '/images/type4.jpeg' },
  { name: 'Islands', imageIcon: '/images/type5.jpeg' },
  { name: 'Cabins', imageIcon: '/images/type6.jpeg' },
  { name: 'Pools', icon: <FaSwimmingPool /> },
  { name: 'Skiing', imageIcon: '/images/type7.jpeg' },
  { name: 'Lakefront', imageIcon: '/images/type8.jpeg' },
  { name: 'Camping', imageIcon: '/images/type9.jpeg' },
  { name: 'Mansions', imageIcon: '/images/type10.jpeg' },
  { name: 'Castles', imageIcon: '/images/type11.jpeg' },
  { name: 'Windmills', imageIcon: '/images/type12.jpeg' },
  { name: 'Treehouses', icon: <GiTreehouse /> },
  { name: 'Barns', icon: <GiBarn /> },
  { name: 'Boats', icon: <MdOutlineHouseboat /> },
  { name: 'Wellness', icon: <FaSpa /> },
  { name: 'Golf', icon: <FaGolfBall /> },
];

const CategoryItem = ({ name, icon, imageIcon, isSelected, onClick }: CategoryItemProps) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`flex flex-col items-center justify-center cursor-pointer px-3 py-2 ${
        isSelected 
          ? 'border-b-2 border-black text-black' 
          : 'text-airbnb-light-gray hover:border-b-2 hover:border-gray-300'
      }`}
    >
      {imageIcon ? (
        <div className="relative w-6 h-6 mb-1 rounded-md overflow-hidden">
          <Image 
            src={imageIcon} 
            alt={name}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="text-xl mb-1">{icon}</div>
      )}
      <span className="text-xs whitespace-nowrap">{name}</span>
    </motion.div>
  );
};

const CategoryFilter = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const checkScrollButtons = () => {
    if (!scrollContainerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setShowLeftButton(scrollLeft > 20);
    setShowRightButton(scrollLeft < scrollWidth - clientWidth - 20);
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      const { scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowScrollButtons(scrollWidth > clientWidth);
      checkScrollButtons();
    }

    window.addEventListener('resize', checkScrollButtons);
    return () => window.removeEventListener('resize', checkScrollButtons);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current: container } = scrollContainerRef;
      const scrollAmount = container.clientWidth / 2;
      
      const newScrollPosition = direction === 'left'
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;
      
      container.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
      
      setScrollPosition(newScrollPosition);
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setScrollPosition(scrollContainerRef.current.scrollLeft);
      checkScrollButtons();
    }
  };

  return (
    <div className="relative border-b border-gray-200 max-w-7xl mx-auto">
      <div className="flex items-center">
        {/* Left Scroll Button */}
        {showScrollButtons && showLeftButton && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute left-0 bg-white rounded-full shadow-lg z-10 p-1 hover:scale-105 transition-transform"
            onClick={() => scroll('left')}
          >
            <FiChevronLeft className="h-5 w-5" />
          </motion.button>
        )}

        {/* Category Scrollable Container */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide py-4 px-4 sm:px-6 space-x-8"
          onScroll={handleScroll}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((category, index) => (
            <CategoryItem
              key={index}
              name={category.name}
              icon={category.icon}
              imageIcon={category.imageIcon}
              isSelected={selectedCategory === category.name}
              onClick={() => {
                setSelectedCategory(
                  selectedCategory === category.name ? null : category.name
                );
              }}
            />
          ))}
        </div>

        {/* Right Scroll Button */}
        {showScrollButtons && showRightButton && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute right-12 bg-white rounded-full shadow-lg z-10 p-1 hover:scale-105 transition-transform"
            onClick={() => scroll('right')}
          >
            <FiChevronRight className="h-5 w-5" />
          </motion.button>
        )}

        {/* Filters Button */}
        <div className="absolute right-0 bg-white px-4 py-4">
          <button className="flex items-center space-x-2 border border-gray-300 rounded-lg px-4 py-2 hover:shadow-md transition-shadow">
            <FiSliders className="h-4 w-4" />
            <span className="text-sm font-medium">Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter; 
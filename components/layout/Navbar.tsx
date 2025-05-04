'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  FiGlobe, 
  FiMenu, 
  FiSearch, 
  FiUser 
} from 'react-icons/fi';


const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4 md:py-6 border-b-0">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="relative h-8 w-8 sm:w-auto">
                <Image 
                  src="/images/airbnb-logo.png" 
                  alt="Airbnb" 
                  width={32} 
                  height={32}
                  className="sm:hidden"
                />
                <Image 
                  src="/images/long-logo.png" 
                  alt="Airbnb" 
                  width={102} 
                  height={32}
                  className="hidden sm:block"
                />
              </div>
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center relative mx-auto">
            <button 
              className="flex items-center text-sm font-medium rounded-full border border-gray-200 hover:shadow-md transition px-4 py-2"
              onClick={() => setMobileSearchOpen(true)}  
            >
              <span className="font-medium px-3">Anywhere</span>
              <span className="h-5 border-r border-gray-300"></span>
              <span className="font-medium px-3">Any week</span>
              <span className="h-5 border-r border-gray-300"></span>
              <span className="text-gray-400 px-3">Add guests</span>
              <div className="bg-airbnb-pink p-2 rounded-full text-white ml-2">
                <FiSearch className="h-4 w-4" />
              </div>
            </button>
          </div>

          {/* Mobile Search Button */}
          <div className="flex md:hidden">
            <button 
              className="flex items-center text-sm font-medium rounded-full border border-gray-200 hover:shadow-md transition px-4 py-2"
              onClick={() => setMobileSearchOpen(true)}
            >
              <FiSearch className="h-4 w-4 mr-2" />
              <span>Search</span>
            </button>
          </div>

          {/* User Menu */}
          <div className="flex items-center">
            <Link 
              href="/host" 
              className="mr-1 text-sm font-medium px-4 py-2 rounded-full hover:bg-gray-100 hidden md:block"
            >
              Airbnb your home
            </Link>
            
            <button className="p-2 rounded-full hover:bg-gray-100 mr-1">
              <FiGlobe className="h-5 w-5" />
            </button>
            
            <div className="relative">
              <button 
                className="flex items-center border rounded-full p-1 hover:shadow-md"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <FiMenu className="h-5 w-5 mx-2" />
                <div className="bg-gray-500 rounded-full p-1 text-white">
                  <FiUser className="h-4 w-4" />
                </div>
              </button>
              
              {userMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-airbnb-dark border border-gray-200 py-2"
                >
                  <div className="py-1">
                    <a href="#" className="block px-4 py-2 text-sm text-airbnb-dark-gray hover:bg-gray-100">Sign up</a>
                    <a href="#" className="block px-4 py-2 text-sm text-airbnb-dark-gray hover:bg-gray-100">Log in</a>
                  </div>
                  <div className="border-t border-gray-200"></div>
                  <div className="py-1">
                    <a href="#" className="block px-4 py-2 text-sm text-airbnb-dark-gray hover:bg-gray-100">Airbnb your home</a>
                    <a href="#" className="block px-4 py-2 text-sm text-airbnb-dark-gray hover:bg-gray-100">Host an experience</a>
                    <a href="#" className="block px-4 py-2 text-sm text-airbnb-dark-gray hover:bg-gray-100">Help</a>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Modal */}
      {mobileSearchOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setMobileSearchOpen(false)}
        >
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="bg-white w-full max-w-md rounded-lg overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Search</h2>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setMobileSearchOpen(false)}
                >
                  ✕
                </button>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h3 className="font-medium mb-2">Where</h3>
                <input 
                  type="text" 
                  placeholder="Search destinations" 
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              
              <div className="flex space-x-2 mb-4">
                <div className="flex-1">
                  <h3 className="font-medium mb-2">Check in</h3>
                  <input 
                    type="text" 
                    placeholder="Add dates" 
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium mb-2">Check out</h3>
                  <input 
                    type="text" 
                    placeholder="Add dates" 
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h3 className="font-medium mb-2">Who</h3>
                <div className="flex items-center justify-between">
                  <span>Adults</span>
                  <div className="flex items-center">
                    <button className="w-8 h-8 rounded-full border border-gray-300">-</button>
                    <span className="mx-3">0</span>
                    <button className="w-8 h-8 rounded-full border border-gray-300">+</button>
                  </div>
                </div>
              </div>
              
              <button className="w-full bg-airbnb-pink text-white py-3 rounded-lg font-medium">
                Search
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar; 
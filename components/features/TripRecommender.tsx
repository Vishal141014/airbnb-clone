'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronRight, FiClock, FiMapPin, FiStar, FiUser, FiWind } from 'react-icons/fi';
import Image from 'next/image';

// Mock recommendation data
const recommendations = [
  {
    id: 'rec1',
    title: 'Relaxing Beach Getaway',
    location: 'Tulum, Mexico',
    description: 'Enjoy crystal clear waters and white sand beaches in this tropical paradise.',
    image: '/images/img1.jpg',
    price: 120,
    rating: 4.92,
    weather: 'Sunny',
    temp: '84°F',
    activities: ['Snorkeling', 'Beach Yoga', 'Mayan Ruins'],
    personalizedNote: 'Based on your browsing history, we think you\'ll love the snorkeling tours here!',
  },
  {
    id: 'rec2',
    title: 'Mountain Cabin Retreat',
    location: 'Aspen, Colorado',
    description: 'Escape to the mountains in this cozy cabin surrounded by stunning nature.',
    image: '/images/img3.jpg',
    price: 195,
    rating: 4.88,
    weather: 'Partly Cloudy',
    temp: '42°F',
    activities: ['Hiking', 'Skiing', 'Hot Springs'],
    personalizedNote: 'Your previous stays in mountain areas suggest you\'ll love the hiking trails here!',
  },
  {
    id: 'rec3',
    title: 'Historic City Exploration',
    location: 'Rome, Italy',
    description: 'Immerse yourself in history, art, and amazing cuisine in the Eternal City.',
    image: '/images/img5.jpg',
    price: 135,
    rating: 4.95,
    weather: 'Sunny',
    temp: '72°F',
    activities: ['Colosseum', 'Vatican Museums', 'Food Tours'],
    personalizedNote: 'Your interest in history suggests you\'ll enjoy the ancient Roman architecture!',
  },
];

interface TripRecommenderProps {
  onClose?: () => void;
}

const TripRecommender = ({ onClose }: TripRecommenderProps) => {
  const [currentRec, setCurrentRec] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [showPreferences, setShowPreferences] = useState(false);
  
  // Simulate AI analyzing user preferences
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnalyzing(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    setCurrentRec((prev) => (prev + 1) % recommendations.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-white rounded-2xl shadow-airbnb-dark overflow-hidden w-full max-w-md"
    >
      <div className="relative">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-airbnb-purple to-airbnb-teal flex items-center justify-center text-white">
              <span className="text-lg font-bold">AI</span>
            </div>
            <h3 className="ml-2 font-medium text-lg">Trip Recommendations</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
            aria-label="Close"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
        
        {/* Loading State */}
        {isAnalyzing ? (
          <div className="p-8 flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-gray-200 border-t-airbnb-pink rounded-full animate-spin mb-4"></div>
            <p className="text-airbnb-dark-gray font-medium">Our AI is analyzing your preferences...</p>
            <p className="text-airbnb-light-gray text-sm mt-2">Finding perfect matches based on your browsing history and saved listings</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentRec}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Recommendation Card */}
              <div className="p-4">
                <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                  <Image
                    src={recommendations[currentRec].image}
                    alt={recommendations[currentRec].title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                    <h2 className="text-white font-bold text-xl">{recommendations[currentRec].title}</h2>
                    <p className="text-white text-sm flex items-center mt-1">
                      <FiMapPin className="mr-1" /> {recommendations[currentRec].location}
                    </p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-airbnb-dark-gray">
                    {recommendations[currentRec].description}
                  </p>
                </div>
                
                {/* Trip Details */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center text-sm text-airbnb-light-gray mb-1">
                      <FiStar className="mr-1" /> Rating
                    </div>
                    <p className="font-medium">{recommendations[currentRec].rating}/5</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center text-sm text-airbnb-light-gray mb-1">
                      <FiWind className="mr-1" /> Weather
                    </div>
                    <p className="font-medium">{recommendations[currentRec].temp}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center text-sm text-airbnb-light-gray mb-1">
                      <FiClock className="mr-1" /> Price
                    </div>
                    <p className="font-medium">${recommendations[currentRec].price}/night</p>
                  </div>
                </div>
                
                {/* Activities */}
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Suggested Activities</h3>
                  <div className="flex flex-wrap gap-2">
                    {recommendations[currentRec].activities.map((activity, index) => (
                      <span 
                        key={index} 
                        className="bg-gray-100 text-airbnb-dark-gray text-sm px-3 py-1 rounded-full"
                      >
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* AI Personalization */}
                <div className="bg-airbnb-bg border border-airbnb-border p-3 rounded-lg mb-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-airbnb-purple to-airbnb-teal flex items-center justify-center text-white shrink-0">
                      <span className="text-sm font-bold">AI</span>
                    </div>
                    <p className="ml-2 text-sm text-airbnb-dark-gray">
                      {recommendations[currentRec].personalizedNote}
                    </p>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button 
                    className="flex-1 bg-airbnb-pink text-white py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
                    onClick={() => {}}
                  >
                    Book This Trip
                  </button>
                  <button 
                    className="flex items-center justify-center bg-white border border-gray-300 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={handleNext}
                  >
                    <FiChevronRight className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Preference Customization */}
                <div className="mt-4">
                  <button 
                    className="text-sm text-airbnb-pink font-medium flex items-center w-full justify-center"
                    onClick={() => setShowPreferences(!showPreferences)}
                  >
                    <FiUser className="mr-1" />
                    {showPreferences ? 'Hide preferences' : 'Adjust your preferences'}
                  </button>
                  
                  {showPreferences && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-3 border-t border-gray-200 pt-3"
                    >
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium mb-1">Trip type</label>
                          <select className="w-full border border-gray-300 rounded-md p-2 text-sm">
                            <option>Relaxation</option>
                            <option>Adventure</option>
                            <option>Cultural</option>
                            <option>Urban</option>
                            <option>Nature</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Budget per night</label>
                          <select className="w-full border border-gray-300 rounded-md p-2 text-sm">
                            <option>$0 - $100</option>
                            <option>$100 - $200</option>
                            <option>$200 - $300</option>
                            <option>$300+</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Climate</label>
                          <select className="w-full border border-gray-300 rounded-md p-2 text-sm">
                            <option>Warm</option>
                            <option>Cold</option>
                            <option>Moderate</option>
                            <option>Any</option>
                          </select>
                        </div>
                        <button className="bg-airbnb-dark-gray text-white w-full py-2 rounded-lg text-sm font-medium mt-2">
                          Update Preferences
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
};

export default TripRecommender; 
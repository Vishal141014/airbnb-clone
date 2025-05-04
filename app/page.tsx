'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import CategoryFilter from '../components/home/CategoryFilter';
import PropertyGrid from '../components/home/PropertyGrid';
import MapView from '../components/map/MapView';
import TripRecommender from '../components/features/TripRecommender';
import WishlistCollaboration from '../components/features/WishlistCollaboration';
import CompareListings from '../components/features/CompareListings';
import InspirationCarousel from '../components/home/InspirationCarousel';
import { FiMapPin, FiGrid, FiShare2, FiHeart, FiSlack } from 'react-icons/fi';

export default function Home() {
  const [showMap, setShowMap] = useState(false);
  const [showTripRecommender, setShowTripRecommender] = useState(false);
  const [showWishlistCollab, setShowWishlistCollab] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  
  return (
    <Layout>
      <div className="pt-24">
        {/* Category Filter */}
        <CategoryFilter />
        
        {/* View toggle and features */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap justify-between items-center border-b border-gray-200">
          <div className="flex space-x-2">
            <button 
              onClick={() => setShowMap(false)}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium ${
                !showMap ? 'bg-airbnb-dark-gray text-white' : 'bg-gray-100 text-airbnb-dark-gray'
              }`}
            >
              <FiGrid className="w-4 h-4 mr-2" />
              Grid
            </button>
            <button 
              onClick={() => setShowMap(true)}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium ${
                showMap ? 'bg-airbnb-dark-gray text-white' : 'bg-gray-100 text-airbnb-dark-gray'
              }`}
            >
              <FiMapPin className="w-4 h-4 mr-2" />
              Map
            </button>
          </div>
          
          <div className="flex space-x-2 mt-2 sm:mt-0">
            <button 
              onClick={() => setShowTripRecommender(true)}
              className="flex items-center px-4 py-2 bg-airbnb-pink text-white rounded-lg text-sm font-medium"
            >
              AI Recommendations
            </button>
            <button 
              onClick={() => setShowWishlistCollab(true)}
              className="flex items-center px-4 py-2 bg-gray-100 text-airbnb-dark-gray rounded-lg text-sm font-medium"
            >
              <FiHeart className="w-4 h-4 mr-2" />
              Group Planning
            </button>
            <button 
              onClick={() => setShowCompare(true)}
              className="hidden sm:flex items-center px-4 py-2 bg-gray-100 text-airbnb-dark-gray rounded-lg text-sm font-medium"
            >
              <FiSlack className="w-4 h-4 mr-2" />
              Compare
            </button>
          </div>
        </div>
        
        {/* Main Content - Map or Grid */}
        {showMap ? (
          <div className="h-[calc(100vh-172px)]">
            <MapView 
              showHeatmap={true}
              selectedPropertyId={selectedPropertyId || undefined}
              onSelectProperty={(id) => setSelectedPropertyId(id)}
            />
          </div>
        ) : (
          <PropertyGrid />
        )}
        
        {/* Inspiration Carousel */}
        <InspirationCarousel />
        
        {/* Feature Modals */}
        {showTripRecommender && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <TripRecommender onClose={() => setShowTripRecommender(false)} />
          </div>
        )}
        
        {showWishlistCollab && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <WishlistCollaboration onClose={() => setShowWishlistCollab(false)} />
          </div>
        )}
        
        {showCompare && (
          <CompareListings onClose={() => setShowCompare(false)} />
        )}
        
        {/* Feature Promotion */}
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="fixed bottom-20 right-4 bg-white rounded-lg shadow-airbnb-dark p-4 max-w-xs z-30 sm:bottom-4"
        >
          <button 
            onClick={() => setShowTripRecommender(true)}
            className="absolute -top-2 -right-2 bg-gray-100 rounded-full p-1"
          >
            <span className="text-xs">×</span>
          </button>
          <h3 className="font-medium mb-1">Try our AI Trip Planner</h3>
          <p className="text-sm text-airbnb-light-gray mb-2">Get personalized recommendations based on your preferences</p>
          <button 
            onClick={() => setShowTripRecommender(true)}
            className="bg-airbnb-pink text-white text-sm font-medium w-full py-2 rounded-lg"
          >
            Get Recommendations
          </button>
        </motion.div>
      </div>
    </Layout>
  );
}
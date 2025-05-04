'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiX, FiCheck, FiChevronDown, FiPlus, FiStar, FiInfo } from 'react-icons/fi';

interface Amenity {
  id: string;
  name: string;
  category: string;
}

interface CompareProperty {
  id: string;
  title: string;
  location: string;
  images: string[];
  price: number;
  rating: number;
  reviewCount: number;
  beds: number;
  baths: number;
  guests: number;
  hostName: string;
  hostImage: string;
  amenities: string[]; // IDs of amenities
  distanceToCenter: string;
  cancelPolicy: string;
}

// Mock amenities data
const allAmenities: Amenity[] = [
  { id: 'wifi', name: 'Wifi', category: 'Essentials' },
  { id: 'kitchen', name: 'Kitchen', category: 'Essentials' },
  { id: 'washer', name: 'Washer', category: 'Essentials' },
  { id: 'dryer', name: 'Dryer', category: 'Essentials' },
  { id: 'ac', name: 'Air conditioning', category: 'Essentials' },
  { id: 'heating', name: 'Heating', category: 'Essentials' },
  { id: 'workspace', name: 'Dedicated workspace', category: 'Essentials' },
  { id: 'tv', name: 'TV', category: 'Essentials' },
  { id: 'parking', name: 'Free parking', category: 'Essentials' },
  { id: 'pool', name: 'Pool', category: 'Features' },
  { id: 'hot-tub', name: 'Hot tub', category: 'Features' },
  { id: 'bbq', name: 'BBQ grill', category: 'Features' },
  { id: 'firepit', name: 'Fire pit', category: 'Features' },
  { id: 'gym', name: 'Gym', category: 'Features' },
  { id: 'beach', name: 'Beachfront', category: 'Location' },
  { id: 'waterfront', name: 'Waterfront', category: 'Location' },
  { id: 'mountain', name: 'Mountain view', category: 'Location' },
];

// Mock properties data
const mockProperties: CompareProperty[] = [
  {
    id: 'prop1',
    title: 'Luxury Villa with Infinity Pool',
    location: 'Malibu, California',
    images: [
      '/images/img1.jpg',
      '/images/img2.jpg',
    ],
    price: 450,
    rating: 4.98,
    reviewCount: 124,
    beds: 4,
    baths: 3,
    guests: 8,
    hostName: 'Amanda',
    hostImage: '/images/type1.jpeg',
    amenities: ['wifi', 'kitchen', 'ac', 'pool', 'beach', 'waterfront'],
    distanceToCenter: '3.5 miles',
    cancelPolicy: 'Full refund 5 days before arrival',
  },
  {
    id: 'prop2',
    title: 'Modern Mountain Cabin',
    location: 'Aspen, Colorado',
    images: [
      '/images/img3.jpg',
      '/images/img4.jpg',
    ],
    price: 275,
    rating: 4.85,
    reviewCount: 76,
    beds: 3,
    baths: 2,
    guests: 6,
    hostName: 'Robert',
    hostImage: '/images/type2.jpeg',
    amenities: ['wifi', 'kitchen', 'heating', 'hot-tub', 'firepit', 'mountain'],
    distanceToCenter: '2.1 miles',
    cancelPolicy: 'Full refund 7 days before arrival',
  },
  {
    id: 'prop3',
    title: 'Downtown Luxury Loft',
    location: 'New York, New York',
    images: [
      '/images/img5.jpg',
      '/images/img6.jpg',
    ],
    price: 325,
    rating: 4.92,
    reviewCount: 104,
    beds: 2,
    baths: 2,
    guests: 4,
    hostName: 'Sophia',
    hostImage: '/images/type3.jpeg',
    amenities: ['wifi', 'kitchen', 'ac', 'workspace', 'tv', 'gym'],
    distanceToCenter: '0.5 miles',
    cancelPolicy: 'Full refund 3 days before arrival',
  },
];

interface CompareListingsProps {
  onClose?: () => void;
}

const CompareListings = ({ onClose }: CompareListingsProps) => {
  const [properties, setProperties] = useState<CompareProperty[]>(mockProperties);
  const [expandedSections, setExpandedSections] = useState<string[]>(['basics']);
  
  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };
  
  const removeProperty = (id: string) => {
    setProperties(prev => prev.filter(prop => prop.id !== id));
  };
  
  const hasAmenity = (propertyId: string, amenityId: string) => {
    const property = properties.find(p => p.id === propertyId);
    return property?.amenities.includes(amenityId);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold">Compare Listings</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="Close"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
        
        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-4 divide-x divide-gray-200">
            {/* Left column - Labels */}
            <div className="p-4 sticky left-0 bg-white">
              <div className="h-72 flex items-end pb-4">
                <p className="text-lg font-medium">Property Details</p>
              </div>
              
              {/* Basics section */}
              <div className="py-4 border-t border-gray-200">
                <button 
                  className="flex items-center justify-between w-full text-left mb-4"
                  onClick={() => toggleSection('basics')}
                >
                  <h3 className="text-lg font-medium">Basics</h3>
                  <FiChevronDown className={`transform transition-transform ${
                    expandedSections.includes('basics') ? 'rotate-180' : ''
                  }`} />
                </button>
                
                {expandedSections.includes('basics') && (
                  <div className="space-y-6">
                    <p className="text-airbnb-light-gray">Price</p>
                    <p className="text-airbnb-light-gray">Rating</p>
                    <p className="text-airbnb-light-gray">Beds</p>
                    <p className="text-airbnb-light-gray">Baths</p>
                    <p className="text-airbnb-light-gray">Max guests</p>
                    <p className="text-airbnb-light-gray">Distance to center</p>
                    <p className="text-airbnb-light-gray">Cancellation policy</p>
                    <p className="text-airbnb-light-gray">Host</p>
                  </div>
                )}
              </div>
              
              {/* Amenities section */}
              <div className="py-4 border-t border-gray-200">
                <button 
                  className="flex items-center justify-between w-full text-left mb-4"
                  onClick={() => toggleSection('amenities')}
                >
                  <h3 className="text-lg font-medium">Amenities</h3>
                  <FiChevronDown className={`transform transition-transform ${
                    expandedSections.includes('amenities') ? 'rotate-180' : ''
                  }`} />
                </button>
                
                {expandedSections.includes('amenities') && (
                  <div className="space-y-6">
                    {allAmenities.map((amenity) => (
                      <p key={amenity.id} className="text-airbnb-light-gray">{amenity.name}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Property columns */}
            {properties.map((property) => (
              <div key={property.id} className="p-4">
                {/* Property header with image */}
                <div className="relative h-72">
                  <div className="absolute top-0 right-0 z-10">
                    <button 
                      onClick={() => removeProperty(property.id)}
                      className="bg-white rounded-full p-1 shadow-md"
                      aria-label="Remove property"
                    >
                      <FiX className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="relative h-full rounded-lg overflow-hidden">
                    <Image
                      src={property.images[0]}
                      alt={property.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black to-transparent">
                    <h3 className="text-white font-medium line-clamp-1">{property.title}</h3>
                    <p className="text-white text-sm">{property.location}</p>
                  </div>
                </div>
                
                {/* Basics section */}
                <div className="py-4 border-t border-gray-200">
                  {expandedSections.includes('basics') && (
                    <div className="space-y-6">
                      <p className="font-medium">${property.price} <span className="text-airbnb-light-gray font-normal">night</span></p>
                      <p className="flex items-center">
                        <FiStar className="w-4 h-4 text-airbnb-pink mr-1" />
                        <span>{property.rating}</span>
                        <span className="text-airbnb-light-gray ml-1">({property.reviewCount})</span>
                      </p>
                      <p>{property.beds} {property.beds === 1 ? 'bed' : 'beds'}</p>
                      <p>{property.baths} {property.baths === 1 ? 'bath' : 'baths'}</p>
                      <p>{property.guests} guests</p>
                      <p>{property.distanceToCenter}</p>
                      <p className="text-sm">{property.cancelPolicy}</p>
                      <div className="flex items-center">
                        <div className="relative h-8 w-8 rounded-full overflow-hidden mr-2">
                          <Image 
                            src={property.hostImage}
                            alt={property.hostName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span>{property.hostName}</span>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Amenities section */}
                <div className="py-4 border-t border-gray-200">
                  {expandedSections.includes('amenities') && (
                    <div className="space-y-6">
                      {allAmenities.map((amenity) => (
                        <div key={amenity.id} className="flex items-center">
                          {hasAmenity(property.id, amenity.id) ? (
                            <FiCheck className="w-5 h-5 text-green-500" />
                          ) : (
                            <FiX className="w-5 h-5 text-gray-300" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Add property column */}
            {properties.length < 3 && (
              <div className="p-4 flex items-center justify-center">
                <div className="h-72 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg w-full">
                  <button className="bg-airbnb-pink text-white rounded-full p-3 mb-2">
                    <FiPlus className="w-6 h-6" />
                  </button>
                  <p className="text-airbnb-dark-gray font-medium">Add a listing</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex justify-between">
            <button 
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-lg font-medium"
            >
              Close
            </button>
            <div className="flex items-center">
              <FiInfo className="text-airbnb-light-gray mr-2" />
              <span className="text-sm text-airbnb-light-gray">Compare up to 3 listings side by side</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CompareListings; 
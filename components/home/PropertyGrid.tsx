'use client';

import { useState } from 'react';
import PropertyCard from './PropertyCard';

// Mock data for property listings
const mockListings = [
  {
    id: '1',
    title: 'Luxury Villa with Oceanfront Views',
    location: 'Malibu, California',
    images: [
      '/images/img1.jpg',
      '/images/img2.jpg',
      '/images/img3.jpg',
    ],
    price: 450,
    rating: 4.98,
    superHost: true,
  },
  {
    id: '2',
    title: 'Modern Treehouse Retreat',
    location: 'Portland, Oregon',
    images: [
      '/images/img4.jpg',
      '/images/img5.jpg',
      '/images/img6.jpg',
    ],
    price: 215,
    rating: 4.88,
  },
  {
    id: '3',
    title: 'Stylish Downtown Loft',
    location: 'New York, New York',
    images: [
      '/images/img7.jpg',
      '/images/img8.jpg',
      '/images/img1.webp',
    ],
    price: 325,
    rating: 4.92,
  },
  {
    id: '4',
    title: 'Secluded Cabin with Hot Tub',
    location: 'Aspen, Colorado',
    images: [
      '/images/img2.jpg',
      '/images/img3.jpg',
      '/images/img4.jpg',
    ],
    price: 275,
    rating: 4.85,
    superHost: true,
  },
  {
    id: '5',
    title: 'Beachfront Cottage',
    location: 'Santa Monica, California',
    images: [
      '/images/img5.jpg',
      '/images/img6.jpg',
      '/images/img7.jpg',
    ],
    price: 395,
    rating: 4.95,
  },
  {
    id: '6',
    title: 'Desert Oasis with Pool',
    location: 'Palm Springs, California',
    images: [
      '/images/img8.jpg',
      '/images/img1.jpg',
      '/images/img2.jpg',
    ],
    price: 320,
    rating: 4.89,
  },
  {
    id: '7',
    title: 'Historic Brownstone',
    location: 'Boston, Massachusetts',
    images: [
      '/images/img3.jpg',
      '/images/img4.jpg',
      '/images/img5.jpg',
    ],
    price: 285,
    rating: 4.91,
  },
  {
    id: '8',
    title: 'Lakefront Cabin with Dock',
    location: 'Lake Tahoe, California',
    images: [
      '/images/img6.jpg',
      '/images/img7.jpg',
      '/images/img8.jpg',
    ],
    price: 340,
    rating: 4.93,
    superHost: true,
  },
  {
    id: '9',
    title: 'Charming French Quarter Apartment',
    location: 'New Orleans, Louisiana',
    images: [
      '/images/img1.webp',
      '/images/img1.jpg',
      '/images/img2.jpg',
    ],
    price: 195,
    rating: 4.87,
  },
  {
    id: '10',
    title: 'Modern Farmhouse Retreat',
    location: 'Nashville, Tennessee',
    images: [
      '/images/img3.jpg',
      '/images/img4.jpg',
      '/images/img5.jpg',
    ],
    price: 225,
    rating: 4.96,
  },
  {
    id: '11',
    title: 'Mountain View Chalet',
    location: 'Breckenridge, Colorado',
    images: [
      '/images/img6.jpg',
      '/images/img7.jpg',
      '/images/img8.jpg',
    ],
    price: 375,
    rating: 4.99,
    superHost: true,
  },
  {
    id: '12',
    title: 'Cozy Studio in Historic District',
    location: 'Charleston, South Carolina',
    images: [
      '/images/img1.jpg',
      '/images/img2.jpg',
      '/images/img3.jpg',
    ],
    price: 165,
    rating: 4.84,
  },
];

interface PropertyGridProps {
  showMap?: boolean;
}

const PropertyGrid = ({ showMap = false }: PropertyGridProps) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const handleToggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <div className={`${showMap ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'} grid gap-6 p-4 sm:p-6`}>
      {mockListings.map((listing) => (
        <PropertyCard
          key={listing.id}
          id={listing.id}
          title={listing.title}
          location={listing.location}
          images={listing.images}
          price={listing.price}
          rating={listing.rating}
          favorite={favorites.includes(listing.id)}
          superHost={listing.superHost}
          onFavoriteToggle={handleToggleFavorite}
        />
      ))}
    </div>
  );
};

export default PropertyGrid; 
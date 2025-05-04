'use client';

import Link from 'next/link';
import { FiGlobe } from 'react-icons/fi';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const footerLinks = {
    'Support': [
      { name: 'Help Center', href: '#' },
      { name: 'AirCover', href: '#' },
      { name: 'Supporting people with disabilities', href: '#' },
      { name: 'Cancellation options', href: '#' },
      { name: 'Our COVID-19 Response', href: '#' },
      { name: 'Report a neighborhood concern', href: '#' },
    ],
    'Community': [
      { name: 'Airbnb.org: disaster relief housing', href: '#' },
      { name: 'Combating discrimination', href: '#' },
    ],
    'Hosting': [
      { name: 'Airbnb your home', href: '#' },
      { name: 'AirCover for Hosts', href: '#' },
      { name: 'Explore hosting resources', href: '#' },
      { name: 'Visit our community forum', href: '#' },
      { name: 'How to host responsibly', href: '#' },
    ],
    'Airbnb': [
      { name: 'Newsroom', href: '#' },
      { name: 'Learn about new features', href: '#' },
      { name: 'Letter from our founders', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Investors', href: '#' },
      { name: 'Gift cards', href: '#' },
    ],
  };

  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.keys(footerLinks).map((category) => (
            <div key={category}>
              <h3 className="text-sm font-bold text-airbnb-dark-gray mb-4">{category}</h3>
              <ul className="space-y-3">
                {footerLinks[category].map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-airbnb-light-gray hover:underline text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Secondary Footer */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 md:flex md:items-center md:justify-between">
          <div className="flex items-center space-x-6 md:order-2">
            <div className="flex items-center">
              <FiGlobe className="h-5 w-5 mr-1" />
              <span className="text-sm font-medium">English (US)</span>
            </div>
            <div>
              <span className="text-sm font-medium">$ USD</span>
            </div>
            <div className="flex space-x-4">
              <Link href="#" className="text-airbnb-light-gray hover:text-airbnb-dark-gray">
                <FaFacebookF className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-airbnb-light-gray hover:text-airbnb-dark-gray">
                <FaTwitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-airbnb-light-gray hover:text-airbnb-dark-gray">
                <FaInstagram className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-sm text-airbnb-light-gray">
              &copy; {new Date().getFullYear()} Airbnb, Inc. &middot;{' '}
              <Link href="#" className="hover:underline">Privacy</Link> &middot;{' '}
              <Link href="#" className="hover:underline">Terms</Link> &middot;{' '}
              <Link href="#" className="hover:underline">Sitemap</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Mobile App Promotion - Fixed at bottom on mobile */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 flex justify-between items-center md:hidden z-10">
        <div>
          <p className="font-medium text-airbnb-dark-gray">Download the app</p>
          <p className="text-xs text-airbnb-light-gray">All the features, in your pocket</p>
        </div>
        <button className="bg-airbnb-pink text-white px-4 py-2 rounded-lg text-sm font-medium">
          Get the app
        </button>
      </div>
    </footer>
  );
};

export default Footer; 
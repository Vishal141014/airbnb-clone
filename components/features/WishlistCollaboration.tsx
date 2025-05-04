'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHeart, FiMessageSquare, FiShare2, FiThumbsUp, FiThumbsDown, FiUserPlus, FiX, FiSend } from 'react-icons/fi';

interface Collaborator {
  id: string;
  name: string;
  avatar: string;
  votedFor?: string[];
  votedAgainst?: string[];
}

interface Comment {
  id: string;
  authorId: string;
  text: string;
  timestamp: string;
}

interface WishlistItem {
  id: string;
  title: string;
  location: string;
  image: string;
  price: number;
  rating: number;
  votes: {
    up: string[]; // array of user IDs who voted up
    down: string[]; // array of user IDs who voted down
  };
  comments: Comment[];
}

const mockCollaborators: Collaborator[] = [
  {
    id: 'user1',
    name: 'You',
    avatar: '/images/type4.jpeg',
  },
  {
    id: 'user2',
    name: 'Alex',
    avatar: '/images/type5.jpeg',
    votedFor: ['item1', 'item3'],
  },
  {
    id: 'user3',
    name: 'Jamie',
    avatar: '/images/type6.jpeg',
    votedFor: ['item2'],
    votedAgainst: ['item1'],
  },
  {
    id: 'user4',
    name: 'Taylor',
    avatar: '/images/type7.jpeg',
    votedFor: ['item3'],
  },
];

const mockWishlistItems: WishlistItem[] = [
  {
    id: 'item1',
    title: 'Treehouse Retreat with Ocean View',
    location: 'Big Sur, California',
    image: '/images/img1.jpg',
    price: 250,
    rating: 4.97,
    votes: {
      up: ['user1', 'user2', 'user4'],
      down: ['user3'],
    },
    comments: [
      {
        id: 'comment1',
        authorId: 'user1',
        text: 'This place looks amazing! I love the view.',
        timestamp: '2 days ago',
      },
      {
        id: 'comment2',
        authorId: 'user3',
        text: 'It\'s a bit pricey though...',
        timestamp: '1 day ago',
      },
      {
        id: 'comment3',
        authorId: 'user2',
        text: 'Worth it for the experience. Those views!',
        timestamp: '12 hours ago',
      },
    ],
  },
  {
    id: 'item2',
    title: 'Modern Loft in Downtown',
    location: 'Barcelona, Spain',
    image: '/images/img2.jpg',
    price: 175,
    rating: 4.85,
    votes: {
      up: ['user3'],
      down: [],
    },
    comments: [
      {
        id: 'comment4',
        authorId: 'user3',
        text: 'The location is perfect for exploring the city!',
        timestamp: '3 days ago',
      },
    ],
  },
  {
    id: 'item3',
    title: 'Beachfront Cottage',
    location: 'Tulum, Mexico',
    image: '/images/img3.jpg',
    price: 195,
    rating: 4.95,
    votes: {
      up: ['user2', 'user4'],
      down: [],
    },
    comments: [
      {
        id: 'comment5',
        authorId: 'user4',
        text: 'This looks amazing! I love how close it is to the beach.',
        timestamp: '1 week ago',
      },
      {
        id: 'comment6',
        authorId: 'user2',
        text: 'Can we stay for a full week? The reviews say the host is super accommodating.',
        timestamp: '5 days ago',
      },
    ],
  },
];

interface WishlistCollaborationProps {
  onClose?: () => void;
}

const WishlistCollaboration = ({ onClose }: WishlistCollaborationProps) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(mockWishlistItems);
  const [collaborators] = useState<Collaborator[]>(mockCollaborators);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');
  
  const activeItem = activeItemId 
    ? wishlistItems.find(item => item.id === activeItemId) 
    : null;
    
  const currentUser = collaborators[0]; // Assuming first user is the current user
  
  const handleVote = (itemId: string, voteType: 'up' | 'down') => {
    setWishlistItems(items => 
      items.map(item => {
        if (item.id !== itemId) return item;
        
        const hasVotedUp = item.votes.up.includes(currentUser.id);
        const hasVotedDown = item.votes.down.includes(currentUser.id);
        
        let updatedVotes = { ...item.votes };
        
        if (voteType === 'up') {
          if (hasVotedUp) {
            // Remove up vote if already voted up
            updatedVotes.up = updatedVotes.up.filter(id => id !== currentUser.id);
          } else {
            // Add up vote and remove down vote if exists
            updatedVotes.up = [...updatedVotes.up, currentUser.id];
            updatedVotes.down = updatedVotes.down.filter(id => id !== currentUser.id);
          }
        } else {
          if (hasVotedDown) {
            // Remove down vote if already voted down
            updatedVotes.down = updatedVotes.down.filter(id => id !== currentUser.id);
          } else {
            // Add down vote and remove up vote if exists
            updatedVotes.down = [...updatedVotes.down, currentUser.id];
            updatedVotes.up = updatedVotes.up.filter(id => id !== currentUser.id);
          }
        }
        
        return {
          ...item,
          votes: updatedVotes,
        };
      })
    );
  };
  
  const handleAddComment = (itemId: string) => {
    if (!commentText.trim()) return;
    
    setWishlistItems(items => 
      items.map(item => {
        if (item.id !== itemId) return item;
        
        const newComment: Comment = {
          id: `comment${Date.now()}`,
          authorId: currentUser.id,
          text: commentText,
          timestamp: 'Just now',
        };
        
        return {
          ...item,
          comments: [...item.comments, newComment],
        };
      })
    );
    
    setCommentText('');
  };
  
  const getCollaboratorByUserId = (userId: string) => {
    return collaborators.find(collab => collab.id === userId);
  };
  
  const handleShareWishlist = () => {
    // This would typically show share options/copy link functionality
    alert('Share link copied to clipboard!');
  };
  
  return (
    <div className="bg-white rounded-xl shadow-airbnb overflow-hidden">
      <div className="border-b border-gray-200">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center">
            <div className="bg-airbnb-pink rounded-full p-2 text-white">
              <FiHeart className="w-5 h-5" />
            </div>
            <h2 className="ml-2 font-medium text-lg">Group Wishlist: Summer Trip</h2>
          </div>
          {onClose && (
            <button 
              onClick={onClose}
              className="p-1.5 hover:bg-gray-100 rounded-full"
              aria-label="Close"
            >
              <FiX className="w-5 h-5" />
            </button>
          )}
        </div>
        
        {/* Collaborators */}
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium">Collaborators</h3>
            <button className="text-airbnb-pink text-sm font-medium flex items-center">
              <FiUserPlus className="w-4 h-4 mr-1" />
              Invite
            </button>
          </div>
          <div className="flex -space-x-2 overflow-hidden">
            {collaborators.map(collaborator => (
              <div 
                key={collaborator.id} 
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white relative"
                title={collaborator.name}
              >
                <Image
                  src={collaborator.avatar}
                  alt={collaborator.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="max-h-[500px] overflow-y-auto">
        {/* Wishlist items */}
        <div className="divide-y divide-gray-200">
          {wishlistItems.map((item) => (
            <div key={item.id} className="p-4">
              <div className="flex gap-3">
                {/* Property image */}
                <div className="relative h-24 w-24 flex-shrink-0 rounded-lg overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* Property details */}
                <div className="flex-1">
                  <h3 className="font-medium line-clamp-1">{item.title}</h3>
                  <p className="text-sm text-airbnb-light-gray">{item.location}</p>
                  <p className="text-sm mt-1">
                    <span className="font-medium">${item.price}</span>
                    <span className="text-airbnb-light-gray"> night</span>
                  </p>
                  
                  {/* Voting */}
                  <div className="flex items-center mt-2">
                    <button 
                      onClick={() => handleVote(item.id, 'up')}
                      className={`flex items-center justify-center p-1.5 rounded-full mr-1 ${
                        item.votes.up.includes(currentUser.id) 
                          ? 'bg-green-100 text-green-600' 
                          : 'hover:bg-gray-100 text-gray-500'
                      }`}
                      aria-label="Vote up"
                    >
                      <FiThumbsUp className="w-4 h-4" />
                    </button>
                    <span className="text-sm mr-2">{item.votes.up.length}</span>
                    
                    <button 
                      onClick={() => handleVote(item.id, 'down')}
                      className={`flex items-center justify-center p-1.5 rounded-full mr-1 ${
                        item.votes.down.includes(currentUser.id) 
                          ? 'bg-red-100 text-red-600' 
                          : 'hover:bg-gray-100 text-gray-500'
                      }`}
                      aria-label="Vote down"
                    >
                      <FiThumbsDown className="w-4 h-4" />
                    </button>
                    <span className="text-sm mr-2">{item.votes.down.length}</span>
                    
                    <button 
                      onClick={() => setActiveItemId(activeItemId === item.id ? null : item.id)}
                      className="flex items-center justify-center p-1.5 rounded-full hover:bg-gray-100 text-gray-500 mr-1"
                      aria-label="Show comments"
                    >
                      <FiMessageSquare className="w-4 h-4" />
                    </button>
                    <span className="text-sm">{item.comments.length}</span>
                  </div>
                </div>
              </div>
              
              {/* Comments section (expanded when active) */}
              {activeItemId === item.id && (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 pt-3 border-t border-gray-100"
                  >
                    <h4 className="text-sm font-medium mb-2">Comments</h4>
                    
                    <div className="space-y-3 mb-3 max-h-40 overflow-y-auto">
                      {item.comments.map(comment => {
                        const author = getCollaboratorByUserId(comment.authorId);
                        return (
                          <div key={comment.id} className="flex gap-2">
                            <div className="relative h-8 w-8 flex-shrink-0 rounded-full overflow-hidden">
                              <Image
                                src={author?.avatar || ''}
                                alt={author?.name || ''}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="bg-gray-100 rounded-xl p-2">
                                <p className="text-sm font-medium">{author?.name}</p>
                                <p className="text-sm">{comment.text}</p>
                              </div>
                              <p className="text-xs text-airbnb-light-gray mt-1">{comment.timestamp}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* Add comment */}
                    <div className="flex gap-2 mt-2">
                      <div className="relative h-8 w-8 flex-shrink-0 rounded-full overflow-hidden">
                        <Image
                          src={currentUser.avatar}
                          alt={currentUser.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 flex">
                        <input
                          type="text"
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          placeholder="Add a comment..."
                          className="flex-1 border border-gray-300 rounded-l-full px-4 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-airbnb-pink focus:border-transparent"
                        />
                        <button
                          onClick={() => handleAddComment(item.id)}
                          disabled={!commentText.trim()}
                          className="bg-airbnb-pink text-white rounded-r-full px-3 disabled:opacity-50"
                        >
                          <FiSend />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Wishlist actions */}
      <div className="p-4 border-t border-gray-200 flex justify-between">
        <div className="text-sm text-airbnb-light-gray">
          {wishlistItems.length} places saved
        </div>
        <button 
          onClick={handleShareWishlist}
          className="flex items-center text-airbnb-pink text-sm font-medium"
        >
          <FiShare2 className="w-4 h-4 mr-1" />
          Share
        </button>
      </div>
    </div>
  );
};

export default WishlistCollaboration; 
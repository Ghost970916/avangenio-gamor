import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { PlusIcon, AdjustmentsHorizontalIcon, MagnifyingGlassIcon, UserIcon } from '@heroicons/react/24/solid';
import { searchGames, getGameCategories, getStreamers } from '../utils/twitchApi';

interface Streamer {
  id: string;
  name: string;
  profileImageUrl: string;
}

interface GameSearchProps {
  onSubscribe: (streamerId: string) => void;
  subscribedStreamers: string[];
}

const GameSearch: React.FC<GameSearchProps> = ({ onSubscribe, subscribedStreamers }) => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [gameCategories, setGameCategories] = useState<{ id: string; name: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [streamers, setStreamers] = useState<Streamer[]>([]);
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);

  useEffect(() => {
    const fetchGameCategories = async () => {
      const categories = await getGameCategories();
      setGameCategories(categories);
    };
    fetchGameCategories();
  }, []);

  const handleSearch = async () => {
    if (searchQuery) {
      const games = await searchGames(searchQuery);
      if (games.length > 0) {
        const gameStreamers = await getStreamers(games[0].id);
        setStreamers(gameStreamers);
      }
    }
  };

  const handleCategoryChange = async (categoryId: string) => {
    setSelectedCategory(categoryId);
    setShowCategoryFilter(false);
    if (categoryId) {
      const gameStreamers = await getStreamers(categoryId);
      setStreamers(gameStreamers);
    }
  };

  return (
    <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <h2 className="text-xl font-bold mb-4">Searching Game</h2>
      <div className="flex flex-col space-y-2 mb-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a game"
            className={`flex-grow p-2 rounded-md ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}
          />
          <button
            onClick={() => setShowCategoryFilter(!showCategoryFilter)}
            className={`p-2 rounded-md ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}
          >
            <AdjustmentsHorizontalIcon className="w-5 h-5" />
          </button>
        </div>
        <button
          onClick={handleSearch}
          className={`w-full px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-orange-500 hover:bg-orange-600'} text-white flex items-center justify-center`}
        >
          <MagnifyingGlassIcon className="w-5 h-5 mr-2" />
          Search
        </button>
      </div>
      {showCategoryFilter && (
        <div className={`mb-4 p-2 rounded-md ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className={`w-full p-2 rounded-md ${theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-white text-gray-900'}`}
          >
            <option value="">Select a category</option>
            {gameCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className="mt-6 space-y-4 max-h-96 overflow-y-auto">
        {streamers.map((streamer) => (
          <div key={streamer.id} className={`p-4 rounded-lg flex items-center justify-between ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <div className="flex items-center space-x-4">
              <img src={streamer.profileImageUrl} alt={streamer.name} className="w-10 h-10 rounded-full" />
              <span className="font-medium">{streamer.name}</span>
            </div>
            {subscribedStreamers.includes(streamer.id) ? (
              <div className={`p-1 rounded-full ${theme === 'dark' ? 'bg-purple-500' : 'bg-orange-500'}`}>
                <UserIcon className="w-4 h-4 text-white" />
              </div>
            ) : (
              <button
                onClick={() => onSubscribe(streamer.id)}
                className={`p-1 rounded-full ${theme === 'dark' ? 'bg-purple-500 hover:bg-purple-600' : 'bg-orange-500 hover:bg-orange-600'} text-white`}
              >
                <PlusIcon className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameSearch;
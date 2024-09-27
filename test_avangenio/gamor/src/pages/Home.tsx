import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import Navbar from '../components/Navbar';
import MainSection from '../components/MainSection';
import GameSearch from '../components/GameSearch';
import LiveStreams from '../components/LiveStreams';
import { getGameCategories } from '../utils/twitchApi';

const Home: React.FC = () => {
  const { theme } = useTheme();
  const [subscribedStreamers, setSubscribedStreamers] = useState<string[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string; boxArtUrl: string }[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getGameCategories();
      setCategories(fetchedCategories);
    };
    fetchCategories();
  }, []);

  const handleSubscribe = (streamerId: string) => {
    setSubscribedStreamers((prev) =>
      prev.includes(streamerId) ? prev.filter((id) => id !== streamerId) : [...prev, streamerId]
    );
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/3">
            <MainSection />
          </div>
          <div className="w-full lg:w-1/3">
            <LiveStreams />
          </div>
          <div className="w-full lg:w-1/3">
            <GameSearch onSubscribe={handleSubscribe} subscribedStreamers={subscribedStreamers} />
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Top Games</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.slice(0, 12).map((category) => (
              <div key={category.id} className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
                <img src={category.boxArtUrl.replace('{width}', '285').replace('{height}', '380')} alt={category.name} className="w-full h-auto rounded-md mb-2" />
                <p className="text-sm font-medium text-center">{category.name}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
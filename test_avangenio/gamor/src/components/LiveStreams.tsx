import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { getLiveStreams } from '../utils/twitchApi';

interface Stream {
  id: string;
  user_name: string;
  game_name: string;
  title: string;
  viewer_count: number;
  started_at: string;
  thumbnail_url: string;
}

const LiveStreams: React.FC = () => {
  const { theme } = useTheme();
  const [streams, setStreams] = useState<Stream[]>([]);

  useEffect(() => {
    const fetchStreams = async () => {
      const data = await getLiveStreams();
      setStreams(data);
    };
    fetchStreams();
  }, []);

  return (
    <div className={`rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <div className={`p-6 ${theme === 'dark' ? 'bg-purple-600' : 'bg-orange-500'} text-white`}>
        <h2 className="text-2xl font-bold mb-2">Live Streams</h2>
        <p className="text-sm">Popular streams happening now</p>
      </div>
      <div className="p-4">
        {streams.map((stream) => (
          <div key={stream.id} className={`flex items-center p-3 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} border-b last:border-b-0`}>
            <div className="flex-shrink-0 w-16 h-16 mr-4">
              <img
                src={stream.thumbnail_url.replace('{width}', '128').replace('{height}', '72')}
                alt={stream.title}
                className="w-full h-full object-cover rounded"
              />
            </div>
            <div className="flex-grow">
              <h3 className="text-lg font-semibold">{stream.user_name}</h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{stream.title}</p>
              <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                {stream.game_name} - {stream.viewer_count.toLocaleString()} viewers
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveStreams;
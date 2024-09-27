import axios from 'axios';

const clientId = 'a5muazggf4kdkcfvd96vsqvwnbx436';
const clientSecret = 'zqyy8xptwym6mojfktmxj9kldm4ziq';

interface Game {
  id: string;
  name: string;
  box_art_url: string;
}

interface Stream {
  id: string;
  user_id: string;
  user_name: string;
  game_name: string;
  title: string;
  viewer_count: number;
  started_at: string;
  thumbnail_url: string;
}

let accessToken: string | null = null;

const getAccessToken = async () => {
  if (accessToken) return accessToken;

  try {
    const response = await axios.post('https://id.twitch.tv/oauth2/token', null, {
      params: {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'client_credentials'
      }
    });
    accessToken = response.data.access_token;
    return accessToken;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
};

const api = axios.create({
  baseURL: 'https://api.twitch.tv/helix',
});

api.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  config.headers['Client-ID'] = clientId;
  config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

export const searchGames = async (query: string) => {
  try {
    const response = await api.get<{ data: Game[] }>('/search/categories', { params: { query } });
    return response.data.data;
  } catch (error) {
    console.error('Error searching games:', error);
    return [];
  }
};

//No encuentro ningún endpoint para las categorías o géneros, así que estoy recibiendo los top Games de la plataforma
export const getGameCategories = async () => {
  try {
    const response = await api.get<{ data: Game[] }>('/games/top'); 
    return response.data.data.map((game) => ({
      id: game.id,
      name: game.name,
      boxArtUrl: game.box_art_url,
    }));
  } catch (error) {
    console.error('Error fetching game categories:', error);
    return [];
  }
};

export const getStreamers = async (gameId: string) => {
  try {
    const response = await api.get<{ data: Stream[] }>('/streams', { params: { game_id: gameId } });
    return response.data.data.map((stream) => ({
      id: stream.user_id,
      name: stream.user_name,
      profileImageUrl: stream.thumbnail_url.replace('{width}', '50').replace('{height}', '50'),
    }));
  } catch (error) {
    console.error('Error fetching streamers:', error);
    return [];
  }
};

export const getLiveStreams = async (gameId?: string) => {
  try {
    const params: { [key: string]: string } = { first: '3' };
    if (gameId) {
      params.game_id = gameId;
    }
    const response = await api.get<{ data: Stream[] }>('/streams', { params });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching live streams:', error);
    return [];
  }
};
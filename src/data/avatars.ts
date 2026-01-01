export interface Avatar {
  key: string;
  name: string;
  category: 'superhero' | 'anime' | 'cartoon' | 'space' | 'fantasy' | 'nature';
  // Gradient-based avatar using colors instead of emojis
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  icon: 'shield' | 'lightning' | 'star' | 'flame' | 'moon' | 'sun' | 'crystal' | 'leaf' | 'wave' | 'mountain' | 'crown' | 'sword' | 'heart' | 'diamond' | 'rocket' | 'planet';
}

export const avatarLibrary: Avatar[] = [
  // Superheroes
  { key: 'hero-shield', name: 'Guardian', category: 'superhero', colors: { primary: '#3B82F6', secondary: '#1E40AF', accent: '#93C5FD' }, icon: 'shield' },
  { key: 'hero-lightning', name: 'Storm Rider', category: 'superhero', colors: { primary: '#FBBF24', secondary: '#B45309', accent: '#FEF3C7' }, icon: 'lightning' },
  { key: 'hero-flame', name: 'Inferno', category: 'superhero', colors: { primary: '#EF4444', secondary: '#991B1B', accent: '#FCA5A5' }, icon: 'flame' },
  { key: 'hero-star', name: 'Stellar', category: 'superhero', colors: { primary: '#8B5CF6', secondary: '#5B21B6', accent: '#C4B5FD' }, icon: 'star' },
  
  // Anime Style
  { key: 'anime-moon', name: 'Luna Knight', category: 'anime', colors: { primary: '#6366F1', secondary: '#312E81', accent: '#A5B4FC' }, icon: 'moon' },
  { key: 'anime-sun', name: 'Solar Sage', category: 'anime', colors: { primary: '#F97316', secondary: '#9A3412', accent: '#FDBA74' }, icon: 'sun' },
  { key: 'anime-sword', name: 'Blade Master', category: 'anime', colors: { primary: '#64748B', secondary: '#1E293B', accent: '#CBD5E1' }, icon: 'sword' },
  { key: 'anime-crystal', name: 'Crystal Mage', category: 'anime', colors: { primary: '#EC4899', secondary: '#9D174D', accent: '#F9A8D4' }, icon: 'crystal' },
  
  // Cartoon Characters
  { key: 'cartoon-crown', name: 'Royal Jester', category: 'cartoon', colors: { primary: '#A855F7', secondary: '#6B21A8', accent: '#D8B4FE' }, icon: 'crown' },
  { key: 'cartoon-heart', name: 'Cheerful Hero', category: 'cartoon', colors: { primary: '#F43F5E', secondary: '#BE123C', accent: '#FDA4AF' }, icon: 'heart' },
  { key: 'cartoon-diamond', name: 'Gem Collector', category: 'cartoon', colors: { primary: '#14B8A6', secondary: '#0F766E', accent: '#5EEAD4' }, icon: 'diamond' },
  { key: 'cartoon-star', name: 'Star Chaser', category: 'cartoon', colors: { primary: '#FACC15', secondary: '#A16207', accent: '#FEF08A' }, icon: 'star' },
  
  // Space Theme
  { key: 'space-rocket', name: 'Voyager', category: 'space', colors: { primary: '#0EA5E9', secondary: '#0369A1', accent: '#7DD3FC' }, icon: 'rocket' },
  { key: 'space-planet', name: 'Cosmic Explorer', category: 'space', colors: { primary: '#7C3AED', secondary: '#4C1D95', accent: '#C4B5FD' }, icon: 'planet' },
  { key: 'space-star', name: 'Nebula Walker', category: 'space', colors: { primary: '#06B6D4', secondary: '#0E7490', accent: '#67E8F9' }, icon: 'star' },
  
  // Fantasy
  { key: 'fantasy-crystal', name: 'Arcane Keeper', category: 'fantasy', colors: { primary: '#8B5CF6', secondary: '#5B21B6', accent: '#DDD6FE' }, icon: 'crystal' },
  { key: 'fantasy-flame', name: 'Dragon Rider', category: 'fantasy', colors: { primary: '#DC2626', secondary: '#7F1D1D', accent: '#FCA5A5' }, icon: 'flame' },
  { key: 'fantasy-crown', name: 'Elven Royal', category: 'fantasy', colors: { primary: '#10B981', secondary: '#047857', accent: '#6EE7B7' }, icon: 'crown' },
  
  // Nature
  { key: 'nature-leaf', name: 'Forest Spirit', category: 'nature', colors: { primary: '#22C55E', secondary: '#166534', accent: '#86EFAC' }, icon: 'leaf' },
  { key: 'nature-wave', name: 'Ocean Wanderer', category: 'nature', colors: { primary: '#0284C7', secondary: '#075985', accent: '#7DD3FC' }, icon: 'wave' },
  { key: 'nature-mountain', name: 'Peak Climber', category: 'nature', colors: { primary: '#78716C', secondary: '#44403C', accent: '#D6D3D1' }, icon: 'mountain' },
  { key: 'nature-sun', name: 'Dawn Walker', category: 'nature', colors: { primary: '#FB923C', secondary: '#C2410C', accent: '#FED7AA' }, icon: 'sun' },
];

export const getAvatarByKey = (key: string): Avatar | undefined => {
  return avatarLibrary.find(avatar => avatar.key === key);
};

// Generate a deterministic avatar key based on user identifier (email or id)
export const getRandomAvatarKey = (identifier: string): string => {
  // Simple hash function to get a deterministic index
  let hash = 0;
  for (let i = 0; i < identifier.length; i++) {
    const char = identifier.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  const index = Math.abs(hash) % avatarLibrary.length;
  return avatarLibrary[index].key;
};

export const getAvatarColors = (key: string): Avatar['colors'] => {
  const avatar = getAvatarByKey(key);
  return avatar?.colors || { primary: '#6366F1', secondary: '#4F46E5', accent: '#A5B4FC' };
};

export const getAvatarIcon = (key: string): Avatar['icon'] => {
  const avatar = getAvatarByKey(key);
  return avatar?.icon || 'star';
};

export const avatarCategories = [
  { key: 'superhero', label: 'Superheroes' },
  { key: 'anime', label: 'Anime' },
  { key: 'cartoon', label: 'Cartoon' },
  { key: 'space', label: 'Space' },
  { key: 'fantasy', label: 'Fantasy' },
  { key: 'nature', label: 'Nature' },
] as const;

// Legacy function for backwards compatibility - returns empty string
export const getAvatarEmoji = (key: string): string => {
  return '';
};

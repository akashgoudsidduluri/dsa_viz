export interface Avatar {
  key: string;
  name: string;
  category: 'superhero' | 'anime' | 'cartoon' | 'lego' | 'tv';
  emoji: string;
}

export const avatarLibrary: Avatar[] = [
  // Superheroes
  { key: 'superhero-1', name: 'Caped Crusader', category: 'superhero', emoji: '🦇' },
  { key: 'superhero-2', name: 'Web Slinger', category: 'superhero', emoji: '🕷️' },
  { key: 'superhero-3', name: 'Thunder God', category: 'superhero', emoji: '⚡' },
  
  // Anime Style
  { key: 'anime-1', name: 'Ninja Warrior', category: 'anime', emoji: '🥷' },
  { key: 'anime-2', name: 'Saiyan Fighter', category: 'anime', emoji: '💥' },
  { key: 'anime-3', name: 'Pirate King', category: 'anime', emoji: '🏴‍☠️' },
  
  // Cartoon Characters
  { key: 'cartoon-1', name: 'Yellow Sponge', category: 'cartoon', emoji: '🧽' },
  { key: 'cartoon-2', name: 'Pink Star', category: 'cartoon', emoji: '⭐' },
  { key: 'cartoon-3', name: 'Clever Fox', category: 'cartoon', emoji: '🦊' },
  
  // LEGO Style
  { key: 'lego-1', name: 'Master Builder', category: 'lego', emoji: '🧱' },
  { key: 'lego-2', name: 'Space Explorer', category: 'lego', emoji: '🚀' },
  { key: 'lego-3', name: 'Ninja Master', category: 'lego', emoji: '🥋' },
  
  // TV Characters
  { key: 'tv-1', name: 'Time Traveler', category: 'tv', emoji: '⏰' },
  { key: 'tv-2', name: 'Galaxy Ranger', category: 'tv', emoji: '🌌' },
  { key: 'tv-3', name: 'Mystery Solver', category: 'tv', emoji: '🔍' },
];

export const getAvatarByKey = (key: string): Avatar | undefined => {
  return avatarLibrary.find(avatar => avatar.key === key);
};

export const getAvatarEmoji = (key: string): string => {
  const avatar = getAvatarByKey(key);
  return avatar?.emoji || '👤';
};

export const avatarCategories = [
  { key: 'superhero', label: 'Superheroes' },
  { key: 'anime', label: 'Anime' },
  { key: 'cartoon', label: 'Cartoon' },
  { key: 'lego', label: 'LEGO Style' },
  { key: 'tv', label: 'TV Characters' },
] as const;

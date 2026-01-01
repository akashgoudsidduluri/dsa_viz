import { motion } from 'framer-motion';
import { 
  Shield, Zap, Star, Flame, Moon, Sun, 
  Sparkles, Leaf, Waves, Mountain, Crown, 
  Sword, Heart, Diamond, Rocket, Globe 
} from 'lucide-react';
import { getAvatarColors, getAvatarIcon, Avatar } from '@/data/avatars';
import { cn } from '@/lib/utils';

interface AvatarDisplayProps {
  avatarKey: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showBorder?: boolean;
}

const iconMap = {
  shield: Shield,
  lightning: Zap,
  star: Star,
  flame: Flame,
  moon: Moon,
  sun: Sun,
  crystal: Sparkles,
  leaf: Leaf,
  wave: Waves,
  mountain: Mountain,
  crown: Crown,
  sword: Sword,
  heart: Heart,
  diamond: Diamond,
  rocket: Rocket,
  planet: Globe,
};

const sizeClasses = {
  sm: 'w-10 h-10',
  md: 'w-16 h-16',
  lg: 'w-24 h-24',
  xl: 'w-32 h-32',
};

const iconSizes = {
  sm: 'w-5 h-5',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
};

export const AvatarDisplay = ({ 
  avatarKey, 
  size = 'md', 
  className,
  showBorder = true 
}: AvatarDisplayProps) => {
  const colors = getAvatarColors(avatarKey);
  const iconType = getAvatarIcon(avatarKey);
  const IconComponent = iconMap[iconType] || Star;

  return (
    <motion.div
      className={cn(
        'rounded-2xl flex items-center justify-center relative overflow-hidden',
        sizeClasses[size],
        showBorder && 'border-2',
        className
      )}
      style={{
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
        borderColor: colors.accent,
        boxShadow: `0 4px 20px ${colors.primary}40`,
      }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {/* Decorative background pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${colors.accent} 0%, transparent 50%),
                       radial-gradient(circle at 70% 70%, ${colors.primary} 0%, transparent 50%)`,
        }}
      />
      
      {/* Icon */}
      <IconComponent 
        className={cn(iconSizes[size], 'relative z-10 text-white drop-shadow-lg')}
        strokeWidth={1.5}
      />
    </motion.div>
  );
};

// Smaller version for lists/grids
interface AvatarThumbnailProps {
  avatarKey: string;
  isSelected?: boolean;
  onClick?: () => void;
  avatar?: Avatar;
}

export const AvatarThumbnail = ({ 
  avatarKey, 
  isSelected, 
  onClick,
  avatar 
}: AvatarThumbnailProps) => {
  const colors = avatar?.colors || getAvatarColors(avatarKey);
  const iconType = avatar?.icon || getAvatarIcon(avatarKey);
  const IconComponent = iconMap[iconType] || Star;

  return (
    <motion.button
      onClick={onClick}
      className={cn(
        'w-14 h-14 rounded-xl flex items-center justify-center relative overflow-hidden transition-all',
        isSelected 
          ? 'ring-2 ring-primary ring-offset-2 ring-offset-background scale-110' 
          : 'hover:scale-105'
      )}
      style={{
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
        boxShadow: isSelected ? `0 4px 15px ${colors.primary}50` : 'none',
      }}
      whileTap={{ scale: 0.95 }}
    >
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${colors.accent} 0%, transparent 50%)`,
        }}
      />
      <IconComponent 
        className="w-7 h-7 relative z-10 text-white drop-shadow"
        strokeWidth={1.5}
      />
    </motion.button>
  );
};

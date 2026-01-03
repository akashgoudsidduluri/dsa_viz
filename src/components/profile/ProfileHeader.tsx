import { motion } from 'framer-motion';
import { Calendar, Edit2, Mail, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AvatarDisplay } from './AvatarDisplay';

interface Profile {
  username: string;
  email: string;
  avatar_key: string;
  bio: string | null;
  created_at: string;
}

interface ProfileHeaderProps {
  profile: Profile;
  onEdit: () => void;
}

export const ProfileHeader = ({ profile, onEdit }: ProfileHeaderProps) => {
  const joinDate = new Date(profile.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-xl border border-border bg-card"
    >
      {/* Gradient header background */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent" />
      
      <div className="relative p-5">
        {/* Avatar and Edit Button Row */}
        <div className="flex items-start justify-between mb-4">
          <div className="relative">
            <div className="ring-4 ring-card rounded-full">
              <AvatarDisplay avatarKey={profile.avatar_key} size="lg" />
            </div>
            <motion.div 
              className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center ring-2 ring-card"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Sparkles className="w-3 h-3 text-success-foreground" />
            </motion.div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onEdit}
            className="gap-1.5 text-xs"
          >
            <Edit2 className="w-3 h-3" />
            Edit
          </Button>
        </div>

        {/* Username and Email */}
        <div className="space-y-1 mb-3">
          <h2 className="text-xl font-bold tracking-tight">{profile.username}</h2>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Mail className="w-3.5 h-3.5" />
            <span>{profile.email}</span>
          </div>
        </div>

        {/* Bio */}
        {profile.bio && (
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
            {profile.bio}
          </p>
        )}

        {/* Join Date */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground pt-3 border-t border-border">
          <Calendar className="w-3.5 h-3.5" />
          <span>Member since {joinDate}</span>
        </div>
      </div>
    </motion.div>
  );
};

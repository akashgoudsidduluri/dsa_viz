import { motion } from 'framer-motion';
import { Calendar, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getAvatarEmoji } from '@/data/avatars';

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
      className="glass-card p-6 space-y-4"
    >
      {/* Avatar */}
      <div className="flex items-start justify-between">
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary/30 flex items-center justify-center text-5xl">
          {getAvatarEmoji(profile.avatar_key)}
        </div>
        <Button variant="ghost" size="icon" onClick={onEdit}>
          <Edit2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Info */}
      <div className="space-y-1">
        <h2 className="text-2xl font-bold">{profile.username}</h2>
        <p className="text-muted-foreground text-sm">{profile.email}</p>
      </div>

      {/* Bio */}
      {profile.bio && (
        <p className="text-sm text-muted-foreground">{profile.bio}</p>
      )}

      {/* Join Date */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Calendar className="w-4 h-4" />
        <span>Joined {joinDate}</span>
      </div>
    </motion.div>
  );
};

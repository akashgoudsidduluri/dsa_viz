import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Phone, Calendar, FileText, Check } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { avatarLibrary, avatarCategories, getAvatarEmoji } from '@/data/avatars';

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export const EditProfileDialog = ({ open, onOpenChange, onSuccess }: EditProfileDialogProps) => {
  const { profile, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'avatar'>('details');

  // Form state
  const [bio, setBio] = useState(profile?.bio || '');
  const [phone, setPhone] = useState(profile?.phone || '');
  const [dateOfBirth, setDateOfBirth] = useState(profile?.date_of_birth || '');
  const [additionalInfo, setAdditionalInfo] = useState(profile?.additional_info || '');
  const [selectedAvatar, setSelectedAvatar] = useState(profile?.avatar_key || 'superhero-1');

  const handleSave = async () => {
    setLoading(true);
    
    const { error } = await updateProfile({
      bio: bio || null,
      phone: phone || null,
      date_of_birth: dateOfBirth || null,
      additional_info: additionalInfo || null,
      avatar_key: selectedAvatar,
    });

    setLoading(false);

    if (!error) {
      onOpenChange(false);
      onSuccess?.();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-border pb-2 mb-4">
          <button
            onClick={() => setActiveTab('details')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'details'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            Details
          </button>
          <button
            onClick={() => setActiveTab('avatar')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'avatar'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            Avatar
          </button>
        </div>

        {activeTab === 'details' ? (
          <div className="space-y-4">
            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                maxLength={200}
              />
              <p className="text-xs text-muted-foreground text-right">{bio.length}/200</p>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number (optional)</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Date of Birth */}
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth (optional)</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="dob"
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Additional Info */}
            <div className="space-y-2">
              <Label htmlFor="info">Additional Info (optional)</Label>
              <Textarea
                id="info"
                placeholder="Any other details you'd like to share..."
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                rows={2}
                maxLength={500}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Choose your avatar:</p>
            
            {avatarCategories.map((category) => (
              <div key={category.key} className="space-y-2">
                <h4 className="text-sm font-medium">{category.label}</h4>
                <div className="flex gap-3 flex-wrap">
                  {avatarLibrary
                    .filter((avatar) => avatar.category === category.key)
                    .map((avatar) => (
                      <motion.button
                        key={avatar.key}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedAvatar(avatar.key)}
                        className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl transition-all ${
                          selectedAvatar === avatar.key
                            ? 'bg-primary/20 border-2 border-primary ring-2 ring-primary/30'
                            : 'bg-muted hover:bg-muted/80 border-2 border-transparent'
                        }`}
                        title={avatar.name}
                      >
                        {avatar.emoji}
                        {selectedAvatar === avatar.key && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-primary-foreground" />
                          </div>
                        )}
                      </motion.button>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-border">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            variant="hero"
            className="flex-1"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

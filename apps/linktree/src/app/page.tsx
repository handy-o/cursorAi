'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Edit, Plus, ExternalLink, Instagram, Twitter, Youtube, Github, Linkedin, Globe, Save, X, Trash2, Upload, Camera } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Profile {
  name: string;
  description: string;
  avatar: string;
}

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
}

interface CustomLink {
  id: string;
  title: string;
  description: string;
  url: string;
  image?: string;
}

const defaultProfile: Profile = {
  name: 'Your Name',
  description: 'Welcome to my link tree!',
  avatar: ''
};

const defaultSocialLinks: SocialLink[] = [
  { id: '1', platform: 'Instagram', url: '', icon: 'instagram' },
  { id: '2', platform: 'Twitter', url: '', icon: 'twitter' },
  { id: '3', platform: 'YouTube', url: '', icon: 'youtube' },
  { id: '4', platform: 'GitHub', url: '', icon: 'github' },
  { id: '5', platform: 'LinkedIn', url: '', icon: 'linkedin' },
  { id: '6', platform: 'Website', url: '', icon: 'globe' }
];

const defaultCustomLinks: CustomLink[] = [
  {
    id: '1',
    title: 'My Portfolio',
    description: 'Check out my latest work',
    url: 'https://example.com',
    image: ''
  }
];

export default function Home() {
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(defaultSocialLinks);
  const [customLinks, setCustomLinks] = useState<CustomLink[]>(defaultCustomLinks);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Load data from localStorage with error handling
    if (typeof window !== 'undefined') {
      try {
        const savedProfile = localStorage.getItem('linktree-profile');
        const savedSocialLinks = localStorage.getItem('linktree-social-links');
        const savedCustomLinks = localStorage.getItem('linktree-custom-links');

        if (savedProfile) {
          const parsedProfile = JSON.parse(savedProfile);
          if (parsedProfile.name && parsedProfile.description !== undefined) {
            setProfile(parsedProfile);
          }
        }
        
        if (savedSocialLinks) {
          const parsedSocialLinks = JSON.parse(savedSocialLinks);
          if (Array.isArray(parsedSocialLinks)) {
            setSocialLinks(parsedSocialLinks);
          }
        }
        
        if (savedCustomLinks) {
          const parsedCustomLinks = JSON.parse(savedCustomLinks);
          if (Array.isArray(parsedCustomLinks)) {
            setCustomLinks(parsedCustomLinks);
          }
        }
      } catch (error) {
        console.error('Error loading data from localStorage:', error);
        // Reset to defaults if there's an error
        setProfile(defaultProfile);
        setSocialLinks(defaultSocialLinks);
        setCustomLinks(defaultCustomLinks);
      }
    }
  }, []);

  const saveData = () => {
    console.log('Saving data...', { profile, socialLinks, customLinks });
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('linktree-profile', JSON.stringify(profile));
        localStorage.setItem('linktree-social-links', JSON.stringify(socialLinks));
        localStorage.setItem('linktree-custom-links', JSON.stringify(customLinks));
        console.log('Data saved successfully');
        toast({
          description: 'Changes saved successfully!',
        });
        setIsEditing(false); // 편집 모드 종료
      } catch (error) {
        console.error('Error saving data to localStorage:', error);
        toast({
          description: 'Error saving data. Please try again.',
          variant: 'destructive',
        });
      }
    }
  };

  const getIcon = (iconName: string) => {
    const icons = {
      instagram: Instagram,
      twitter: Twitter,
      youtube: Youtube,
      github: Github,
      linkedin: Linkedin,
      globe: Globe
    };
    return icons[iconName as keyof typeof icons] || Globe;
  };

  const handleLinkClick = (url: string) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  const handleProfileChange = (field: keyof Profile, value: string) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleSocialLinkChange = (id: string, field: keyof SocialLink, value: string) => {
    setSocialLinks(
      socialLinks.map(link =>
        link.id === id ? { ...link, [field]: value } : link
      )
    );
  };

  const handleCustomLinkChange = (id: string, field: keyof CustomLink, value: string) => {
    setCustomLinks(
      customLinks.map(link =>
        link.id === id ? { ...link, [field]: value } : link
      )
    );
  };

  const addCustomLink = () => {
    const newLink: CustomLink = {
      id: Date.now().toString(),
      title: '',
      description: '',
      url: '',
      image: ''
    };
    setCustomLinks([...customLinks, newLink]);
  };

  const removeCustomLink = (id: string) => {
    setCustomLinks(customLinks.filter(link => link.id !== id));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 파일 크기 체크 (5MB 제한)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          description: 'File size must be less than 5MB',
          variant: 'destructive',
        });
        return;
      }

      // 이미지 파일 타입 체크
      if (!file.type.startsWith('image/')) {
        toast({
          description: 'Please select an image file',
          variant: 'destructive',
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          setProfile({ ...profile, avatar: result });
          toast({
            description: 'Image uploaded successfully!',
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setProfile({ ...profile, avatar: '' });
    toast({
      description: 'Image removed',
    });
  };

  const handleCustomImageUpload = (linkId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 파일 크기 체크 (5MB 제한)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          description: 'File size must be less than 5MB',
          variant: 'destructive',
        });
        return;
      }

      // 이미지 파일 타입 체크
      if (!file.type.startsWith('image/')) {
        toast({
          description: 'Please select an image file',
          variant: 'destructive',
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          handleCustomLinkChange(linkId, 'image', result);
          toast({
            description: 'Image uploaded successfully!',
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeCustomImage = (linkId: string) => {
    handleCustomLinkChange(linkId, 'image', '');
    toast({
      description: 'Image removed',
    });
  };

  return (
    <div className="min-h-screen linktree-gradient py-4 sm:py-8 px-4">
      <div className="max-w-sm sm:max-w-md mx-auto">
        {/* Header with Edit/Save buttons */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-white text-lg font-semibold">My Link Tree</h1>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button
                  onClick={() => setIsEditing(false)}
                  variant="outline"
                  size="sm"
                  className="bg-white/90 hover:bg-white text-gray-700"
                >
                  <X className="w-4 h-4 mr-1" />
                  Cancel
                </Button>
                <Button
                  onClick={saveData}
                  size="sm"
                  className="linktree-button"
                >
                  <Save className="w-4 h-4 mr-1" />
                  Save
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                size="sm"
                className="gap-2 bg-white/90 hover:bg-white border-white/30 text-gray-700"
              >
                <Edit className="w-4 h-4" />
                Edit
              </Button>
            )}
          </div>
        </div>

        {/* Profile Section */}
        <Card className="linktree-card p-6 mb-6 text-center">
          <div className="relative inline-block">
            <Avatar className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 ring-4 ring-white/30">
              <AvatarImage src={profile.avatar} />
              <AvatarFallback className="text-2xl bg-gradient-to-br from-purple-400 to-pink-400 text-white">
                {profile.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {isEditing && (
              <div className="absolute -bottom-2 -right-2 flex gap-1">
                <label htmlFor="avatar-upload" className="cursor-pointer">
                  <div className="w-8 h-8 bg-purple-500 hover:bg-purple-600 rounded-full flex items-center justify-center text-white shadow-lg transition-colors">
                    <Camera className="w-4 h-4" />
                  </div>
                </label>
                {profile.avatar && (
                  <button
                    onClick={removeImage}
                    className="w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            )}
          </div>
          
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="avatar-url" className="text-sm font-medium text-gray-700">Or paste image URL</Label>
                <Input
                  id="avatar-url"
                  value={profile.avatar}
                  onChange={(e) => handleProfileChange('avatar', e.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => handleProfileChange('name', e.target.value)}
                  placeholder="Your name"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="description" className="text-sm font-medium text-gray-700">Description</Label>
                <Textarea
                  id="description"
                  value={profile.description}
                  onChange={(e) => handleProfileChange('description', e.target.value)}
                  placeholder="Tell people about yourself"
                  rows={3}
                  className="mt-1"
                />
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                {profile.name}
              </h1>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {profile.description}
              </p>
            </>
          )}
        </Card>

        {/* Social Links */}
        <div className="space-y-3 mb-6">
          <h2 className="text-white text-sm font-medium mb-2">Social Links</h2>
          {isEditing ? (
            <div className="space-y-3">
              {socialLinks.map((link) => {
                const IconComponent = getIcon(link.icon);
                return (
                  <div key={link.id} className="flex items-center gap-3 p-3 border border-white/30 rounded-lg bg-white/50">
                    <IconComponent className="w-5 h-5 text-gray-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <Label className="text-sm font-medium text-gray-700">{link.platform}</Label>
                      <Input
                        value={link.url}
                        onChange={(e) => handleSocialLinkChange(link.id, 'url', e.target.value)}
                        placeholder="https://..."
                        className="mt-1 text-sm"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            socialLinks
              .filter(link => link.url)
              .map((link) => {
                const IconComponent = getIcon(link.icon);
                return (
                  <Button
                    key={link.id}
                    onClick={() => handleLinkClick(link.url)}
                    className="w-full justify-start gap-3 h-12 sm:h-14 text-left linktree-card hover:scale-105 transition-all duration-200 text-gray-700 font-medium"
                    variant="outline"
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="text-sm sm:text-base">{link.platform}</span>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </Button>
                );
              })
          )}
        </div>

        {/* Custom Links */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="text-white text-sm font-medium">Custom Links</h2>
            {isEditing && (
              <Button onClick={addCustomLink} size="sm" className="linktree-button">
                <Plus className="w-4 h-4 mr-1" />
                Add Link
              </Button>
            )}
          </div>
          
          {isEditing ? (
            <div className="space-y-4">
              {customLinks.map((link) => (
                <div key={link.id} className="p-4 border border-white/30 rounded-lg space-y-3 bg-white/50">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-900 text-sm sm:text-base">Link {customLinks.indexOf(link) + 1}</h3>
                    <Button
                      onClick={() => removeCustomLink(link.id)}
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor={`title-${link.id}`} className="text-sm font-medium text-gray-700">Title</Label>
                      <Input
                        id={`title-${link.id}`}
                        value={link.title}
                        onChange={(e) => handleCustomLinkChange(link.id, 'title', e.target.value)}
                        placeholder="Link title"
                        className="mt-1 text-sm"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`url-${link.id}`} className="text-sm font-medium text-gray-700">URL</Label>
                      <Input
                        id={`url-${link.id}`}
                        value={link.url}
                        onChange={(e) => handleCustomLinkChange(link.id, 'url', e.target.value)}
                        placeholder="https://..."
                        className="mt-1 text-sm"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor={`description-${link.id}`} className="text-sm font-medium text-gray-700">Description</Label>
                    <Textarea
                      id={`description-${link.id}`}
                      value={link.description}
                      onChange={(e) => handleCustomLinkChange(link.id, 'description', e.target.value)}
                      placeholder="Brief description"
                      rows={2}
                      className="mt-1 text-sm"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Image (optional)</Label>
                    <div className="mt-1 space-y-2">
                      {link.image && (
                        <div className="flex items-center gap-2">
                          <img
                            src={link.image}
                            alt="Preview"
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div className="flex gap-1">
                            <label htmlFor={`image-upload-${link.id}`} className="cursor-pointer">
                              <div className="w-8 h-8 bg-purple-500 hover:bg-purple-600 rounded flex items-center justify-center text-white text-xs">
                                <Upload className="w-3 h-3" />
                              </div>
                            </label>
                            <button
                              onClick={() => removeCustomImage(link.id)}
                              className="w-8 h-8 bg-red-500 hover:bg-red-600 rounded flex items-center justify-center text-white text-xs"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      )}
                      {!link.image && (
                        <div className="flex items-center gap-2">
                          <label htmlFor={`image-upload-${link.id}`} className="cursor-pointer">
                            <div className="w-12 h-12 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-purple-500 transition-colors">
                              <Upload className="w-5 h-5 text-gray-400" />
                            </div>
                          </label>
                          <span className="text-xs text-gray-500">Upload image</span>
                        </div>
                      )}
                      <input
                        id={`image-upload-${link.id}`}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleCustomImageUpload(link.id, e)}
                        className="hidden"
                      />
                      <Input
                        value={link.image || ''}
                        onChange={(e) => handleCustomLinkChange(link.id, 'image', e.target.value)}
                        placeholder="Or paste image URL"
                        className="text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            customLinks.map((link) => (
              <Card
                key={link.id}
                className="linktree-card p-4 cursor-pointer hover:scale-105 transition-all duration-200"
                onClick={() => handleLinkClick(link.url)}
              >
                <div className="flex items-center gap-3">
                  {link.image && (
                    <img
                      src={link.image}
                      alt={link.title}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{link.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{link.description}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-white/70 text-xs">
          <p>Made with ❤️ using Next.js</p>
        </div>
      </div>
    </div>
  );
}

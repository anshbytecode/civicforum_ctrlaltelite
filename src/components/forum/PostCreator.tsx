import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Tag, AtSign, ImagePlus, X } from "lucide-react";

interface PostCreatorProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (post: any) => void;
  selectedCity: string;
}

export function PostCreator({ isOpen, onClose, onSubmit, selectedCity }: PostCreatorProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<"announcement" | "complaint" | "discussion">("discussion");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [mentions, setMentions] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [currentMention, setCurrentMention] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPost = {
      id: Date.now().toString(),
      title,
      content,
      category,
      tags,
      mentions,
      location,
      city: selectedCity,
      author: {
        name: "Current User",
        avatar: "",
        verified: false
      },
      timestamp: "Just now",
      likes: 0,
      dislikes: 0,
      comments: 0,
      isPinned: false
    };
    onSubmit(newPost);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setCategory("discussion");
    setLocation("");
    setTags([]);
    setMentions([]);
    setCurrentTag("");
    setCurrentMention("");
  };

  const addTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag]);
      setCurrentTag("");
    }
  };

  const addMention = () => {
    if (currentMention && !mentions.includes(currentMention)) {
      setMentions([...mentions, currentMention]);
      setCurrentMention("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const removeMention = (mentionToRemove: string) => {
    setMentions(mentions.filter(mention => mention !== mentionToRemove));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Create New Post</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={(value: any) => setCategory(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="announcement">📢 Announcement</SelectItem>
                  <SelectItem value="complaint">⚠️ Complaint</SelectItem>
                  <SelectItem value="discussion">💬 Discussion</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                value={selectedCity}
                disabled
                className="bg-muted"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Brief description of your post..."
              required
            />
          </div>

          <div>
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Describe the issue, announcement, or start a discussion..."
              className="min-h-[120px]"
              required
            />
          </div>

          <div>
            <Label htmlFor="location">Location (Optional)</Label>
            <div className="flex">
              <MapPin className="h-4 w-4 mt-3 mr-2 text-muted-foreground" />
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Specific area, landmark, or address..."
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Tags
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    placeholder="WaterIssue, Festival..."
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag} size="sm">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="gap-1">
                      #{tag}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => removeTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <AtSign className="h-4 w-4" />
                  Mentions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    value={currentMention}
                    onChange={(e) => setCurrentMention(e.target.value)}
                    placeholder="username..."
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addMention())}
                  />
                  <Button type="button" onClick={addMention} size="sm">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {mentions.map((mention) => (
                    <Badge key={mention} variant="secondary" className="gap-1">
                      @{mention}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => removeMention(mention)}
                      />
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
            <ImagePlus className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-2">Add photos or videos (optional)</p>
            <Button type="button" variant="outline" size="sm">
              Choose Files
            </Button>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              disabled={!title.trim() || !content.trim()}
            >
              Create Post
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
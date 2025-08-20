import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MessageCircle, 
  ThumbsUp, 
  ThumbsDown, 
  Flag, 
  Pin, 
  MapPin,
  Clock,
  Image as ImageIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
    verified?: boolean;
  };
  category: "announcement" | "complaint" | "discussion";
  tags: string[];
  mentions: string[];
  location?: string;
  media?: {
    type: "image" | "video";
    url: string;
  }[];
  timestamp: string;
  isPinned?: boolean;
  likes: number;
  dislikes: number;
  comments: number;
  city: string;
}

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onDislike: (postId: string) => void;
  onComment: (postId: string) => void;
  onReport: (postId: string) => void;
}

export function PostCard({ post, onLike, onDislike, onComment, onReport }: PostCardProps) {
  const [userLiked, setUserLiked] = useState(false);
  const [userDisliked, setUserDisliked] = useState(false);

  const getCategoryColor = (category: Post["category"]) => {
    switch (category) {
      case "announcement":
        return "bg-announcement text-announcement-foreground";
      case "complaint":
        return "bg-complaint text-complaint-foreground";
      case "discussion":
        return "bg-discussion text-discussion-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getCategoryIcon = (category: Post["category"]) => {
    switch (category) {
      case "announcement":
        return "📢";
      case "complaint":
        return "⚠️";
      case "discussion":
        return "💬";
      default:
        return "📝";
    }
  };

  const handleLike = () => {
    if (userDisliked) setUserDisliked(false);
    setUserLiked(!userLiked);
    onLike(post.id);
  };

  const handleDislike = () => {
    if (userLiked) setUserLiked(false);
    setUserDisliked(!userDisliked);
    onDislike(post.id);
  };

  return (
    <Card className={cn(
      "transition-all duration-200 hover:shadow-lg",
      post.isPinned && "ring-2 ring-primary/20 bg-primary/5"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.author.avatar} />
              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">{post.author.name}</span>
                {post.author.verified && <Badge variant="secondary" className="text-xs px-1.5 py-0.5">✓</Badge>}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {post.timestamp}
                {post.location && (
                  <>
                    <span>•</span>
                    <MapPin className="h-3 w-3" />
                    {post.location}
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {post.isPinned && <Pin className="h-4 w-4 text-primary" />}
            <Badge className={getCategoryColor(post.category)}>
              {getCategoryIcon(post.category)} {post.category}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <h3 className="font-semibold text-lg mb-2 leading-tight">{post.title}</h3>
        <p className="text-muted-foreground mb-3 leading-relaxed">{post.content}</p>
        
        {post.media && post.media.length > 0 && (
          <div className="flex gap-2 mb-3">
            {post.media.map((media, index) => (
              <div key={index} className="relative rounded-lg overflow-hidden bg-muted p-4 flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{media.type}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              #{tag}
            </Badge>
          ))}
          {post.mentions.map((mention) => (
            <Badge key={mention} variant="secondary" className="text-xs">
              @{mention}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={cn(
                "gap-2 text-muted-foreground hover:text-primary",
                userLiked && "text-primary bg-primary/10"
              )}
            >
              <ThumbsUp className="h-4 w-4" />
              {post.likes + (userLiked ? 1 : 0)}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDislike}
              className={cn(
                "gap-2 text-muted-foreground hover:text-destructive",
                userDisliked && "text-destructive bg-destructive/10"
              )}
            >
              <ThumbsDown className="h-4 w-4" />
              {post.dislikes + (userDisliked ? 1 : 0)}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onComment(post.id)}
              className="gap-2 text-muted-foreground hover:text-secondary"
            >
              <MessageCircle className="h-4 w-4" />
              {post.comments}
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onReport(post.id)}
            className="gap-2 text-muted-foreground hover:text-warning"
          >
            <Flag className="h-4 w-4" />
            Report
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
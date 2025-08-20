import { useState } from "react";
import { ForumHeader } from "@/components/forum/ForumHeader";
import { PostCard, Post } from "@/components/forum/PostCard";
import { PostCreator } from "@/components/forum/PostCreator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Filter, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for demonstration
const mockPosts: Post[] = [
  {
    id: "1",
    title: "Water Supply Maintenance - Scheduled Downtime",
    content: "Dear residents, we will be conducting essential water supply maintenance in sectors 12-15 from 6 AM to 2 PM tomorrow. Please store adequate water for the day. We apologize for the inconvenience.",
    author: {
      name: "Municipal Corporation",
      avatar: "",
      verified: true
    },
    category: "announcement",
    tags: ["WaterSupply", "Maintenance"],
    mentions: [],
    timestamp: "2 hours ago",
    isPinned: true,
    likes: 45,
    dislikes: 3,
    comments: 12,
    city: "mumbai"
  },
  {
    id: "2",
    title: "Severe pothole on MG Road causing accidents",
    content: "There's a dangerous pothole near the bus stop on MG Road that has caused several bike accidents this week. The pothole is about 2 feet wide and very deep. Immediate attention needed!",
    author: {
      name: "Rajesh Kumar",
      avatar: "",
      verified: false
    },
    category: "complaint",
    tags: ["Roads", "Safety", "PotholeIssue"],
    mentions: ["MunicipalCorp"],
    location: "MG Road, near Central Bus Stop",
    media: [{ type: "image", url: "/pothole.jpg" }],
    timestamp: "4 hours ago",
    likes: 28,
    dislikes: 1,
    comments: 8,
    city: "mumbai"
  },
  {
    id: "3",
    title: "Community Cleanup Drive - This Weekend",
    content: "Let's come together to clean our neighborhood park! Bringing gloves, bags, and refreshments. Family-friendly event. Let's make our city cleaner and greener!",
    author: {
      name: "Green Warriors Group",
      avatar: "",
      verified: true
    },
    category: "discussion",
    tags: ["Community", "Environment", "CleanupDrive"],
    mentions: ["EcoFriends", "CityCouncil"],
    location: "Central Park, Sector 8",
    timestamp: "6 hours ago",
    likes: 67,
    dislikes: 0,
    comments: 15,
    city: "mumbai"
  },
  {
    id: "4",
    title: "Street lights not working in residential area",
    content: "Multiple street lights have been out for over a week in Residential Complex B. This is creating safety concerns for residents, especially women and elderly people walking at night.",
    author: {
      name: "Priya Sharma",
      avatar: "",
      verified: false
    },
    category: "complaint",
    tags: ["StreetLights", "Safety", "Electricity"],
    mentions: ["ElectricityBoard"],
    location: "Residential Complex B, Phase 2",
    timestamp: "1 day ago",
    likes: 34,
    dislikes: 0,
    comments: 11,
    city: "mumbai"
  }
];

const Index = () => {
  const [selectedCity, setSelectedCity] = useState("mumbai");
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { toast } = useToast();

  const filteredPosts = posts
    .filter(post => post.city === selectedCity)
    .filter(post => selectedCategory === "all" || post.category === selectedCategory)
    .sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return 0;
    });

  const handleCreatePost = (newPost: Post) => {
    setPosts([newPost, ...posts]);
    toast({
      title: "Post created successfully!",
      description: "Your post has been published to the community.",
    });
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  const handleDislike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, dislikes: post.dislikes + 1 }
        : post
    ));
  };

  const handleComment = (postId: string) => {
    toast({
      title: "Comment feature",
      description: "Comment functionality would open here.",
    });
  };

  const handleReport = (postId: string) => {
    toast({
      title: "Post reported",
      description: "Thank you for reporting. We'll review this post.",
      variant: "destructive"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <ForumHeader
        selectedCity={selectedCity}
        onCityChange={setSelectedCity}
        onCreatePost={() => setShowCreatePost(true)}
      />

      <main className="container py-6">
        {/* Filter Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filter:</span>
            </div>
            <div className="flex gap-2">
              {[
                { key: "all", label: "All Posts", icon: "📋" },
                { key: "announcement", label: "Announcements", icon: "📢" },
                { key: "complaint", label: "Complaints", icon: "⚠️" },
                { key: "discussion", label: "Discussions", icon: "💬" }
              ].map((filter) => (
                <Button
                  key={filter.key}
                  variant={selectedCategory === filter.key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(filter.key)}
                  className="gap-1"
                >
                  <span>{filter.icon}</span>
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TrendingUp className="h-4 w-4" />
            <span>{filteredPosts.length} posts in #{selectedCity}</span>
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Posts Feed */}
        <div className="space-y-6">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🏙️</div>
              <h3 className="text-xl font-semibold mb-2">No posts found</h3>
              <p className="text-muted-foreground mb-4">
                Be the first to start a discussion in #{selectedCity}
              </p>
              <Button onClick={() => setShowCreatePost(true)}>
                Create First Post
              </Button>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onLike={handleLike}
                onDislike={handleDislike}
                onComment={handleComment}
                onReport={handleReport}
              />
            ))
          )}
        </div>

        {/* Trending Tags */}
        <div className="mt-12 p-6 bg-muted/50 rounded-lg">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Trending in #{selectedCity}
          </h3>
          <div className="flex flex-wrap gap-2">
            {["WaterSupply", "Roads", "Safety", "Environment", "Community", "StreetLights"].map((tag) => (
              <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-primary/10">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      </main>

      <PostCreator
        isOpen={showCreatePost}
        onClose={() => setShowCreatePost(false)}
        onSubmit={handleCreatePost}
        selectedCity={selectedCity}
      />
    </div>
  );
};

export default Index;
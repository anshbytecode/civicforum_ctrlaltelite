import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, MapPin, Bell } from "lucide-react";

interface ForumHeaderProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
  onCreatePost: () => void;
}

export function ForumHeader({ selectedCity, onCityChange, onCreatePost }: ForumHeaderProps) {
  const cities = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Pune", "Hyderabad"];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              <MapPin className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-xl font-bold text-foreground">CivicForum</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Select value={selectedCity} onValueChange={onCityChange}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city} value={city.toLowerCase()}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Badge variant="secondary" className="font-medium">
              #{selectedCity}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </Button>
          <Button onClick={onCreatePost} className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
            <PlusCircle className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </div>
      </div>
    </header>
  );
}
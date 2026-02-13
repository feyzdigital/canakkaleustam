"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DISTRICTS } from "@/lib/constants";

interface SearchBarProps {
  variant?: "hero" | "compact";
  className?: string;
}

export function SearchBar({ variant = "compact", className }: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [district, setDistrict] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (district) params.set("ilce", district);
    router.push(`/ustalar?${params.toString()}`);
  }

  if (variant === "hero") {
    return (
      <form
        onSubmit={handleSearch}
        className={`flex flex-col sm:flex-row gap-3 w-full max-w-2xl mx-auto ${className}`}
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Ne arıyorsunuz? (Elektrikçi, Boyacı...)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 h-12 text-base"
          />
        </div>
        <div className="relative sm:w-48">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10 pointer-events-none" />
          <Select value={district} onValueChange={setDistrict}>
            <SelectTrigger className="pl-10 h-12">
              <SelectValue placeholder="Tüm İlçeler" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm İlçeler</SelectItem>
              {DISTRICTS.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" size="lg" className="h-12 px-8">
          <Search className="h-5 w-5 mr-2" />
          Ara
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSearch} className={`flex gap-2 ${className}`}>
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Usta veya hizmet ara..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9"
        />
      </div>
      <Button type="submit" size="sm">
        Ara
      </Button>
    </form>
  );
}

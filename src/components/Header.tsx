import { MessageCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-background px-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          SMS
          <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          <MessageCircle className="mr-2 h-4 w-4" />
          What's new
        </Button>
        
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
          <span className="text-sm text-muted-foreground">Asia/Calcutta</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
            <span className="text-xs font-medium">N</span>
          </div>
          <span className="text-sm font-medium">netcoresalesexp</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span className="text-xs text-muted-foreground">Live</span>
          </div>
        </div>
      </div>
    </header>
  );
}
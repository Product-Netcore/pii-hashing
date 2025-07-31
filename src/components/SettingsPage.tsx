import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Plus, ExternalLink, ChevronDown, Eye, EyeOff } from "lucide-react";
const feedData = [{
  feeds: ["PRODUCT2", "ALRT_Smar...", "SMARTECH...", "test1_prapp...", "SMARTECH...", "Smartech_p...", "+1 others"],
  peId: "58498958949549954"
}, {
  feeds: ["SmartechQ...", "ALRT_1688..."],
  peId: "110173400000028857"
}, {
  feeds: ["intncbizbond"],
  peId: "22222222222222222"
}];
export function SettingsPage() {
  const [selectedEnterprise, setSelectedEnterprise] = useState("All");
  const [selectedFeed, setSelectedFeed] = useState("All");
  const [showPIIDialog, setShowPIIDialog] = useState(false);
  const [showContentDialog, setShowContentDialog] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [isPIIHashingEnabled, setIsPIIHashingEnabled] = useState(false);
  const [isContentStorageEnabled, setIsContentStorageEnabled] = useState(false);
  const [enableAllEnterprises, setEnableAllEnterprises] = useState(true);
  const [enableAllEnterprisesContent, setEnableAllEnterprisesContent] = useState(true);
  const [selectedEnterprises, setSelectedEnterprises] = useState<string[]>([]);
  const [selectedFeeds, setSelectedFeeds] = useState<string[]>([]);
  const [selectedEnterprisesContent, setSelectedEnterprisesContent] = useState<string[]>([]);
  const [selectedFeedsContent, setSelectedFeedsContent] = useState<string[]>([]);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [currentAction, setCurrentAction] = useState<"pii" | "content" | null>(null);
  
  const enterprises = ["Enterprise1", "Enterprise2", "Enterprise3"];
  const feeds = ["PRODUCT2", "SMARTECH", "ALRT_Smart", "test1_prapp", "intncbizbond"];

  const handleEnterpriseToggle = (enterprise: string) => {
    setSelectedEnterprises(prev => 
      prev.includes(enterprise) 
        ? prev.filter(e => e !== enterprise)
        : [...prev, enterprise]
    );
  };

  const handleFeedToggle = (feed: string) => {
    setSelectedFeeds(prev => 
      prev.includes(feed) 
        ? prev.filter(f => f !== feed)
        : [...prev, feed]
    );
  };

  const handleEnterpriseToggleContent = (enterprise: string) => {
    setSelectedEnterprisesContent(prev => 
      prev.includes(enterprise) 
        ? prev.filter(e => e !== enterprise)
        : [...prev, enterprise]
    );
  };

  const handleFeedToggleContent = (feed: string) => {
    setSelectedFeedsContent(prev => 
      prev.includes(feed) 
        ? prev.filter(f => f !== feed)
        : [...prev, feed]
    );
  };
  return <div className="flex-1 overflow-auto">
      <div className="p-8">
        <div className="max-w-6xl">
          <h1 className="text-2xl font-semibold text-foreground mb-8">Settings</h1>
          
          {/* PE ID Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-foreground mb-2">Principal entity ID (PE ID)</h2>
              <p className="text-sm text-muted-foreground max-w-4xl">
                Principle entity ID (PE ID) is a unique 19-digit number assigned to your business after DLT registration in India. 
                It's mandatory for SMS delivery to ensure regulatory compliance and message approval.
              </p>
            </div>

            {/* Filters */}
            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-foreground">Enterprise name:</label>
                <Select value={selectedEnterprise} onValueChange={setSelectedEnterprise}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Enterprise1">Enterprise1</SelectItem>
                    <SelectItem value="Enterprise2">Enterprise2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-foreground">Feed name:</label>
                <Select value={selectedFeed} onValueChange={setSelectedFeed}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="PRODUCT2">PRODUCT2</SelectItem>
                    <SelectItem value="SMARTECH">SMARTECH</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* PE ID Table */}
            <div className="border border-border rounded-lg">
              <div className="grid grid-cols-2 gap-4 p-4 border-b border-border bg-muted/50">
                <div className="text-sm font-medium text-foreground">Feed name</div>
                <div className="text-sm font-medium text-foreground">PE ID</div>
              </div>

              <div className="divide-y divide-border">
                {feedData.map((row, index) => <div key={index} className="grid grid-cols-2 gap-4 p-4">
                    <div className="flex flex-wrap gap-2">
                      {row.feeds.map((feed, feedIndex) => <Badge key={feedIndex} variant="pill" className="text-xs">
                          {feed}
                        </Badge>)}
                    </div>
                    <div className="text-sm text-foreground font-mono">
                      {row.peId}
                    </div>
                  </div>)}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button variant="outline" size="sm">
                <Edit className="mr-2 h-4 w-4" />
                EDIT
              </Button>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                ADD NEW PE ID
              </Button>
          </div>

          {/* PII Hashing Section */}
          <div className="mt-12 space-y-6">
            {/* PII Hashing - Mobile Number */}
            <div className="p-6 border border-border rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-foreground mb-2">PII Hashing-Mobile Number</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {isPIIHashingEnabled 
                      ? "PII Hashing is enabled for all Enterprises on the panel."
                      : "Enhanced protection of customer privacy with hashing customer's numbers."
                    }
                  </p>
                  {isPIIHashingEnabled && (
                    <div className="mt-3">
                      <h4 className="text-sm font-medium text-foreground mb-2">Enabled for:</h4>
                      <div className="flex flex-wrap gap-2">
                        {enableAllEnterprises ? (
                          <Badge variant="default" className="text-xs">All Enterprises</Badge>
                        ) : (
                          <>
                            {selectedEnterprises.map(enterprise => (
                              <Badge key={enterprise} variant="secondary" className="text-xs">{enterprise}</Badge>
                            ))}
                            {selectedFeeds.map(feed => (
                              <Badge key={feed} variant="outline" className="text-xs">{feed}</Badge>
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  {isPIIHashingEnabled && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="min-w-[80px] bg-white text-blue-600 border-blue-600 hover:bg-blue-50"
                      onClick={() => setShowPIIDialog(true)}
                    >
                      <Edit className="mr-1 h-3 w-3" />
                      EDIT
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    className="min-w-[80px] bg-blue-600 text-white hover:bg-blue-700" 
                    variant={isPIIHashingEnabled ? "default" : "default"}
                    onClick={() => isPIIHashingEnabled ? setIsPIIHashingEnabled(false) : setShowPIIDialog(true)}
                  >
                    {isPIIHashingEnabled ? "DISABLE" : "ENABLE"}
                  </Button>
                </div>
              </div>
            </div>

            {/* PII Hashing - Message Content */}
            <div className="p-6 border border-border rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-foreground mb-2">Message content storage</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {isContentStorageEnabled 
                      ? "Message content storage is disabled for all Enterprises on the panel."
                      : "Enhanced protection of customer privacy with disabling storage of user wise message content."
                    }
                  </p>
                  {isContentStorageEnabled && (
                    <div className="mt-3">
                      <h4 className="text-sm font-medium text-foreground mb-2">Disabled for:</h4>
                      <div className="flex flex-wrap gap-2">
                        {enableAllEnterprisesContent ? (
                          <Badge variant="default" className="text-xs bg-blue-500 text-white">All Enterprises</Badge>
                        ) : (
                          <>
                            {selectedEnterprisesContent.map(enterprise => (
                              <Badge key={enterprise} variant="secondary" className="text-xs bg-blue-500 text-white">{enterprise}</Badge>
                            ))}
                            {selectedFeedsContent.map(feed => (
                              <Badge key={feed} variant="outline" className="text-xs bg-blue-500 text-white border-blue-500">{feed}</Badge>
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  {isContentStorageEnabled && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="min-w-[80px] bg-white text-blue-600 border-blue-600 hover:bg-blue-50"
                      onClick={() => setShowContentDialog(true)}
                    >
                      <Edit className="mr-1 h-3 w-3" />
                      EDIT
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    className="min-w-[80px] bg-blue-600 text-white hover:bg-blue-700"
                    variant={isContentStorageEnabled ? "default" : "default"}
                    onClick={() => isContentStorageEnabled ? setIsContentStorageEnabled(false) : setShowContentDialog(true)}
                  >
                    {isContentStorageEnabled ? "ENABLE" : "DISABLE"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          </div>

          {/* User Management Section */}
          <div className="mt-12 space-y-4">
            <div>
              <h2 className="text-lg font-medium text-foreground">User management</h2>
              <p className="text-sm text-muted-foreground">
                Manage users and their access to the system.
              </p>
            </div>

            <Button variant="outline" size="sm">
              <ExternalLink className="mr-2 h-4 w-4" />
              GO TO USER MANAGEMENT
            </Button>
          </div>
        </div>
      </div>

      {/* Chat Widget */}
      <div className="fixed bottom-4 right-4">
        <Button className="rounded-lg px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90">
          Question? Chat with us.
        </Button>
      </div>

      {/* PII Hashing Dialog */}
      <Dialog open={showPIIDialog} onOpenChange={setShowPIIDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="sr-only">Enable PII Hashing</DialogTitle>
          </DialogHeader>
          
          <div className="text-center space-y-6">
            {/* Illustration */}
            <div className="w-24 h-24 mx-auto bg-blue-50 rounded-full flex items-center justify-center">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                <div className="w-8 h-8 bg-primary rounded opacity-80"></div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Please note</h3>
              <div className="text-left space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-muted-foreground">
                    Once hashing is activated, the data cannot be decrypted to the original value.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-muted-foreground">
                    Hashing is only applicable to the data which is received post activating of hashing.
                  </p>
                </div>
              </div>
            </div>

            {/* Checkbox for all enterprises */}
            <div className="flex items-start space-x-2 text-left">
              <Checkbox 
                id="enable-all" 
                checked={enableAllEnterprises}
                onCheckedChange={(checked) => setEnableAllEnterprises(checked as boolean)}
              />
              <label htmlFor="enable-all" className="text-sm text-foreground">
                PII Hashing will be enabled on all the Enterprises on this panel
              </label>
            </div>

            {/* Conditional dropdowns */}
            {!enableAllEnterprises && (
              <div className="space-y-4">
                <div className="text-left">
                  <label className="text-sm font-medium text-foreground mb-2 block">Select Enterprises:</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-between">
                        {selectedEnterprises.length > 0 
                          ? `${selectedEnterprises.length} enterprise(s) selected`
                          : "Select enterprises..."
                        }
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0 z-50 bg-popover" align="start">
                      <div className="p-2">
                        {enterprises.map((enterprise) => (
                          <div key={enterprise} className="flex items-center space-x-2 p-2 hover:bg-accent rounded">
                            <Checkbox 
                              id={`enterprise-${enterprise}`}
                              checked={selectedEnterprises.includes(enterprise)}
                              onCheckedChange={() => handleEnterpriseToggle(enterprise)}
                            />
                            <label 
                              htmlFor={`enterprise-${enterprise}`} 
                              className="text-sm cursor-pointer flex-1"
                            >
                              {enterprise}
                            </label>
                          </div>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="text-left">
                  <label className="text-sm font-medium text-foreground mb-2 block">Select Feeds:</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-between">
                        {selectedFeeds.length > 0 
                          ? `${selectedFeeds.length} feed(s) selected`
                          : "Select feeds..."
                        }
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0 z-50 bg-popover" align="start">
                      <div className="p-2">
                        {feeds.map((feed) => (
                          <div key={feed} className="flex items-center space-x-2 p-2 hover:bg-accent rounded">
                            <Checkbox 
                              id={`feed-${feed}`}
                              checked={selectedFeeds.includes(feed)}
                              onCheckedChange={() => handleFeedToggle(feed)}
                            />
                            <label 
                              htmlFor={`feed-${feed}`} 
                              className="text-sm cursor-pointer flex-1"
                            >
                              {feed}
                            </label>
                          </div>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="gap-3">
            <Button variant="outline" onClick={() => setShowPIIDialog(false)}>
              CANCEL
            </Button>
            <Button onClick={() => {
              setShowPIIDialog(false);
              setCurrentAction("pii");
              setShowAuthDialog(true);
            }}>
              ENABLE HASHING
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Content Storage Dialog */}
      <Dialog open={showContentDialog} onOpenChange={setShowContentDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="sr-only">Disable Message Content Storage</DialogTitle>
          </DialogHeader>
          
          <div className="text-center space-y-6">
            {/* Illustration */}
            <div className="w-24 h-24 mx-auto bg-blue-50 rounded-full flex items-center justify-center">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                <div className="w-8 h-8 bg-primary rounded opacity-80"></div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Please note</h3>
              <div className="text-left space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-muted-foreground">
                    Once content storage is disabled, message content will not be stored.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-muted-foreground">
                    This setting is only applicable to the data which is received post activation.
                  </p>
                </div>
              </div>
            </div>

            {/* Checkbox for all enterprises */}
            <div className="flex items-start space-x-2 text-left">
              <Checkbox 
                id="enable-all-content" 
                checked={enableAllEnterprisesContent}
                onCheckedChange={(checked) => setEnableAllEnterprisesContent(checked as boolean)}
              />
              <label htmlFor="enable-all-content" className="text-sm text-foreground">
                Content storage will be disabled on all the Enterprises on this panel
              </label>
            </div>

            {/* Conditional dropdowns */}
            {!enableAllEnterprisesContent && (
              <div className="space-y-4">
                <div className="text-left">
                  <label className="text-sm font-medium text-foreground mb-2 block">Select Enterprises:</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-between">
                        {selectedEnterprisesContent.length > 0 
                          ? `${selectedEnterprisesContent.length} enterprise(s) selected`
                          : "Select enterprises..."
                        }
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0 z-50 bg-popover" align="start">
                      <div className="p-2">
                        {enterprises.map((enterprise) => (
                          <div key={enterprise} className="flex items-center space-x-2 p-2 hover:bg-accent rounded">
                            <Checkbox 
                              id={`enterprise-content-${enterprise}`}
                              checked={selectedEnterprisesContent.includes(enterprise)}
                              onCheckedChange={() => handleEnterpriseToggleContent(enterprise)}
                            />
                            <label 
                              htmlFor={`enterprise-content-${enterprise}`} 
                              className="text-sm cursor-pointer flex-1"
                            >
                              {enterprise}
                            </label>
                          </div>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="text-left">
                  <label className="text-sm font-medium text-foreground mb-2 block">Select Feeds:</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-between">
                        {selectedFeedsContent.length > 0 
                          ? `${selectedFeedsContent.length} feed(s) selected`
                          : "Select feeds..."
                        }
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0 z-50 bg-popover" align="start">
                      <div className="p-2">
                        {feeds.map((feed) => (
                          <div key={feed} className="flex items-center space-x-2 p-2 hover:bg-accent rounded">
                            <Checkbox 
                              id={`feed-content-${feed}`}
                              checked={selectedFeedsContent.includes(feed)}
                              onCheckedChange={() => handleFeedToggleContent(feed)}
                            />
                            <label 
                              htmlFor={`feed-content-${feed}`} 
                              className="text-sm cursor-pointer flex-1"
                            >
                              {feed}
                            </label>
                          </div>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="gap-3">
            <Button variant="outline" onClick={() => setShowContentDialog(false)}>
              CANCEL
            </Button>
            <Button onClick={() => {
              setShowContentDialog(false);
              setCurrentAction("content");
              setShowAuthDialog(true);
            }}>
              DISABLE
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Authorization Dialog */}
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="sr-only">Authorization Required</DialogTitle>
          </DialogHeader>
          
          <div className="text-center space-y-6">
            {/* Illustration */}
            <div className="w-24 h-24 mx-auto bg-blue-50 rounded-full flex items-center justify-center">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                <div className="relative">
                  <div className="w-8 h-5 bg-white rounded border-2 border-primary/60"></div>
                  <div className="absolute top-1 left-1 w-1 h-1 bg-primary rounded-full"></div>
                  <div className="absolute top-1 right-1 w-1 h-1 bg-primary rounded-full"></div>
                  <div className="absolute -top-1 left-2 w-4 h-2 bg-blue-400 rounded-t transform -rotate-12"></div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Authorization required</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Hey, before enabling / disabling encryption feature, we need to re-verify that you have access to this account. Please enter your account password to confirm.
              </p>
            </div>

            {/* Password Input */}
            <div className="text-left space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-primary">
                Password *
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                  placeholder="Enter your password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-3">
            <Button variant="outline" onClick={() => {
              setShowAuthDialog(false);
              setPassword("");
              setShowPassword(false);
            }}>
              CANCEL
            </Button>
            <Button onClick={() => {
              setShowAuthDialog(false);
              if (currentAction === "pii") {
                setIsPIIHashingEnabled(true);
              } else if (currentAction === "content") {
                setIsContentStorageEnabled(true);
              }
              setPassword("");
              setShowPassword(false);
              setCurrentAction(null);
            }}>
              AUTHORIZE
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>;
}
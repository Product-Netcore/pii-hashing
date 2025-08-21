import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Plus, ExternalLink, ChevronDown, Eye, EyeOff, Search } from "lucide-react";
import { ConfirmationIllustration } from "@/components/illustrations/Confirmation";

const feeds = ["PRODUCT2", "SMARTECH", "ALRT_Smart", "test1_prapp", "intncbizbond", "BILLING_FEED", "NOTIFICATION_FEED", "MARKETING_FEED", "SUPPORT_FEED", "ANALYTICS_FEED", "WEBHOOK_FEED", "PAYMENT_FEED", "USER_REGISTRATION", "PASSWORD_RESET", "ORDER_CONFIRMATION", "SHIPPING_UPDATE", "DELIVERY_NOTIFICATION", "PAYMENT_SUCCESS", "PAYMENT_FAILED", "SUBSCRIPTION_RENEWAL", "TRIAL_EXPIRED", "ACCOUNT_SUSPENDED", "SECURITY_ALERT", "LOGIN_VERIFICATION", "WELCOME_MESSAGE", "GOODBYE_MESSAGE", "PROMOTIONAL_OFFER", "DISCOUNT_CODE", "FLASH_SALE", "INVENTORY_LOW", "BACK_IN_STOCK", "PRICE_DROP", "WISHLIST_ALERT", "CART_ABANDONMENT", "REVIEW_REQUEST", "FEEDBACK_SURVEY", "EVENT_REMINDER", "APPOINTMENT_BOOKING", "APPOINTMENT_CONFIRMATION", "APPOINTMENT_REMINDER", "APPOINTMENT_CANCELLATION", "BOOKING_SUCCESS", "BOOKING_FAILED", "REFUND_PROCESSED", "RETURN_INITIATED", "EXCHANGE_REQUEST", "WARRANTY_EXPIRY", "SERVICE_REMINDER", "MAINTENANCE_ALERT", "SYSTEM_UPDATE", "FEATURE_ANNOUNCEMENT", "DOWNTIME_NOTICE", "PERFORMANCE_ALERT", "BACKUP_COMPLETE", "BACKUP_FAILED", "DATA_EXPORT", "DATA_IMPORT", "SYNC_COMPLETE", "SYNC_FAILED", "API_LIMIT_REACHED", "QUOTA_EXCEEDED", "USAGE_WARNING", "BILLING_CYCLE", "INVOICE_GENERATED", "PAYMENT_DUE", "LATE_PAYMENT", "CREDIT_ALERT", "BALANCE_LOW", "TRANSACTION_ALERT", "FRAUD_DETECTION", "SUSPICIOUS_ACTIVITY", "COMPLIANCE_ALERT", "AUDIT_REMINDER", "REPORT_READY", "EXPORT_COMPLETE", "IMPORT_COMPLETE", "BATCH_PROCESSED", "QUEUE_PROCESSED", "JOB_COMPLETE", "JOB_FAILED", "TASK_ASSIGNED", "TASK_COMPLETED", "PROJECT_UPDATE", "MILESTONE_REACHED", "DEADLINE_REMINDER", "OVERDUE_NOTICE", "PRIORITY_ALERT", "ESCALATION_NOTICE", "APPROVAL_REQUEST", "APPROVAL_GRANTED", "APPROVAL_DENIED", "WORKFLOW_COMPLETE", "STATUS_CHANGE", "PROFILE_UPDATE", "SETTINGS_CHANGED", "PREFERENCES_SAVED", "NOTIFICATION_ENABLED", "NOTIFICATION_DISABLED", "SUBSCRIPTION_CREATED", "SUBSCRIPTION_UPDATED", "SUBSCRIPTION_CANCELLED", "PLAN_UPGRADE", "PLAN_DOWNGRADE", "FEATURE_ENABLED", "FEATURE_DISABLED", "ACCESS_GRANTED", "ACCESS_REVOKED", "PERMISSION_CHANGED", "ROLE_ASSIGNED", "ROLE_REMOVED", "TEAM_INVITATION", "TEAM_JOINED", "TEAM_LEFT", "COLLABORATION_REQUEST", "SHARED_DOCUMENT", "COMMENT_ADDED", "MENTION_NOTIFICATION", "LIKE_NOTIFICATION", "FOLLOW_REQUEST", "FOLLOWER_UPDATE", "CONNECTION_REQUEST", "MESSAGE_RECEIVED", "CHAT_INVITATION", "VIDEO_CALL", "VOICE_CALL", "MEETING_SCHEDULED", "MEETING_REMINDER", "MEETING_STARTED", "MEETING_ENDED", "RECORDING_AVAILABLE", "TRANSCRIPT_READY", "FILE_UPLOADED", "FILE_SHARED", "FILE_DOWNLOADED", "FOLDER_CREATED", "STORAGE_FULL", "SYNC_ERROR"];
const feedData = [{
  feeds: ["PRODUCT2", "ALRT_Smar...", "SMARTECH...", "test1_prapp...", "SMARTECH...", "Smartech_p...", "+95 more"],
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
  const [showPIINoteDialog, setShowPIINoteDialog] = useState(false);
  const [showPIIScopeDialog, setShowPIIScopeDialog] = useState(false);
  const [showContentDialog, setShowContentDialog] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [isPIIHashingEnabled, setIsPIIHashingEnabled] = useState(false);
  const [isContentStorageEnabled, setIsContentStorageEnabled] = useState(false);
  const [enableAllEnterprises, setEnableAllEnterprises] = useState(true);
  const [enableAllEnterprisesContent, setEnableAllEnterprisesContent] = useState(true);
  const [selectedEnterprises, setSelectedEnterprises] = useState<string[]>([]);
  const [selectedFeeds, setSelectedFeeds] = useState<string[]>(feeds.slice(0, 100));
  const [selectedEnterprisesContent, setSelectedEnterprisesContent] = useState<string[]>([]);
  const [selectedFeedsContent, setSelectedFeedsContent] = useState<string[]>([]);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [currentAction, setCurrentAction] = useState<"pii" | "content" | null>(null);
  const [feedSearchQuery, setFeedSearchQuery] = useState("");
  const [contentFeedSearchQuery, setContentFeedSearchQuery] = useState("");
  const [enterpriseSearchQuery, setEnterpriseSearchQuery] = useState("");
  const [contentEnterpriseSearchQuery, setContentEnterpriseSearchQuery] = useState("");
  // Single source of truth for PII scope
  const [piiScope, setPiiScope] = useState<{ mode: 'all' | 'selected'; enterprises: string[]; feeds: string[] }>({ 
    mode: 'all', 
    enterprises: [], 
    feeds: [] 
  });
  const enterprises = ["Enterprise1", "Enterprise2", "Enterprise3"];

  const handleEnterpriseToggle = (enterprise: string) => {
    setSelectedEnterprises(prev => prev.includes(enterprise) ? prev.filter(e => e !== enterprise) : [...prev, enterprise]);
  };

  const handleFeedToggle = (feed: string) => {
    setSelectedFeeds(prev => prev.includes(feed) ? prev.filter(f => f !== feed) : [...prev, feed]);
  };

  const handleEnterpriseToggleContent = (enterprise: string) => {
    setSelectedEnterprisesContent(prev => prev.includes(enterprise) ? prev.filter(e => e !== enterprise) : [...prev, enterprise]);
  };

  const handleFeedToggleContent = (feed: string) => {
    setSelectedFeedsContent(prev => prev.includes(feed) ? prev.filter(f => f !== feed) : [...prev, feed]);
  };

  const handleSelectAllEnterprises = (checked: boolean) => {
    setSelectedEnterprises(checked ? [...enterprises] : []);
  };

  const handleSelectAllFeeds = (checked: boolean) => {
    setSelectedFeeds(checked ? [...feeds] : []);
  };

  const handleSelectAllEnterprisesContent = (checked: boolean) => {
    setSelectedEnterprisesContent(checked ? [...enterprises] : []);
  };

  const handleSelectAllFeedsContent = (checked: boolean) => {
    setSelectedFeedsContent(checked ? [...feeds] : []);
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
                    {row.feeds.map((feed, feedIndex) => {
                      if (feed.startsWith("+") && feed.includes("more")) {
                        return (
                          <Popover key={feedIndex}>
                            <PopoverTrigger asChild>
                              <button 
                                type="button"
                                className="text-xs hover:no-underline cursor-pointer"
                                style={{ color: '#143F93' }}
                              >
                                {feed}
                              </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 z-50 bg-background border border-border shadow-md">
                              <div className="space-y-2">
                                <h4 className="text-sm font-medium">Additional feeds</h4>
                                <div className="max-h-48 overflow-y-auto">
                                  <div className="flex flex-wrap gap-2">
                                    {feeds.slice(6, 24).map(f => (
                                      <Badge key={f} variant="outline" className="text-xs">{f}</Badge>
                                    ))}
                                  </div>
                                  <div className="text-xs text-muted-foreground mt-2">+95 others not shown</div>
                                </div>
                              </div>
                            </PopoverContent>
                          </Popover>
                        );
                      }
                      return (
                        <Badge key={feedIndex} variant="pill" className="text-xs">
                          {feed}
                        </Badge>
                      );
                    })}
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
                    {isPIIHashingEnabled ? 
                      (piiScope.mode === 'all' ? "PII Hashing is enabled for all Enterprises on the panel." : "PII Hashing is enabled for selected Enterprises and feeds.") 
                      : "Enhance protection of customer privacy with hashing customer's numbers."}
                  </p>
                  {isPIIHashingEnabled && <div className="mt-3">
                      <h4 className="text-sm font-medium text-foreground mb-2">Enabled for:</h4>
                      {piiScope.mode === 'all' ? (
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="text-xs">All enterprises</Badge>
                          <Badge variant="outline" className="text-xs">All feeds</Badge>
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {piiScope.feeds.slice(0, 5).map(feed => <Badge key={feed} variant="outline" className="text-xs">{feed}</Badge>)}
                          {piiScope.feeds.length > 5 && <Popover>
                              <PopoverTrigger asChild>
                                <button 
                                  type="button"
                                  className="text-xs font-semibold hover:no-underline cursor-pointer"
                                  style={{ color: '#143F93' }}
                                >
                                  +{piiScope.feeds.length - 5} more
                                </button>
                              </PopoverTrigger>
                              <PopoverContent className="w-96 z-50 bg-background border border-border shadow-md">
                                <div className="space-y-3">
                                  <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-medium">Selected Feeds</h4>
                                    <Badge variant="secondary" className="text-xs">
                                      {piiScope.feeds.length} total
                                    </Badge>
                                  </div>
                                  
                                  {piiScope.feeds.length > 10 && <div className="relative">
                                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                      <Input placeholder="Search feeds..." value={feedSearchQuery} onChange={e => setFeedSearchQuery(e.target.value)} className="pl-10 h-8 text-sm" />
                                    </div>}
                                  
                                  <div className="max-h-60 overflow-y-auto">
                                    <div className="flex flex-wrap gap-2">
                                      {(feedSearchQuery ? piiScope.feeds.filter(feed => feed.toLowerCase().includes(feedSearchQuery.toLowerCase())) : piiScope.feeds).map(feed => <Badge key={feed} variant="outline" className="text-xs">
                                          {feed}
                                        </Badge>)}
                                    </div>
                                    
                                    {feedSearchQuery && piiScope.feeds.filter(feed => feed.toLowerCase().includes(feedSearchQuery.toLowerCase())).length === 0 && <div className="text-center py-4 text-sm text-muted-foreground">
                                        No feeds found matching "{feedSearchQuery}"
                                      </div>}
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>}
                        </div>
                      )}
                    </div>}
                </div>
                <div className="flex gap-2 ml-4">
                  {isPIIHashingEnabled && <Button size="sm" className="min-w-[80px] bg-blue-600 text-white hover:bg-blue-700" onClick={() => setShowPIIScopeDialog(true)}>
                      <Edit className="mr-1 h-3 w-3" />
                      EDIT
                    </Button>}
                  <Button size="sm" variant="outline" className={`min-w-[80px] ${isPIIHashingEnabled ? 'bg-white text-blue-600 border-blue-600 hover:bg-blue-50' : 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'}`} onClick={() => isPIIHashingEnabled ? setIsPIIHashingEnabled(false) : setShowPIINoteDialog(true)}>
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
                    {isContentStorageEnabled ? "Message content storage is disabled for all Enterprises on the panel." : "Enhanced protection of customer privacy with disabling storage of user wise message content."}
                  </p>
                  {isContentStorageEnabled && !enableAllEnterprisesContent && <div className="mt-3">
                      <h4 className="text-sm font-medium text-foreground mb-2">Disabled for:</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedFeedsContent.slice(0, 5).map(feed => <Badge key={feed} variant="outline" className="text-xs bg-blue-500 text-white border-blue-500">{feed}</Badge>)}
                        {selectedFeedsContent.length > 5 && <Popover>
                            <PopoverTrigger asChild>
                              <button className="inline-flex">
                                <Badge variant="secondary" className="text-xs bg-blue-400 text-white cursor-pointer hover:bg-blue-300">
                                  +{selectedFeedsContent.length - 5} more
                                </Badge>
                              </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-96">
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <h4 className="text-sm font-medium">Selected Feeds</h4>
                                  <Badge variant="secondary" className="text-xs">
                                    {selectedFeedsContent.length} total
                                  </Badge>
                                </div>
                                
                                {selectedFeedsContent.length > 10 && <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input placeholder="Search feeds..." value={contentFeedSearchQuery} onChange={e => setContentFeedSearchQuery(e.target.value)} className="pl-10 h-8 text-sm" />
                                  </div>}
                                
                                <div className="max-h-60 overflow-y-auto">
                                  <div className="flex flex-wrap gap-2">
                                    {(contentFeedSearchQuery ? selectedFeedsContent.filter(feed => feed.toLowerCase().includes(contentFeedSearchQuery.toLowerCase())) : selectedFeedsContent).map(feed => <Badge key={feed} variant="outline" className="text-xs bg-blue-500 text-white border-blue-500">
                                        {feed}
                                      </Badge>)}
                                  </div>
                                  
                                  {contentFeedSearchQuery && selectedFeedsContent.filter(feed => feed.toLowerCase().includes(contentFeedSearchQuery.toLowerCase())).length === 0 && <div className="text-center py-4 text-sm text-muted-foreground">
                                      No feeds found matching "{contentFeedSearchQuery}"
                                    </div>}
                                </div>
                              </div>
                            </PopoverContent>
                          </Popover>}
                      </div>
                    </div>}
                </div>
                <div className="flex gap-2 ml-4">
                  {isContentStorageEnabled && <Button size="sm" className="min-w-[80px] bg-blue-600 text-white hover:bg-blue-700" onClick={() => setShowContentDialog(true)}>
                      <Edit className="mr-1 h-3 w-3" />
                      EDIT
                    </Button>}
                  <Button size="sm" variant="outline" className={`min-w-[80px] ${isContentStorageEnabled ? 'bg-white text-blue-600 border-blue-600 hover:bg-blue-50' : 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'}`} onClick={() => isContentStorageEnabled ? setIsContentStorageEnabled(false) : setShowContentDialog(true)}>
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

      {/* PII Hashing Note Dialog */}
      <Dialog open={showPIINoteDialog} onOpenChange={setShowPIINoteDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="sr-only">PII Hashing Notes</DialogTitle>
          </DialogHeader>
          
          <div className="text-center space-y-6">
            {/* Illustration */}
            <ConfirmationIllustration className="mx-auto" />

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
          </div>

          <DialogFooter className="gap-3">
            <Button variant="outline" onClick={() => setShowPIINoteDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
            setShowPIINoteDialog(false);
            setShowPIIScopeDialog(true);
          }}>Next</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* PII Hashing Scope Dialog */}
      <Dialog open={showPIIScopeDialog} onOpenChange={setShowPIIScopeDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="sr-only">Select Enterprises and Feeds</DialogTitle>
          </DialogHeader>
          
          <div className="text-center space-y-6">
            {/* Illustration */}
            <ConfirmationIllustration className="mx-auto" />

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Choose where hashing applies</h3>
            </div>

            {/* Enterprise and Feed selection */}
            <div className="space-y-4">
              <div className="text-left">
                <label className="text-sm font-medium text-foreground mb-2 block">Select Enterprises:</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      {selectedEnterprises.length > 0 ? `${selectedEnterprises.length} enterprise(s) selected` : "Select enterprises..."}
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0 z-50 bg-popover" align="start">
                    <div className="p-2">
                      <div className="relative mb-2">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search enterprises..."
                          value={enterpriseSearchQuery}
                          onChange={(e) => setEnterpriseSearchQuery(e.target.value)}
                          className="pl-10 h-8 text-sm"
                        />
                      </div>
                      <div className="flex items-center space-x-2 p-2 border-b border-border mb-1">
                        <Checkbox id="select-all-enterprises" checked={selectedEnterprises.length === enterprises.length} onCheckedChange={handleSelectAllEnterprises} />
                        <label htmlFor="select-all-enterprises" className="text-sm font-medium cursor-pointer flex-1">
                          Select All
                        </label>
                      </div>
                      <div className="max-h-60 overflow-y-auto">
                        {enterprises.filter(enterprise => 
                          enterprise.toLowerCase().includes(enterpriseSearchQuery.toLowerCase())
                        ).map(enterprise => <div key={enterprise} className="flex items-center space-x-2 p-2 hover:bg-accent rounded">
                            <Checkbox id={`enterprise-${enterprise}`} checked={selectedEnterprises.includes(enterprise)} onCheckedChange={() => handleEnterpriseToggle(enterprise)} />
                            <label htmlFor={`enterprise-${enterprise}`} className="text-sm cursor-pointer flex-1">
                              {enterprise}
                            </label>
                          </div>)}
                        {enterpriseSearchQuery && enterprises.filter(enterprise => 
                          enterprise.toLowerCase().includes(enterpriseSearchQuery.toLowerCase())
                        ).length === 0 && (
                          <div className="text-center py-4 text-sm text-muted-foreground">
                            No enterprises found matching "{enterpriseSearchQuery}"
                          </div>
                        )}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="text-left">
                <label className="text-sm font-medium text-foreground mb-2 block">Select Feeds:</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      {selectedFeeds.length > 0 ? `${selectedFeeds.length} feed(s) selected` : "Select feeds..."}
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0 z-50 bg-popover" align="start">
                    <div className="p-2">
                      <div className="relative mb-2">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search feeds..."
                          value={feedSearchQuery}
                          onChange={(e) => setFeedSearchQuery(e.target.value)}
                          className="pl-10 h-8 text-sm"
                        />
                      </div>
                      <div className="flex items-center space-x-2 p-2 border-b border-border mb-1">
                        <Checkbox id="select-all-feeds" checked={selectedFeeds.length === feeds.length} onCheckedChange={handleSelectAllFeeds} />
                        <label htmlFor="select-all-feeds" className="text-sm font-medium cursor-pointer flex-1">
                          Select All
                        </label>
                      </div>
                      <div className="max-h-60 overflow-y-auto">
                        {feeds.filter(feed => 
                          feed.toLowerCase().includes(feedSearchQuery.toLowerCase())
                        ).map(feed => <div key={feed} className="flex items-center space-x-2 p-2 hover:bg-accent rounded">
                            <Checkbox id={`feed-${feed}`} checked={selectedFeeds.includes(feed)} onCheckedChange={() => handleFeedToggle(feed)} />
                            <label htmlFor={`feed-${feed}`} className="text-sm cursor-pointer flex-1">
                              {feed}
                            </label>
                          </div>)}
                        {feedSearchQuery && feeds.filter(feed => 
                          feed.toLowerCase().includes(feedSearchQuery.toLowerCase())
                        ).length === 0 && (
                          <div className="text-center py-4 text-sm text-muted-foreground">
                            No feeds found matching "{feedSearchQuery}"
                          </div>
                        )}
                      </div>
                    </div>
                  </PopoverContent>
                 </Popover>
               </div>
             </div>
           </div>

           <DialogFooter className="gap-3">
            
            <Button variant="outline" onClick={() => setShowPIIScopeDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
            setShowPIIScopeDialog(false);
            setCurrentAction("pii");
            setShowAuthDialog(true);
          }}>Next</Button>
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
              <Checkbox id="enable-all-content" checked={enableAllEnterprisesContent} onCheckedChange={checked => setEnableAllEnterprisesContent(checked as boolean)} />
              <label htmlFor="enable-all-content" className="text-sm text-foreground">
                Content storage will be disabled on all the Enterprises on this panel
              </label>
            </div>

            {/* Conditional dropdowns */}
            {!enableAllEnterprisesContent && <div className="space-y-4">
                <div className="text-left">
                  <label className="text-sm font-medium text-foreground mb-2 block">Select Enterprises:</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-between">
                        {selectedEnterprisesContent.length > 0 ? `${selectedEnterprisesContent.length} enterprise(s) selected` : "Select enterprises..."}
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0 z-50 bg-popover" align="start">
                      <div className="p-2">
                        <div className="relative mb-2">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search enterprises..."
                            value={contentEnterpriseSearchQuery}
                            onChange={(e) => setContentEnterpriseSearchQuery(e.target.value)}
                            className="pl-10 h-8 text-sm"
                          />
                        </div>
                        <div className="flex items-center space-x-2 p-2 border-b border-border mb-1">
                          <Checkbox id="select-all-enterprises-content" checked={selectedEnterprisesContent.length === enterprises.length} onCheckedChange={handleSelectAllEnterprisesContent} />
                          <label htmlFor="select-all-enterprises-content" className="text-sm font-medium cursor-pointer flex-1">
                            Select All
                          </label>
                        </div>
                        <div className="max-h-60 overflow-y-auto">
                          {enterprises.filter(enterprise => 
                            enterprise.toLowerCase().includes(contentEnterpriseSearchQuery.toLowerCase())
                          ).map(enterprise => <div key={enterprise} className="flex items-center space-x-2 p-2 hover:bg-accent rounded">
                              <Checkbox id={`enterprise-content-${enterprise}`} checked={selectedEnterprisesContent.includes(enterprise)} onCheckedChange={() => handleEnterpriseToggleContent(enterprise)} />
                              <label htmlFor={`enterprise-content-${enterprise}`} className="text-sm cursor-pointer flex-1">
                                {enterprise}
                              </label>
                            </div>)}
                          {contentEnterpriseSearchQuery && enterprises.filter(enterprise => 
                            enterprise.toLowerCase().includes(contentEnterpriseSearchQuery.toLowerCase())
                          ).length === 0 && (
                            <div className="text-center py-4 text-sm text-muted-foreground">
                              No enterprises found matching "{contentEnterpriseSearchQuery}"
                            </div>
                          )}
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="text-left">
                  <label className="text-sm font-medium text-foreground mb-2 block">Select Feeds:</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-between">
                        {selectedFeedsContent.length > 0 ? `${selectedFeedsContent.length} feed(s) selected` : "Select feeds..."}
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0 z-50 bg-popover" align="start">
                      <div className="p-2">
                        <div className="relative mb-2">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search feeds..."
                            value={contentFeedSearchQuery}
                            onChange={(e) => setContentFeedSearchQuery(e.target.value)}
                            className="pl-10 h-8 text-sm"
                          />
                        </div>
                        <div className="flex items-center space-x-2 p-2 border-b border-border mb-1">
                          <Checkbox id="select-all-feeds-content" checked={selectedFeedsContent.length === feeds.length} onCheckedChange={handleSelectAllFeedsContent} />
                          <label htmlFor="select-all-feeds-content" className="text-sm font-medium cursor-pointer flex-1">
                            Select All
                          </label>
                        </div>
                        <div className="max-h-60 overflow-y-auto">
                          {feeds.filter(feed => 
                            feed.toLowerCase().includes(contentFeedSearchQuery.toLowerCase())
                          ).map(feed => <div key={feed} className="flex items-center space-x-2 p-2 hover:bg-accent rounded">
                              <Checkbox id={`feed-content-${feed}`} checked={selectedFeedsContent.includes(feed)} onCheckedChange={() => handleFeedToggleContent(feed)} />
                              <label htmlFor={`feed-content-${feed}`} className="text-sm cursor-pointer flex-1">
                                {feed}
                              </label>
                            </div>)}
                          {contentFeedSearchQuery && feeds.filter(feed => 
                            feed.toLowerCase().includes(contentFeedSearchQuery.toLowerCase())
                          ).length === 0 && (
                            <div className="text-center py-4 text-sm text-muted-foreground">
                              No feeds found matching "{contentFeedSearchQuery}"
                            </div>
                          )}
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>}
          </div>

          <DialogFooter className="gap-3">
            <Button variant="outline" onClick={() => setShowContentDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
            setShowContentDialog(false);
            setCurrentAction("content");
            setShowAuthDialog(true);
          }}>
              Disable
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Authorization Dialog */}
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="sr-only">Verify & enable hashing</DialogTitle>
          </DialogHeader>
          
          <div className="text-center space-y-6">
            {/* Illustration */}
            <div className="mx-auto">
              <img
                src="/lovable-uploads/924c767e-c699-40d3-a22c-f106977496dc.png"
                alt=""
                width={244}
                height={190}
                className="mx-auto object-contain"
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Verify & enable hashing</h3>
              <p className="text-sm text-muted-foreground mb-6">
                To confirm please, verify your account. Hashing will be applied to selected enterprises and feed IDs on this panel.
              </p>
            </div>

            {/* Password Input */}
            <div className="text-left space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-primary">
                Password *
              </Label>
              <div className="relative">
                <Input id="password" type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} className="pr-10" placeholder="Enter your password" />
                <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
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
              Cancel
            </Button>
            <Button onClick={() => {
            setShowAuthDialog(false);
            if (currentAction === "pii") {
              setIsPIIHashingEnabled(true);
              // Save the PII scope based on current selections - derive mode from actual selections
              const isAllMode = selectedEnterprises.length === enterprises.length && selectedFeeds.length === feeds.length;
              setPiiScope({
                mode: isAllMode ? 'all' : 'selected',
                enterprises: selectedEnterprises,
                feeds: selectedFeeds
              });
            } else if (currentAction === "content") {
              setIsContentStorageEnabled(true);
            }
            setPassword("");
            setShowPassword(false);
            setCurrentAction(null);
          }}>
              Verify and enable hashing
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>;
}

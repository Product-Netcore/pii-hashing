import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Plus, ExternalLink } from "lucide-react";
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
  const [enableAllEnterprises, setEnableAllEnterprises] = useState(true);
  const [selectedEnterprises, setSelectedEnterprises] = useState<string[]>([]);
  const [selectedFeeds, setSelectedFeeds] = useState<string[]>([]);
  
  const enterprises = ["Enterprise1", "Enterprise2", "Enterprise3"];
  const feeds = ["PRODUCT2", "SMARTECH", "ALRT_Smart", "test1_prapp", "intncbizbond"];
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
            <div className="flex items-center justify-between p-6 border border-border rounded-lg">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">PII Hashing-Mobile Number</h3>
                <p className="text-sm text-muted-foreground">
                  Enhanced protection of customer privacy with hashing customer's numbers.
                </p>
              </div>
              <Button size="sm" className="min-w-[80px]" onClick={() => setShowPIIDialog(true)}>
                ENABLE
              </Button>
            </div>

            {/* PII Hashing - Message Content */}
            <div className="flex items-center justify-between p-6 border border-border rounded-lg">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Message content storage</h3>
                <p className="text-sm text-muted-foreground">Enhanced protection of customer privacy with disabling storage of user wise message content.</p>
              </div>
              <Button size="sm" className="min-w-[80px]">
                ENABLE
              </Button>
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
                    Once encryption is activated, the data cannot be decrypted to the original value.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-muted-foreground">
                    Encryption is only applicable to the data which is received post activating of encryption.
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
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select enterprises..." />
                    </SelectTrigger>
                    <SelectContent>
                      {enterprises.map((enterprise) => (
                        <SelectItem key={enterprise} value={enterprise}>
                          {enterprise}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="text-left">
                  <label className="text-sm font-medium text-foreground mb-2 block">Select Feeds:</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select feeds..." />
                    </SelectTrigger>
                    <SelectContent>
                      {feeds.map((feed) => (
                        <SelectItem key={feed} value={feed}>
                          {feed}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="gap-3">
            <Button variant="outline" onClick={() => setShowPIIDialog(false)}>
              CANCEL
            </Button>
            <Button onClick={() => setShowPIIDialog(false)}>
              ENCRYPT
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>;
}
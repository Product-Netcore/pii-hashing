import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { SettingsPage } from "@/components/SettingsPage";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar currentPath="/settings" />
      <div className="flex-1 flex flex-col">
        <Header />
        <SettingsPage />
      </div>
    </div>
  );
};

export default Index;

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/sideMenuTabs";
import YouTab from "@/components/keys/YouTab";
import YourKeyTab from "@/components/keys/YourKeyTab";
import HoldersTab from "@/components/SideMenu/HoldersTab";
import WatchListTab from "@/components/SideMenu/WatchListTab";

interface ISideMenuTab {
  isMenuContentOpen: boolean;
}

const SideMenuTab = ({ isMenuContentOpen }: ISideMenuTab) => {
  return (
    <div
      className={`${
        isMenuContentOpen ? "flex" : "hidden"
      } items-center justify-center mt-10 mb-16`}
    >
      <Tabs defaultValue="keys" className="">
        <TabsList className="w-screen overflow-x-auto">
          <TabsTrigger value="keys" className="text-lg">
            Keys
          </TabsTrigger>
          <TabsTrigger value="trades" className="text-lg">
            Trades
          </TabsTrigger>
          <TabsTrigger value="holders" className="text-lg">
            Holders
          </TabsTrigger>
          <TabsTrigger value="holding" className="text-lg">
            Holding
          </TabsTrigger>
          <TabsTrigger value="watchlist" className="text-lg">
            Watchlist
          </TabsTrigger>
        </TabsList>
        <TabsContent value="keys" className="mt-6 mx-3">
          <YouTab />
        </TabsContent>
        <TabsContent value="trades" className="mt-6 mx-3">
          <YourKeyTab />
        </TabsContent>
        <TabsContent value="holders" className="mt-6 mx-3">
          <HoldersTab />
        </TabsContent>
        <TabsContent value="holding" className="mt-6 mx-3">
          <HoldersTab />
        </TabsContent>
        <TabsContent value="watchlist" className="mt-6 mx-3">
          <WatchListTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SideMenuTab;

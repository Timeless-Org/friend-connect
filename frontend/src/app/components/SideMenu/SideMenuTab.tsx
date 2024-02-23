import { IUser } from "@/utils/types";
import HoldersTab from "@components/SideMenu/HoldersTab";
// import WatchListTab from "@components/SideMenu/WatchListTab";
import YouTab from "@components/keys/YouTab";
import YourKeyTab from "@components/keys/YourKeyTab";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@components/ui/sideMenuTabs";

interface ISideMenuTab {
  address: string;
  isMenuContentOpen: boolean;
  userData: IUser | undefined;
}

const SideMenuTab = ({
  address,
  isMenuContentOpen,
  userData,
}: ISideMenuTab) => {
  return (
    <div
      className={`${
        isMenuContentOpen ? "flex" : "hidden"
      } items-center justify-center mt-10 mb-16 w-full`}
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
          {/* <TabsTrigger value="watchlist" className="text-lg">
            Watchlist
          </TabsTrigger> */}
        </TabsList>
        <TabsContent value="keys" className="mt-6 mx-3">
          <YouTab address={address} />
        </TabsContent>
        <TabsContent value="trades" className="mt-6 mx-3">
          <YourKeyTab address={address} />
        </TabsContent>
        <TabsContent value="holders" className="mt-6 mx-3">
          <HoldersTab address={address} />
        </TabsContent>
        <TabsContent value="holding" className="mt-6 mx-3">
          <HoldersTab address={address} />
        </TabsContent>
        {/* <TabsContent value="watchlist" className="mt-6 mx-3">
          <WatchListTab />
        </TabsContent> */}
      </Tabs>
    </div>
  );
};

export default SideMenuTab;

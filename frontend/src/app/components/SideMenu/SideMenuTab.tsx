import { IUser } from '@/utils/types'
import HoldersTab from '@components/SideMenu/HoldersTab'
import WatchListTab from '@components/SideMenu/WatchListTab'
import YouTab from '@components/keys/YouTab'
import YourKeyTab from '@components/keys/YourKeyTab'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/sideMenuTabs'

interface ISideMenuTab {
  address: string
  isMenuContentOpen: boolean
  userData: IUser | undefined
}

const SideMenuTab = ({ address, isMenuContentOpen }: ISideMenuTab) => {
  return (
    <div className={`${isMenuContentOpen ? 'flex' : 'hidden'} mb-16 mt-10 w-full items-center justify-center`}>
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
        <TabsContent value="keys" className="mx-3 mt-6">
          <YouTab address={address} />
        </TabsContent>
        <TabsContent value="trades" className="mx-3 mt-6">
          <YourKeyTab address={address} />
        </TabsContent>
        <TabsContent value="holders" className="mx-3 mt-6">
          <HoldersTab address={address} />
        </TabsContent>
        <TabsContent value="holding" className="mx-3 mt-6">
          <HoldersTab address={address} />
        </TabsContent>
        <TabsContent value="watchlist" className="mt-6 mx-3">
          <WatchListTab address={address} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default SideMenuTab

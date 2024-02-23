'use client'

import { usePrivy } from '@privy-io/react-auth'
import { IAddress } from '@/utils/types'
import Footer from '@components/common/Footer'
import Header from '@components/common/Header'
// import FriendsTab from "@components/keys/FriendsTab";
import GlobalTab from '@components/keys/GlobalTab'
import YouTab from '@components/keys/YouTab'
import YourKeyTab from '@components/keys/YourKeyTab'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'

export default function Keys() {
  const { user } = usePrivy()
  const address = (user?.wallet?.address as IAddress) || '0x'
  return (
    <>
      <Header />
      <div className="mb-16 mt-24 flex w-full flex-col items-center justify-center">
        <Tabs defaultValue="you" className="w-full">
          <TabsList className="fixed w-full">
            <TabsTrigger value="you" className="text-lg">
              You
            </TabsTrigger>
            <TabsTrigger value="your-key" className="text-lg">
              Your Key
            </TabsTrigger>
            {/* <TabsTrigger value="friends" className="text-lg">
              Friends
            </TabsTrigger> */}
            <TabsTrigger value="global" className="text-lg">
              Global
            </TabsTrigger>
          </TabsList>
          <TabsContent value="you" className="mt-12">
            <YouTab address={address} />
          </TabsContent>
          <TabsContent value="your-key" className="mt-12">
            <YourKeyTab address={address} />
          </TabsContent>
          {/* <TabsContent value="friends" className="mt-12">
            <FriendsTab />
          </TabsContent> */}
          <TabsContent value="global" className="mt-12">
            <GlobalTab />
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </>
  )
}

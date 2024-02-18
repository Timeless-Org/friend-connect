"use client";

import { IAddress } from "@/utils/types";
import Footer from "@components/common/Footer";
import Header from "@components/common/Header";
// import FriendsTab from "@components/keys/FriendsTab";
import GlobalTab from "@components/keys/GlobalTab";
import YouTab from "@components/keys/YouTab";
import YourKeyTab from "@components/keys/YourKeyTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { usePrivy } from "@privy-io/react-auth";

export default function Keys() {
  const { user } = usePrivy();
  const address = (user?.wallet?.address as IAddress) || "0x";
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center w-full mt-24 mb-16">
        <Tabs defaultValue="you" className="w-full">
          <TabsList className="w-full fixed">
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
  );
}

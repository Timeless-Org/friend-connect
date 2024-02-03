"use client";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import YouTab from "@/components/keys/YouTab";
import YourKeyTab from "@/components/keys/YourKeyTab";
import FriendsTab from "@/components/keys/FriendsTab";
import GlobalTab from "@/components/keys/GlobalTab";

export default function Keys() {
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
            <TabsTrigger value="friends" className="text-lg">
              Friends
            </TabsTrigger>
            <TabsTrigger value="global" className="text-lg">
              Global
            </TabsTrigger>
          </TabsList>
          <TabsContent value="you" className="mt-12">
            <YouTab />
          </TabsContent>
          <TabsContent value="your-key" className="mt-12">
            <YourKeyTab />
          </TabsContent>
          <TabsContent value="friends" className="mt-12">
            <FriendsTab />
          </TabsContent>
          <TabsContent value="global" className="mt-12">
            <GlobalTab />
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </>
  );
}

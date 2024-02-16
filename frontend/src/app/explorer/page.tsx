"use client";

import Footer from "@components/common/Footer";
import Header from "@components/common/Header";
import NewChatTab from "@components/explorer/NewChatTab";
import TopTab from "@components/explorer/TopTab";
import TrendTab from "@components/explorer/TrendTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";

export default function Search() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center w-full mt-24 mb-16">
        <Tabs defaultValue="top" className="w-full">
          <TabsList className="w-full fixed justify-start">
            <TabsTrigger value="top" className="text-lg">
              Top
            </TabsTrigger>
            <TabsTrigger value="new-chat" className="text-lg">
              New chats
            </TabsTrigger>
            <TabsTrigger value="trend" className="text-lg">
              Trending
            </TabsTrigger>
            {/* <TabsTrigger value="featured" className="text-lg">
              Featured
            </TabsTrigger> */}
          </TabsList>
          <TabsContent value="top" className="mt-12">
            <TopTab />
          </TabsContent>
          <TabsContent value="new-chat" className="mt-12">
            <NewChatTab />
          </TabsContent>
          <TabsContent value="trend" className="mt-12">
            <TrendTab />
          </TabsContent>
          {/* <TabsContent value="featured" className="mt-12">
            <FeaturedTab />
          </TabsContent> */}
        </Tabs>
      </div>
      <Footer />
    </>
  );
}

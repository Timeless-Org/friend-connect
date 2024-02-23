"use client";

import Footer from "@components/common/Footer";
import Header from "@components/common/Header";
import NewChatTab from "@components/explorer/NewChatTab";
import TopTab from "@components/explorer/TopTab";
import TrendTab from "@components/explorer/TrendTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { Input } from "@components/ui/searchInput";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Search() {
  const [word, setWord] = useState<string>("");
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center w-full mt-24 mb-16">
        <div className="w-full flex justify-center items-center pb-4 bg-black border-black border-b-2">
          <div className="border-2 border-zinc-800 w-full mx-4 flex justify-center items-center space-x-2 px-2 bg-zinc-800 rounded-md">
            <button type="button" className=" bg-gray20 rounded-full">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="text-orange h-4 w-4"
              />
            </button>
            <Input
              type="text"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              className="flex-1 text-gray-700 focus:ring-0 ring-0 active:ring-0 focus:border-0 active:border-0 bg-gray20 text-white"
              placeholder="Search by username"
            />
          </div>
        </div>
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

'use client'

import { useState } from 'react'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Footer from '@components/common/Footer'
import Header from '@components/common/Header'
import NewChatTab from '@components/explorer/NewChatTab'
import SearchTab from '@components/explorer/SearchTab'
import TopTab from '@components/explorer/TopTab'
import TrendTab from '@components/explorer/TrendTab'
import { Input } from '@components/ui/searchInput'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'

export default function Search() {
  const [word, setWord] = useState<string>('')
  const [tab, setTab] = useState<string>('top')
  const search = async (_word: string) => {
    setTab('search')
  }
  const onTabChange = (value: string) => {
    setTab(value)
  }
  return (
    <>
      <Header />
      <div className="fixed mb-16 mt-24 flex w-full flex-col items-center justify-center">
        <div className="flex w-full items-center justify-center border-b-2 border-black bg-black pb-4">
          <div className="mx-4 flex w-full items-center justify-center space-x-2 rounded-md border-2 border-zinc-800 bg-zinc-800 px-2">
            <button type="button" className=" rounded-full bg-gray20">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="size-4 text-yellow" />
            </button>
            <Input
              type="text"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              className="text-gray-700 flex-1 bg-gray20 text-white ring-0 focus:border-0 focus:ring-0 active:border-0 active:ring-0"
              placeholder="Search by username"
              onClick={() => search(word)}
            />
          </div>
        </div>
        <Tabs value={tab} onValueChange={onTabChange} className="w-full">
          <TabsList className="overflow-x-auto whitespace-nowrap flex">
            <TabsTrigger value="search" className="text-lg">
              Search
            </TabsTrigger>
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
          <TabsContent value="search" className="mt-12">
            <SearchTab word={word} />
          </TabsContent>
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
  )
}

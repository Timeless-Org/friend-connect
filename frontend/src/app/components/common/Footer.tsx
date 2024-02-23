import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

interface SvgIconData {
  width: string
  height: string
  viewBox: string
  path: React.ReactNode
  url: string
}

const Footer = () => {
  const router = useRouter()
  const pathname = usePathname()

  const handleIconClick = (iconId: number, url: string) => {
    router.push(url)
  }

  const svgIcons: SvgIconData[] = [
    {
      width: '2.5rem',
      height: '2.5rem',
      viewBox: '0 0 24 24',
      path: (
        <path
          fill="currentColor"
          d="M7 13.23q-.517 0-.874-.356q-.357-.357-.357-.874t.357-.874q.357-.357.874-.357t.874.357q.357.357.357.874t-.357.874q-.357.357-.874.357M7 17q-2.077 0-3.538-1.462Q2 14.077 2 12t1.462-3.538Q4.923 7 7 7q1.54 0 2.778.835q1.237.834 1.807 2.165h9.203l2 2l-3.192 3.154l-1.711-1.289l-1.808 1.327L14.298 14h-2.713q-.57 1.312-1.807 2.156Q8.54 17 7 17m0-1q1.477 0 2.52-.888q1.043-.889 1.336-2.112h3.76l1.43.967l1.858-1.332l1.621 1.22L21.381 12l-1-1h-9.525q-.293-1.223-1.336-2.112Q8.477 8 7 8Q5.35 8 4.175 9.175T3 12q0 1.65 1.175 2.825T7 16"
        />
      ),
      url: 'keys'
    },
    {
      width: '2rem',
      height: '2rem',
      viewBox: '0 0 24 24',
      path: (
        <path
          fill="currentColor"
          d="M2 22V4q0-.825.588-1.412T4 2h16q.825 0 1.413.588T22 4v12q0 .825-.587 1.413T20 18H6zm4-8h8v-2H6zm0-3h12V9H6zm0-3h12V6H6z"
        />
      ),
      url: 'chat'
    },
    {
      width: '2rem',
      height: '2rem',
      viewBox: '0 0 24 24',
      path: (
        <path
          fill="currentColor"
          d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5q0-2.725 1.888-4.612T9.5 3q2.725 0 4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5q0-1.875-1.312-3.187T9.5 5Q7.625 5 6.313 6.313T5 9.5q0 1.875 1.313 3.188T9.5 14"
        />
      ),
      url: 'explorer'
    },
    {
      width: '2rem',
      height: '2rem',
      viewBox: '0 0 24 24',
      path: (
        <path
          fill="currentColor"
          d="M11 23a2 2 0 0 1-2-2v-2h6v2a2 2 0 0 1-2 2zm1-22c.71 0 1.39.09 2.05.26C15.22 2.83 16 5.71 16 9c0 2.28-.38 4.37-1 7a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2c-.62-2.63-1-4.72-1-7c0-3.29.78-6.17 1.95-7.74C10.61 1.09 11.29 1 12 1m8 7c0 3.18-1.85 7.92-4.54 9.21C16.41 15.39 17 11.83 17 9c0-2.83-.59-5.39-1.54-7.21C18.15 3.08 20 4.82 20 8M4 8c0-3.18 1.85-4.92 4.54-6.21C7.59 3.61 7 6.17 7 9s.59 6.39 1.54 8.21C5.85 15.92 4 11.18 4 8"
        />
      ),
      url: 'airdrop'
    },
    {
      width: '2rem',
      height: '2rem',
      viewBox: '0 0 32 32',
      path: (
        <>
          <path fill="currentColor" d="M22 17h2v2h-2z" />
          <path
            fill="currentColor"
            d="M28 8H4V5h22V3H4a2 2 0 0 0-2 2v21a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2M4 26V10h24v3h-8a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h8v3Zm24-11v6h-8v-6Z"
          />
        </>
      ),
      url: 'wallet'
    }
  ]

  return (
    <footer className="fixed inset-x-0 bottom-0 flex h-24 items-start justify-center border-t-2 border-gray24 bg-white px-6">
      <div className="mt-2 flex w-full items-start justify-between space-x-6">
        {svgIcons.map((icon, index) => (
          <button key={index} onClick={() => handleIconClick(index, icon.url)} className="focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={icon.width}
              height={icon.height}
              viewBox={icon.viewBox}
              className={`h-12 ${pathname.includes(icon.url) ? 'text-black' : 'text-gray24'}`}
            >
              {icon.path}
            </svg>
          </button>
        ))}
      </div>
    </footer>
  )
}

export default Footer

import { type ClassValue, clsx } from 'clsx'
import { Metadata } from 'next'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  if (typeof window !== 'undefined') return path
  if (process.env.VERCEL_URL)
    return `https://${process.env.VERCEL_URL}${path}`
  return `http://localhost:${
    process.env.PORT ?? 3000
  }${path}`
}

export function constructMetadata({
  title = "Lecture",
  description = "Lecture Allows you to chat with your PDFs easily",
  icons = "/favicon.ico",
  noIndex = false
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@Aayushdoescoding"
    },
    icons,
    metadataBase: new URL('https://lecture.aayus.me'),
    themeColor: '#000',
    ...(noIndex && {
      robots: {
        index: false,
        follow: false
      }
    })
  }
}
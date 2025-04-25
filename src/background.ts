// import { cleanCount } from '@/lib/utils/chrome'

chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed!')
  // For development purposes, clear the hidden count
  // cleanCount()
})

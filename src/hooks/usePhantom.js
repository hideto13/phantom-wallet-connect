import { useState } from 'react'

export const usePhantom = () => {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState('')

  const getProvider = () => {
    if ('phantom' in window) {
      const provider = window.phantom?.solana

      if (provider?.isPhantom) {
        return provider
      }
    }
  }

  async function connect() {
    if (!window.solana) return setTimeout(connect, 1000)
    const provider = getProvider()
    try {
      await provider.connect()
      setIsConnected(true)
    } catch (err) {
      console.log(err)
    }
  }

  return {
    address,
    isConnected,
    connect,
  }
}

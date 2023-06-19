import { useState, useEffect } from 'react'
import { Connection, clusterApiUrl, Transaction } from '@solana/web3.js'

export const usePhantom = () => {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState('')
  const [balance, setBalance] = useState(0)

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
      const resp = await provider.connect()
      setAddress(resp.publicKey)
      setIsConnected(true)
    } catch (err) {
      console.log(err)
    }
  }

  async function getSign() {
    const provider = getProvider()
    const message = `Some message`
    const encodedMessage = new TextEncoder().encode(message)
    const signedMessage = await provider.signMessage(encodedMessage, 'utf8')
    console.log(signedMessage)
  }

  async function getBalance() {
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
    connection.getBalance(address).then(res => setBalance(res))
  }

  useEffect(() => {
    if (address) getBalance()
  }, [address])

  return {
    address,
    isConnected,
    connect,
    balance,
    getSign,
  }
}

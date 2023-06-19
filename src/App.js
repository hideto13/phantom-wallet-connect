import { useEffect } from 'react'
import { usePhantom } from './hooks/usePhantom'
import './App.css'

function App() {
  const { isConnected, connect, address, balance } = usePhantom()

  useEffect(() => {
    if (window.solana || window.phantom) connect()
  }, [])

  return (
    <div className='App'>
      <header className='App-header'>
        {isConnected ? (
          <>
            <p>Address: {address.toBase58()}</p>
            <p>Balance: {balance}</p>
          </>
        ) : (
          <button className='App-button' onClick={connect}>
            Connect Wallet
          </button>
        )}
      </header>
    </div>
  )
}

export default App

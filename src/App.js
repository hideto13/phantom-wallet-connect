import { useEffect } from 'react'
import { usePhantom } from './hooks/usePhantom'
import './App.css'

function App() {
  const { isConnected, connect } = usePhantom()

  useEffect(() => {
    if (window.solana || window.phantom) connect()
  }, [])

  return (
    <div className='App'>
      <header className='App-header'>
        {isConnected ? (
          <>okay</>
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

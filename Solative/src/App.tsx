import Home from './pages/Home'
import { SearchProvider } from './context/SearchContext'
import "./App.css"

function App() {

  return (
    <SearchProvider>
      <div className='home-container'>
        <Home />
      </div>
    </SearchProvider>
  )
}

export default App

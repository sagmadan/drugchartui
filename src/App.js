import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import Medicines from './pages/Medicines'

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route 
              path="/medicines" 
              element={ <Medicines/ >} 
            />
          </Routes>
        </div>
      </BrowserRouter>
      {user}
    </div>
  );
}

export default App;

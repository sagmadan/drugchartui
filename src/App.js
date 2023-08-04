import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// pages & components
import Medicines from './pages/Medicines'

function App() {

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
    </div>
  );
}

export default App;

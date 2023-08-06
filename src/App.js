import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import Signup from './pages/Signup'
import Login from './pages/Login'
import Medicines from './pages/Medicines'
import Schedule from './pages/Schedule'
import Chart from './pages/Chart'
import Navbar from './components/Navbar'

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/medicines"
              element={user ? <Medicines /> : <Navigate to="/login" />}
            />
            <Route
              path="/schedule"
              element={user ? <Schedule /> : <Navigate to="/login" />}
            />
            <Route
              path="/chart"
              element={user ? <Chart /> : <Navigate to="/login" />}
            />
            <Route
              path="/"
              element={user ? <Navigate to="/chart" /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

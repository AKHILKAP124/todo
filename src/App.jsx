
import {Route, BrowserRouter, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Create from './Pages/Create'
import SignIn from './Pages/Auth/SignIn'
import SignUp from './Pages/Auth/SignUp'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './utils/ProtectedRoutes'
import Update from './Pages/Update'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Protected routes */}
          <Route path="/" element={<ProtectedRoute component={<Home />} />} />
          <Route path="/create" element={<ProtectedRoute component={<Create />} />} />
          <Route path="/update/:id" element={<ProtectedRoute component={<Update />} />} />

          {/* Public routes */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App

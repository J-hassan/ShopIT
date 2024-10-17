import './App.css';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import ProductDetails from './components/Products/ProductDetails';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profile from "./components/user/Profile";
import UpdateProfile from './components/user/UpdateProfile';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UploadAvatar from './components/user/UploadAvatar';


function App() {
  return (
    <Router>
      <div className="App">

        <Toaster />

        <Header />

        <div className='container'>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/products/:id' element={<ProductDetails />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>

            <Route path='/me/profile' element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }></Route>

            <Route path='/me/update_profile' element={
              <ProtectedRoute>
                <UpdateProfile />
              </ProtectedRoute>
            }></Route>

            <Route path='/me/upload_avatar' element={
              <ProtectedRoute>
                <UploadAvatar />
              </ProtectedRoute>
            }></Route>

          </Routes>
        </div>

        <Footer />

      </div>
    </Router>
  );
}

export default App;

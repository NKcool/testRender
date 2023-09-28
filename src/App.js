
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home'
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Sign_In from './components/Sign_In';
import Profile from './components/Profile';
import usercontext from './context/user/usercontext';
import { useEffect, useState } from 'react';
import Test from './components/Test';
import Progress from './components/Progress';


function App() {
  const [user, setUser] = useState({})
  const updateUser = (newUser)=>{
    setUser(newUser);
  }

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setUser(parsedUserData.user);
    } else {

    }
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Header />

    <usercontext.Provider value={{user,updateUser}}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/sign-in' element={<Sign_In />} />
          <Route path='/test' element={<Test />} />
          <Route path='/progress' element={<Progress />} />
        </Routes>
    
    </usercontext.Provider>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

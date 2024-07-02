import './App.css';
import Navbar from './components/Navbar';
import { Route, Routes, useLocation } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Test from './pages/Test';

function App() {
  const location = useLocation();
  const shouldShowNavbar = location.pathname !== '/login';

  return (
    <>
    {shouldShowNavbar && <Navbar></Navbar>}
      <Routes>
        <Route path="login" element={<Login></Login>}></Route>
        <Route path='/' element={<Homepage></Homepage>}></Route>
        <Route path='dashboard' element={<Dashboard></Dashboard>}></Route>
        <Route path='test' element={<Test></Test>}></Route>
      </Routes>
    </>
  );
}

export default App;

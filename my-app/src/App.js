// import React from 'react';
// import './App.css';
// import LoginSignup from './comp/loginsignup/loginsignup';
// import home from './comp/home/home';

// function App() {
//   return (
//     // <div>
//     //   <LoginSignup />
//     // </div>
//     <Router>
//       <Switch>
//         <Route exact path="/" component={LoginSignup} />
//         <Route path="/home" component={home} />
//       </Switch>
//     </Router>
//   );
// };

// export default App;

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import LoginSignup from './comp/loginsignup/loginsignup';
import Home from './comp/home/home';
import CustomerDetails from './comp/Customer_Details/customer_details';
import AppoinmentCheck from './comp/Appoinment_Check/appoinment_check';
import ServiceRemainder from './comp/Service_Remainder/service_remainder';
import Profile from './comp/profile/profile';
import { Navigate } from 'react-router-dom';



function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // Make a request to check if the user is authenticated
        const response = await axios.get('http://localhost:3000/api/login/profile', { withCredentials: true });
        if (response.status === 200) {
          setAuthenticated(true);
        }
      } catch (error) {
        setAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/customer_details" element={<CustomerDetails />} />
        <Route 
          path="/profile" 
          element={authenticated ? <Profile /> : <Navigate to="/profile" />} 
        />
        <Route path="/appoinment_check" element={<AppoinmentCheck />} />
        <Route path="/service_remainder" element={<ServiceRemainder />} />
      </Routes>
    </Router>
  );
}
export default App;

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

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSignup from './comp/loginsignup/loginsignup';
import Home from './comp/home/home';
import CustomerDetails from './comp/Customer_Details/customer_details';
import FeedbackCheck from './comp/Feedback_Check/Feedback_Check';
import AppoinmentCheck from './comp/Appoinment_Check/appoinment_check';
import ServiceRemainder from './comp/Service_Remainder/service_remainder';
import ChatBox from './comp/Chat_Box/chat_box';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/customer_details" element={<CustomerDetails />} />
        <Route path="/feedback_check" element={<FeedbackCheck />} />
        <Route path="/appoinment_check" element={<AppoinmentCheck/>}/>
        <Route path="/service_remainder" element={<ServiceRemainder/>}/>
        <Route path="/chat_box" element={<ChatBox/>}/>
      </Routes>
    </Router>
  );
}

export default App;

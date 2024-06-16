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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;

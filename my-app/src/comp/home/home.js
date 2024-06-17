import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../header/header';

function Home() {
  return (
    <div>
      <Header/>
      <Link to="/">Go to Login/Signup</Link>
    </div>
  );
}

export default Home;

import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../header/header';
import Footer from '../Footer/footer';

function Home() {
  return (
    <div>
      <Header/>
      <Link to="/">Go to Login/Signup</Link>
      <Footer/>
    </div>
  );
}

export default Home;

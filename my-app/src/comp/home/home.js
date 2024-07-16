import React from 'react';
import Header from '../header/header';
import Layout from '../layout/layout';
import Footer from '../Footer/footer';
import Chart from 'react-apexcharts';
import './home.css';
function Home() {
  const revenueData = {
    series: [{
      name: 'Revenue',
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    }],
    options: {
      chart: {
        type: 'line',
        height: 350
      },
      title: {
        text: 'Revenue',
        align: 'left'
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
      }
    }
  };

  const appointmentsData = {
    series: [{
      name: 'Appointments',
      data: [30, 40, 45, 50, 49, 60, 70, 91, 125]
    }],
    options: {
      chart: {
        type: 'bar',
        height: 250
      },
      title: {
        text: "Today's Appointments",
        align: 'left'
      },
      xaxis: {
        categories: ['10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM']
      }
    }
  };

  return (
    <div>
      <Header />
      <Layout />
      <div className="container">
        <h2>Welcome to the Dashboard</h2>
        <div className="card">
          <Chart
            options={revenueData.options}
            series={revenueData.series}
            type="line"
            height={250}
          />
        </div>
        <div className="card">
          <Chart
            options={appointmentsData.options}
            series={appointmentsData.series}
            type="bar"
            height={250}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;

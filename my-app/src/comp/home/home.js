// import React, { useState, useEffect } from 'react';
// import Header from '../header/header';
// import Layout from '../layout/layout';
// import Footer from '../Footer/footer';
// import Chart from 'react-apexcharts';
// import axios from 'axios';
// import './home.css';

// function Home() {
//   const [todayAppointmentsCount, setTodayAppointmentsCount] = useState(0);
//   const [totalCustomersCount, setTotalCustomersCount] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch today's appointments data
//         const todayAppointmentsResponse = await axios.get('http://localhost:3000/api/appointments/today');
//         setTodayAppointmentsCount(todayAppointmentsResponse.data.length);

//         // Fetch total number of customers
//         const totalCustomersResponse = await axios.get('http://localhost:3000/api/customers');
//         setTotalCustomersCount(totalCustomersResponse.data.length);

//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <Header />
//       <Layout />
//       <div className="container">
//         <h2>Welcome to the Dashboard</h2>
        
//         <div className="card">
//           <h3>Today's Appointments Count</h3>
//           <p>{todayAppointmentsCount}</p>
//           <Chart
//             options={{
//               chart: { type: 'donut', height: 250 },
//               title: { text: "Today's Appointments Count", align: 'left' },
//               labels: ['Appointments'],
//               plotOptions: {
//                 pie: {
//                   donut: {
//                     size: '70%',
//                   }
//                 }
//               },
//               dataLabels: {
//                 enabled: true,
//                 formatter: (val) => `${val} appointments`
//               }
//             }}
//             series={[todayAppointmentsCount]}
//             type="donut"
//             height={250}
//           />
//         </div>

//         <div className="card">
//           <h3>Total Customers Count</h3>
//           <p>{totalCustomersCount}</p>
//           <Chart
//             options={{
//               chart: { type: 'donut', height: 250 },
//               title: { text: 'Total Customers Count', align: 'left' },
//               labels: ['Customers'],
//               plotOptions: {
//                 pie: {
//                   donut: {
//                     size: '70%',
//                   }
//                 }
//               },
//               dataLabels: {
//                 enabled: true,
//                 formatter: (val) => `${val} customers`
//               }
//             }}
//             series={[totalCustomersCount]}
//             type="donut"
//             height={250}
//           />
//         </div>
        
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default Home;
import React, { useState, useEffect } from 'react';
import Header from '../header/header';
import Layout from '../layout/layout';
import Footer from '../Footer/footer';
import Chart from 'react-apexcharts';
import axios from 'axios';
import './home.css';

function Home() {
  const [todayAppointmentsCount, setTodayAppointmentsCount] = useState(0);
  const [futureAppointmentsCount, setFutureAppointmentsCount] = useState(0);
  const [totalCustomersCount, setTotalCustomersCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch today's appointments data
        const todayAppointmentsResponse = await axios.get('http://localhost:3000/api/appointments/today');
        setTodayAppointmentsCount(todayAppointmentsResponse.data.length);

        // Fetch future appointments data
        const futureAppointmentsResponse = await axios.get('http://localhost:3000/api/appointments/future');
        setFutureAppointmentsCount(futureAppointmentsResponse.data.length);

        // Fetch total number of customers
        const totalCustomersResponse = await axios.get('http://localhost:3000/api/customers');
        setTotalCustomersCount(totalCustomersResponse.data.length);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <Layout />
      <div className="c7">
        <h2>Welcome to the Dashboard</h2>
        
        <div className="card">
          <h3>Today's Appointments </h3>
          <p>{todayAppointmentsCount}</p>
          <div className="chart-container">
            <Chart
              options={{
                chart: { type: 'donut', height: 250 },
                title: { text: "Today's Appointments ", align: 'left' },
                labels: ['Appointments'],
                plotOptions: {
                  pie: {
                    donut: {
                      size: '70%',
                    }
                  }
                },
                dataLabels: {
                  enabled: true,
                  formatter: (val) => `${val} appointments`
                }
              }}
              series={[todayAppointmentsCount]}
              type="donut"
              height={250}
            />
          </div>
        </div>

        <div className="card">
          <h3>Upcoming Appointments </h3>
          <p>{futureAppointmentsCount}</p>
          <div className="chart-container">
            <Chart
              options={{
                chart: { type: 'donut', height: 250 },
                title: { text: 'Upcoming Appointments ', align: 'left' },
                labels: ['Upcoming Appointments'],
                plotOptions: {
                  pie: {
                    donut: {
                      size: '70%',
                    }
                  }
                },
                dataLabels: {
                  enabled: true,
                  formatter: (val) => `${val} upcoming appointments`
                }
              }}
              series={[futureAppointmentsCount]}
              type="donut"
              height={250}
            />
          </div>
        </div>

        <div className="card">
          <h3>Total Customers </h3>
          <p>{totalCustomersCount}</p>
          <div className="chart-container">
            <Chart
              options={{
                chart: { type: 'donut', height: 250 },
                title: { text: 'Total Customers Count', align: 'left' },
                labels: ['Customers'],
                plotOptions: {
                  pie: {
                    donut: {
                      size: '70%',
                    }
                  }
                },
                dataLabels: {
                  enabled: true,
                  formatter: (val) => `${val} customers`
                }
              }}
              series={[totalCustomersCount]}
              type="donut"
              height={250}
            />
          </div>
        </div>
        
      </div>
      <Footer />
    </div>
  );
}

export default Home;

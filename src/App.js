import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';  

function App() {
  const [reportData, setReportData] = useState(null);
  const [totalFine, setTotalFine] = useState(0);


  const fetchData = async () => {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZWRhNWExODU0OTFhYWE0MmY5YzMyZjRhMTU5MDM1ODk4ZjZiMzMxNWUzZjJjNGRiZDA1N2IyNGE3NTAzMDc3NDBlMjFlYjZmNGE4Mjk0MGUiLCJpYXQiOjE3MDQ4MDA4OTAuODc5OTI1OTY2MjYyODE3MzgyODEyNSwibmJmIjoxNzA0ODAwODkwLjg3OTkyOTA2NTcwNDM0NTcwMzEyNSwiZXhwIjoxNzM2NDIzMjkwLjgzNDkxMjA2MTY5MTI4NDE3OTY4NzUsInN1YiI6IjI2NSIsInNjb3BlcyI6W119.CwDEjlHoRtOXdFcaO6KGGxV202AOA7MMtJVPtKzgLqzTFzUUnDLGBd7PNAtHO2--3YOathM9HOG8hYjY8wjktXZIoCGUR9GWIaEVUxLwFq927CrSf05NuqTBTrJcDeBOjXDvKcSBiJ2A994FC2IunPcdkaZ4jpoaWBIaWueYUbHviYSQuLec3tFcAMg4njrImAlaN9k-QKkHetpdrdbUEX1Wzq4X-1QwuOx7W3W2nbbxaoNgFX1gaabxi00ZO7h5MokGvtqy_gCkS9TYoM74VfxmTyAAczjttLcPqDNiAL_ZJdutDMezw32CZj8G8l8PUL46F_BuaxatZDBUZxeClZh4_0Wvo9GX4zqF2XvHdzZHnwdB414vNCl8itaGW9w7QWbdchPOglhnek32ZmkH0MIqeOBhnAyHo5_WbP0uLd_3qmz3w04nvTbTGV25-QebaxPAsVD0-7Za1sVpqB_FD6yEeliaEzdxl_8gA5IH59uowpfPYgUIjom8NVEASuYsAwb0q3f0jhNRfwg2zmXNenoDunh_dN9l2NRjI2gdZueSMwu6IJLQK46jpn01uG2iQ1xx-pFJAGe_bzSceLsho3dbtabym3tMqi0Ac02xUP9Mn50LdkFJGNVU9jiuHQfyjQirDtGUfya3aIvpJlCGx9Cx99s_4P89uDnOiXy3A1Q' ;  // Replace with your actual token

    try {
      const response = await axios.post(
        'http://canteen.benzyinfotech.com/api/v3/customer/report',
        { month: 11 },  
        { headers: { Authorization: `Bearer ${token}` } }
      );

      
        const data = response.data;
        console.log("data::", data)
        setReportData(data);
        totalFineCalculate(data.reports);
    
    } catch (error) {
      console.error('Error fetching data:', error);
    } 
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalFineCalculate = (reports) => {
    let fine = 0;
    reports.forEach((report) => {
      const meals = report.opt_ins;
      if (meals) {
        if (meals.breakfast === 'Pending') fine += 100;
        if (meals.lunch === 'Pending') fine += 100;
        if (meals.dinner === 'Pending') fine += 100;
      }
    });
    setTotalFine(fine);
  };


  return (
    <div className="container">
      <h1 className="title">Employee Monthly Food Order Report</h1>

      {reportData && (
        <>
          <div className="user-card">
            <h2>{reportData.user.f_name} {reportData.user.l_name}</h2>
            <p><strong>Employee ID:</strong> {reportData.user.emp_id}</p>
            <p><strong>Phone:</strong> {reportData.user.phone}</p>
          </div>

          <div className="grid-container">
            {reportData.reports.map((report, index) => (
              <div className="report-card" key={index}>
                <h3>{new Date(report.date).toLocaleDateString()}</h3>
                <p><strong>Breakfast:</strong> {report.opt_ins?.breakfast || 'Not Ordered'}</p>
                <p><strong>Lunch:</strong> {report.opt_ins?.lunch || 'Not Ordered'}</p>
                <p><strong>Dinner:</strong> {report.opt_ins?.dinner || 'Not Ordered'}</p>
              </div>
            ))}
          </div>

          <div className="fine-card">
            <h2>Total Fine: ₹{totalFine}</h2>
          </div>
        </>
      )}
    </div>
  );
}

export default App;


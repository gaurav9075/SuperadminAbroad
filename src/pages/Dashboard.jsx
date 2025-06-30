import React from "react";
const token = sessionStorage.getItem("token");
console.log(token);
const Dashboard = () => {
  return (
    <div style={{marginTop:"100px",marginLeft:"100px"}}>
      <h1>Dashboard</h1>
      {/* Settings content here */}
    </div>
  );
};

export default Dashboard;
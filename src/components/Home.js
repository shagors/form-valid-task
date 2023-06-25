import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/home")
      .then((res) => setData(res.data))
      .catch((error) => console.log(error));
  }, []);
  console.log(data);
  return (
    <div className="vh-100 bg-info">
      <h1 className="text-center text-white fs-1 pt-5 fw-bold">
        List Of Users
      </h1>
      <div className="d-flex vh-100 justify-content-center align-items-center">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button>Edit</button>
                    <button>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;

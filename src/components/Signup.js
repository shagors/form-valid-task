import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="d-flex justify-content-center align-items-center bg-info vh-100">
      <div className="bg-white p-3 rounded w-50">
        <h2 className="text-center">Sign Up</h2>
        <form action="">
          <div className="mb-3">
            <label htmlFor="name">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              required
              placeholder="Enter Your Name"
              className="form-control rounded-0"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              required
              placeholder="Enter Your Email"
              className="form-control rounded-0"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              required
              placeholder="Enter Your Password"
              className="form-control rounded-0"
            />
          </div>
          <button className="btn btn-success w-100">Sign Up</button>
          <p className="text-center mt-3">
            Are you agree to our terms and conditions
          </p>
          <p className="text-center">
            Already have an account ?
            <Link to="/" className="">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;

import React, { useState } from "react";
import {useHistory} from 'react-router-dom';

const Login = (props) => {
  const host=process.env.REACT_APP_HOST_URL;
const [credentials, setCredentials] = useState({email:"",password:""})

let history=useHistory();


  const handleSubmit = async (e) => {
        e.preventDefault(); //prevent from reloading

        const response=await fetch(`${host}/api/auth/login`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiZTBmZjMzOTQzNTEwMmIyMGRlODhjIn0sImlhdCI6MTY5MDE4Mzc5Nn0.yHYESUzdKMwMVnUlDkecveKnmTKJyPmXNOCkCzNZGTs"
            },
            body: JSON.stringify({email:credentials.email, password:credentials.password})
        });


        const json=await response.json();
      
        

        if(json.success){
            //redirect
            
            const authtoken=json['auth-token'];
            localStorage.setItem("token", authtoken);
            history.push("/");
            props.showAlert("Logged In Successfully ","success")

        }else{
          props.showAlert("Wrong Credentials","danger")

        }
    
  };

  const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
  }

  return (
    <>
      <div className="container my-5 ">
      
        <div className="container w-50 p-3 shadow-lg p-3 mb-5 bg-white rounded">
        <h1 className="text-center my-2">Log In</h1>
          <form onSubmit={handleSubmit}>
          
            <div className="form-group ">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={credentials.email}
                onChange={onChange}
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group my-2">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={credentials.password}
                name="password"
                placeholder="Password"
                onChange={onChange}
              />
            </div>
            <div className="text-center">
            <button type="submit" className="btn btn-warning my-3" >
              Submit
            </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

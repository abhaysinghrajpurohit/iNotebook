import React, { useState } from "react";
import {useHistory} from 'react-router-dom';

const Signup = (props) => {
  const host=process.env.REACT_APP_HOST_URL;
  const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""})

let history=useHistory();


  const handleSubmit = async (e) => {
        e.preventDefault(); //prevent from reloading

        if(credentials.cpassword!==credentials.password){
          props.showAlert("Password  and Confirm Password must be same","danger")
          return
        }

        const response=await fetch(`${host}/api/auth/createUser`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({name:credentials.name,email:credentials.email, password:credentials.password})
        });


        const json=await response.json();
      
        

        if(json.success){
            //redirect
            
            const authtoken=json['auth-token'];
            localStorage.setItem("token", authtoken);
            history.push("/");
            props.showAlert("Account Created Successfully ","success")
        }else{
            props.showAlert(json.error,"danger")
        }
    
  };

  const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
  }

  return (
    <>
      <div className="container my-5 ">
      
        <div className="container w-50 p-3 shadow-lg p-3 mb-5 bg-white rounded">
        <h1 className="text-center my-2">Sign Up</h1>
          <form onSubmit={handleSubmit}>

          <div className="form-group ">
              <label htmlFor="name">Username</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={credentials.name}
                onChange={onChange}
                placeholder="Enter username"
                required
              />
             
            </div>
          
            <div className="form-group ">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={credentials.email}
                onChange={onChange}              
                placeholder="Enter email"
                required
              />
             
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
                minLength={5}
                required
              />
            </div>
            <div className="form-group my-2">
              <label htmlFor="cpassword">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="cpassword"
                value={credentials.cpassword}
                name="cpassword"
                placeholder="Confirm Password"
                onChange={onChange}
                minLength={5}
                required
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
  )
}

export default Signup

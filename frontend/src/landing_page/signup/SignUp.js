import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox
} from 'mdb-react-ui-kit';

function SignUp() {
  const navigate = useNavigate();
  // Add state for each input
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:3002/signup", {
      email,
      password,
      username,
    });
    if (res.data.status) {
      window.location.href = "http://localhost:3001"; // or any route you want
    } else {
      alert(res.data.message);
    }
  };

  return (
    <MDBContainer fluid>
      <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
              <form onSubmit={handleSignup}>
                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBInput
                    label='Your Username'
                    id='form1'
                    type='text'
                    className='w-100'
                    name='username'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                  />
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBInput
                    label='Your Email'
                    id='form2'
                    type='email'
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBInput
                    label='Password'
                    id='form3'
                    type='password'
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
                <MDBBtn className='mb-4' size='lg'>Register</MDBBtn>
              </form>
            </MDBCol>
            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid/>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default SignUp;
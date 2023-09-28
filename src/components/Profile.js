import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import userContext from '../context/user/usercontext';
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import axios from 'axios';


export default function Profile() {
  const navigate = useNavigate();
  const { user, updateUser } = useContext(userContext);
  const [data, setData] = useState([]);
  const [language, setlanguage] = useState("english")
  const logout = () => {
    localStorage.removeItem('userData');
    navigate("/")
  }
  const languageHandler = (e) => {
    setlanguage(e.target.value)
  }
  const updateLanguage = () => {
    try {
      axios.post(process.env.REACT_APP_baseUrl + "changelanguage", {
        id: user._id,
        language: language
      })
        .then((response) => {
          if (response.data.user) {
            response.data.user.password = "";
            updateUser(response.data.user)
            const userData = {
              user: response.data.user,
            };
            localStorage.setItem('userData', JSON.stringify(userData));
          } else {
            console.log(response.data);
          }
        });
    } catch (e) {
      console.log(e);
    }
  }
  const progressHandler = ()=>{
    console.log(user.QueAttemped)
    const userData = {
      user: user,
    };
    localStorage.setItem('userData', JSON.stringify(userData));
    navigate('/progress')
  }
  useEffect(() => {
    axios.get(process.env.REACT_APP_baseUrl + 'users')
      .then((response) => {
        const sortedData = response.data.sort((a, b) => b.score - a.score);
        setData(sortedData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [updateLanguage]);


  return (
    <section className="" style={{ backgroundColor: 'rgb(10, 17, 36)' }}>
      <MDBContainer className="py-5 h-100" style={{ background: "transparant" }}>
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
                <MDBCol md="4" className="gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />

                  <MDBIcon far icon="edit mb-5" />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">{user.username}</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Username</MDBTypography>
                        <MDBCardText className="text-muted">{user.username}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <Button variant="danger" onClick={logout}>Logout</Button>{' '}
                      </MDBCol>
                    </MDBRow>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <Button variant="success"><Link style={{ "text-decoration": "none", color: "#ffff" }} to={'/test'}>Take Test</Link></Button>{' '}
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Language</MDBTypography>
                        <MDBCardText className="text-muted">{user.language}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <Button variant="warning" onClick={updateLanguage} style={{ fontSize: "15px" }}>change language</Button>{' '}
                        <Form.Select size="6" className="mt-3" aria-label="Default select example" onChange={languageHandler}>
                          <option value="english">english</option>
                          <option value="hindi">hindi</option>
                        </Form.Select>
                      </MDBCol>
                      
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Language proficiency</MDBTypography>
                        <MDBCardText className="text-muted">{user.LanguageProficiency}% &nbsp;&nbsp;&nbsp;score&nbsp;0{user.score}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <Button variant="primary" onClick={progressHandler} style={{ fontSize: "15px" }}>completed exercises</Button>{' '}
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
          <div className='leaderBoard'><h2>LeaderBoard</h2>

            <ol>
              {data.map((item, index) => (
                <li key={index}>
                  {item.username} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; score : 0{item.score}
                </li>
              ))}

            </ol>

          </div>
        </MDBRow>
      </MDBContainer>

    </section>
  );
}

import React, { useState } from "react";
import styled from "styled-components";
import { Theme } from "../theme/theme";

import { FetchApi } from "../fetch/FetchApi";
import { useNavigate } from "react-router-dom";

import { showMessage } from "../helpers/showMessage";

const userPng = require('../assets/user.png')

export const ForgetPassword = () => {

    const [username, setUserName] = useState("")

    const navigate = useNavigate()

    const loginCallBack = (status, response) => {
 
        if (status && response.responses) {
    
         navigate("/reset-password", { state: { username : username }});
    
        } else {
    
          let msg = "Incorrect username"
    
          if (response.massage) {
            msg = response.massage;
          }
    
          showMessage({ message: msg, type: "danger", autoHide: true })
    
        //  navigation.navigate("Home") //remember to remove
    
        }
    
      }
    
    
    
    
      const login = () => {
    
        if (!username) {
    
          showMessage({ message: "All fields are mandatory", type: "danger", autoHide: true })
   
        } else {
    
          const body = new FormData();
    
          const deviceId = "X-USER-WEB"
    
          body.append('service', "forgetP")
          body.append('username', username)
          body.append('device', deviceId)
    
          FetchApi.MakeRequest("POST", body, loginCallBack);
        }
      }

    return(
        <Container>
            <FormContainer>
                <Logo src={userPng} alt='logo' />
                <Text>Forgot password?</Text>
                <TextInput onChange={(e) => setUserName(e.target.value)} placeholder="Email" type="email" />
                <Button onClick={() => login()}>Get reset code</Button>

            </FormContainer>
        </Container>
    )
}

const Container = styled.div`
width: 100vw;
height: 100vh;
background-color: ${Theme.primaryColor};
display: flex;
justify-content: center;
align-items: center;

`

const FormContainer = styled.div`
width: 500px;
height: 400px;
background: White;
padding: 15px;
border-radius: 10px;
display: flex;
flex-direction: column;

`

const TextInput = styled.input`
height: 50px;
border-radius: 5px;
border: 2px solid ${Theme.primaryColor};
margin-top: 20px;
margin-bottom: 10px;
margin-left: 20px;
margin-right: 20px;
padding: 2px;
font-weight: bold;
font-size: medium;

`

const Button = styled.button`
color: white;
height: 50px;
background: ${Theme.primaryColor};
margin-left: 20px;
margin-right: 20px;
border-radius: 5px;
border: none;
margin-top: 20px;
font-weight: bold;
font-size: large;

`

const OutlinedButton = styled.button`
color:  ${Theme.primaryColor};
height: 50px;
margin-left: 20px;
margin-right: 20px;
border-radius: 5px;
border: 2px solid ${Theme.primaryColor};;
margin-top: 20px;
font-weight: bold;
font-size: large;

`

const Logo = styled.img`
width: 70px;
height: 70px;
align-self: center;

`

const Text = styled.p`
font-size: xx-large;
font-weight: bold;
align-self: center;
margin: 10px;
`

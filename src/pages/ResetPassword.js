import React, { useState } from "react";
import styled from "styled-components";
import { Theme } from "../theme/theme";

import { FetchApi } from "../fetch/FetchApi";
import { useLocation, useNavigate } from "react-router-dom";

import { showMessage } from "../helpers/showMessage";

const userPng = require('../assets/user.png')

export const ResetPassword = (props) => {

    const location = useLocation()

    const username =location.state?.username

    const [code, setCode] = useState("")
    const [password, setPassword] = useState("")
    const [confPass, setConfPass] = useState("")

    const navigate = useNavigate()


    const loginCallBack = (status, response) => {

        console.log(response);
     
         if (status && response.status) {
     
    
          let msg = "Password Reset Success"
     
          if (response.message) {
            msg = response.message;
          }
    
          showMessage({ message: msg, type: "success", autoHide: true })
    
          navigate("/login")
          
    
         } else {
     
           let msg = "Unable to reset password"
     
           if (response.message) {
             msg = response.message;
           }
     
           showMessage({ message: msg, type: "danger", autoHide: true })
     
         }
     
       }
     
    
     
     
     
       const login = () => {
     
         if (!code || !password || !confPass) {
     
           showMessage({ message: "All fields are mandatory", type: "danger", autoHide: true })
         } else if (password != confPass){
    
            showMessage({ message: "Passwords do not match", type: "danger", autoHide: true })
    
         } else {
     
           const body = new FormData();
     
           body.append('service', "resetP")
           body.append('username', username)
           body.append('newPass', password)
           body.append('code', code)
     
           FetchApi.MakeRequest("POST", body, loginCallBack);
         }
       }


    return(
        <Container>
            <FormContainer>
                <Logo src={userPng} alt='logo' />
                <Text>Reset password</Text>
                <TextInput onChange={(e)=> setCode(e.target.value) } placeholder="Reset Code" type="number" />
                <TextInput onChange={(e)=> setPassword(e.target.value) } placeholder="New password" type="password" />
                <TextInput onChange={(e)=> setConfPass(e.target.value) } placeholder="Confirm password" type="password" />
                <Button onClick={() => login()}>Reset password</Button>

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
height: 500px;
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

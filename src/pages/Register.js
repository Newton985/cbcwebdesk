import React, { useState } from "react";
import styled from "styled-components";
import { Theme } from "../theme/theme";

import { SubscriptionRepository } from "../repository/SubscriptionRepository";
import { UserRepository } from "../repository/UserRepository";

import { FetchApi } from "../fetch/FetchApi";
import { useNavigate } from "react-router-dom";

import { showMessage } from "../helpers/showMessage";

const userPng = require('../assets/user.png')

export const Register = () => {

    const [name, setName] = useState("")
    const [school, setSchool] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [county, setCounty] = useState("")

    const navigate = useNavigate()

    const goRegister = () => {
        navigate("/login")
    }



    const registrationCallBack = (status, data) => {
        if (status) {

            const datett = +new Date()

            localStorage.setItem("dateCreated", datett.toString())

            goRegister()
        } else {
            showMessage({ message: "User Already Registered", type: "danger", autoHide: true })
        }
    }


    const register = () => {

        if (!name || !school || !password || !email || !phone) {

            showMessage({ message: "All fields are mandatory", type: "danger", autoHide: true })

        } else {

            const deviceId = "X-USER-WEB"
            //(selectedItem, index) => { return selectedItem }
            const formData = new FormData()
            formData.append("service", "register")
            formData.append("email", email)
            formData.append("fullname", name)
            formData.append("password", password)
            formData.append("school", school)
            formData.append("user_type", "single")
            formData.append("tell", phone)
            formData.append("device", deviceId)
            formData.append("county", county)

            FetchApi.MakeRequest("POST", formData, registrationCallBack);

        }

    }

    return (
        <Container>
            <FormContainer>
                <Logo src={userPng} alt='logo' />
                <Text>Create Account</Text>
                <TextInput onChange={(e) => setName(e.target.value)} placeholder="Full name" type="text" />
                <TextInput onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" />
                <TextInput onChange={(e) => setPhone(e.target.value)} placeholder="Phone number" type="number" />
                <TextInput onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
                <TextInput onChange={(e) => setSchool(e.target.value)} placeholder="School" type="text" />
                <TextInput onChange={(e) => setCounty(e.target.value)} placeholder="County" type="text" />
                <Button onClick={() => register()}>Register</Button>

                <OutlinedButton onClick={() => goRegister()} >LOG IN</OutlinedButton>

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
width: 600px;
height: 700px;
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
margin-top: 10px;
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

import React, { useState } from "react";
import styled from "styled-components";
import { Theme } from "../theme/theme";

import { SubscriptionRepository } from "../repository/SubscriptionRepository";
import { UserRepository } from "../repository/UserRepository";

import { FetchApi } from "../fetch/FetchApi";
import { useNavigate } from "react-router-dom";

import { showMessage } from "../helpers/showMessage";

const userPng = require('../assets/user.png')

export const Login = () => {

    const [showProgress, setShowProgress] = useState(false)
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()


    const goRegister = () => {
        navigate("/register")
    }

    const goForgetPass = () => {
        navigate("/forget-password")
    }

    const login = () => {

        if (!username || !password) {

            showMessage({ message: "All fields are mandatory", type: "danger", autoHide: true })
        } else {

            setShowProgress(true)

            const body = new FormData();

            const deviceId = "X-USER-WEB"

            body.append('service', "auth")
            body.append('username', username)
            body.append('password', password)
            body.append('device', deviceId)

            FetchApi.MakeRequest("POST", body, loginCallBack);
        }
    }


    const loginCallBack = (status, response) => {

        if (status && response.status) {

            const user = {
                _id: response.customerID,
                tell: response.tell,
                email: response.username,
                fullname: response.fullname,
                school: response.school,
                isLogged: "true",
                customerID: response.customerID,
                county: response.county

            }



            localStorage.setItem("userEmail", user.email)
            localStorage.setItem("userStr", JSON.stringify(user))

            UserRepository.saveUser(user, (createdUser) => {
                //get User Subscriptions

                const userSubReq = new FormData()
                userSubReq.append("service", "getSubscription")
                userSubReq.append("customerID", user.customerID)

                FetchApi.MakeRequest("POST", userSubReq, (status, response) => {

                    if (status && response) {

                        response.forEach(sub => {

                            const subscription = {
                                code: sub.subscriptionID,
                                customerID: sub.customerID,
                                startsAt: Number.parseInt(sub.startDate),
                                endsAt: Number.parseInt(sub.ExpiryDate),
                                name: "string",
                                grade: sub.gradeID
                            }

                            SubscriptionRepository.saveGradeSubscription(subscription, (saved) => {

                                console.log("SAVEDDDDDDD", saved)

                            })

                        })

                    }

                    const nowDate = +new Date();

                    const trialHours = 3 * 60 * 60 * 1000; // 3 hours

                    const dateC = localStorage.getItem("dateCreated")

                    if (dateC) {
                        const trialStarted = Number.parseInt(dateC)
                        if (nowDate - trialStarted < trialHours) {
                            const trialStart = +new Date();

                            localStorage.setItem("trialStarts", trialStart.toString())

                            alert("Trial", "You have unlocked two hours trial. During this period you can access all content for free.")

                        }
                    }

                })
            })

            //navigate("/home", { replace: true })

        } else {

            let msg = "Incorrect username or password"
            if (response) {
                if (response.massage) {
                    msg = response.massage[0];
                }
            }

            showMessage({ message: msg, type: "danger", autoHide: true })

        }

        setShowProgress(false)
    }



    return (
        <Container>
            <FormContainer>
                <Logo src={userPng} alt='logo' />
                <Text>Login</Text>
                <TextInput onChange={(e) => setUserName(e.target.value)} placeholder="Email" type="email" />
                <TextInput onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
                <Button onClick={() => login()}>Login</Button>
                <OutlinedButton onClick={() => goForgetPass()}>Forgot password?</OutlinedButton>

                <OutlinedButton onClick={() => goRegister()} >REGISTER NOW</OutlinedButton>

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
height: 600px;
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

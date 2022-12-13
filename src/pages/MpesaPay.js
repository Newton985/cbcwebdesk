/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';

import styled from 'styled-components';

import { Theme } from '../theme/theme';
import { showMessage } from '../helpers/showMessage';
import { FetchApi } from '../fetch/FetchApi';
import { SubscriptionRepository } from '../repository/SubscriptionRepository';
import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';


export default function MpesaPay() {

    const isDarkMode = false
    const backgroundStyle = {
        backgroundColor: isDarkMode ? "#f4f4f4" : "#f4f4f4",
    };

    const location = useLocation()

    const { grade, plan } = location.state


    const [mpesaNumber, setMpesaNumber] = React.useState("0")
    const [showProgress, setShowProgress] = useState(false)

    const navigation = useNavigate();


    const sendStkPush = () => {

        if (mpesaNumber && mpesaNumber != "0") {

            let mpn = mpesaNumber;

            if (mpesaNumber.startsWith("0")) {
                mpn = mpesaNumber.replace("0", "254")
            }

           // const amount = plan.cost;

           const amount = 1;

            setShowProgress(true)

            const body = new FormData();


            body.append('service', "pay")
            body.append('msisdn', mpn)
            body.append('amount', amount)
            body.append('deviceId', "X-WEB")

            console.log(body)


            FetchApi.MakeRequest("POST", body, (status, response) => {

                console.log(response)

                if (status) {
                    if (response.CheckoutRequestID) {

                        const checkout = response.MerchantRequestID;

                        setTimeout(() => checkPaymentStatus(checkout, mpn), 10000)


                        showMessage({ type: "info", message: "STK Push Accepted" })

                    } else {

                        setShowProgress(false)
                        showMessage({ message: "Unable to Initiate Mpesa Payment", type: "danger" })

                    }
                } else {
                    setShowProgress(false)
                }

            })


        } else {

            showMessage({ message: "Provide Mpesa Number", type: "danger" })

        }


    }

    let numOfRetries = -1;

    const checkPaymentStatus = (checkout, mpn) => {

        showMessage({ type: "success", message: "Waiting for Mpesa To reply" })

        setShowProgress(true)

        // const url = `http://wintec.co.ke/aipay/confirmPayment.php?checkReqID=${checkout}&deviceID=${devId}&msisdn=${mpn}`

        const formData = new FormData();
        formData.append("service", "confirmP")
        formData.append("checkReqID", checkout);
        formData.append("deviceID", "X-WEB");
        formData.append("msisdn", mpn)


        FetchApi.MakeRequest("POST", formData, (status, response) => {

            if (status && response.id) {

                setShowProgress(false)
                showMessage({ type: "success", message: "payment Sucess" });

                let duration = 0;

                if (plan.name == "DAILY") {
                    duration = +new Date() + (1000 * 60 * 60 * 24)
                }

                else if (plan.name == "WEEKLY") {
                    duration = +new Date() + (1000 * 60 * 60 * 24 * 7)
                }

                else if (plan.name == "MONTHLY") {
                    duration = +new Date() + (1000 * 60 * 60 * 24 * 30)
                }

                else if (plan.name == "MONTHS") {
                    duration = +new Date() + (1000 * 60 * 60 * 24 * 30 * 6)
                }

                else if (plan.name == "YEARLY") {
                    duration = +new Date() + (1000 * 60 * 60 * 24 * 30 * 12)

                }

                const subscription = {
                    code: response.code,
                    customerID: "getLater",
                    startsAt: + new Date(),
                    endsAt: duration,
                    name: "string",
                    grade: grade.gradeID
                }

                SubscriptionRepository.saveGradeSubscription(subscription, (saved) => {

                    console.log("SAVEDDDDDDD")
                    console.log(saved)

                    if (saved) {


                        //SEND TO CPANEL

                        // AsyncStorage.getItem("userStr").then(str => {

                        //     const user = JSON.parse(str)
                        //     const cID = user.customerID

                        //     const subFormData = new FormData();
                        //     subFormData.append("service", "subscription");
                        //     subFormData.append("subscription_Code", subscription.code);
                        //     subFormData.append("gradeID", grade.gradeID);
                        //     subFormData.append("duration", plan.duration);
                        //     subFormData.append("amount", plan.cost);
                        //     subFormData.append("startDate", subscription.startsAt);
                        //     subFormData.append("endDate", subscription.endsAt);
                        //     subFormData.append("customerID", cID)

                        //     FetchApi.MakeRequest("POST", subFormData, (status, data) => {
                        //         console.log("FROM SAVE CPANEL:::::")
                        //         console.log(data)

                        //         setValue("saved cpanel") // force re-render homepage
                        //         navigation.reset({
                        //             index: 0,
                        //             routes: [{ name: 'Home' }]
                        //         })



                        //     })

                        // })



                    }

                })


            } else (
                setTimeout(() => {

                    if (numOfRetries < 3) {

                        numOfRetries += 1;
                        checkPaymentStatus(checkout, mpn)

                    } else {

                        setShowProgress(false);
                        showMessage({ message: "Unable to Verify Payment", type: "danger" })

                    }
                }, 2000)
            )

        })


    }



    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            paddingTop: 20
        }}>
            <Cont>
                <Container
                    selected={false}
                    style={{
                        elevation: 8,
                        shadowColor: Theme.lightShadowColor
                    }}>


                    <DetailsView>
                        <ClassName>{grade.grade}</ClassName>
                        <ClassStatus>Full Access</ClassStatus>
                    </DetailsView>

                </Container>



                <Container
                    selected={true}
                    style={{
                        elevation: 8, shadowColor: Theme.lightShadowColor
                    }}
                >

                    <CheckBox checked={true}>
                        <input type="checkbox" checked={true} />
                    </CheckBox>

                    <VerticalV>
                        <PlanName>{plan.duration} Access</PlanName>
                        <PlanCost>Ksh {plan.cost} /-</PlanCost>
                    </VerticalV>

                </Container>



                <TextInput type="number" placeholder={"Enter Mpesa Number"}
                    onChange={(e) => setMpesaNumber(e.target.value)}
                />


                <MPressable onClick={() => sendStkPush()}>
                    <LoginButton>Pay Now</LoginButton>
                </MPressable>

            </Cont>


            {
                showProgress && <ProgressView>
                    <Spinner />
                    <h1>Waiting for Mpesa to reply</h1>
                </ProgressView>
            }


        </div>
    )
}

const Cont = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
height: 100%;
padding: 10px;
background: #F4f4f4;
width: 50%;


`

const LoginButton = styled.p`
  color: white;
  font-weight: bold;
  margin: auto;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-self: center;
  width: 100%;
  cursor: pointer;
 `
const MPressable = styled.div`
 background: ${Theme.orangeColor};
 border-radius: 5px;
 height: 50px;
 margin-top: 10px;
 display: flex;
 justify-content: center;
 margin-top: 50px;
 align-self: center;
 width: 100%;
 `



const Container = styled.div`
background: ${props => props.selected ? '#bf94e4' : '#ffffff'};
display: flex;
flex-direction: row;
align-items: center;
height: 70px;
padding: 10px;
width: 90%;
border-radius: 5px;
margin-bottom: 12px;
align-self: center;

`

const VerticalV = styled.div`
display: flex;
flex-direction: column;
margin-left: 30px;

`

const PlanName = styled.p`
font-weight: bold;
color: black;
margin: 5px;
font-size: 17px;
max-width: 200px;

`


const PlanCost = styled.p`
font-weight: bold;
margin: 5px;
font-size: 17px;
color: #006607;

`

const DetailsView = styled.div`
display: flex;
flex-direction: column;
min-width: 150px;

`

const ClassName = styled.p`
font-size: 20px;
font-weight: bold;
color: ${Theme.blackColor};
margin-top: 5px;
margin-bottom: 5px;
border-radius: 7px;

`

const ClassStatus = styled.p`
border-radius: 7px;
color: #006607;
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

const CheckBox = styled.label`
width: 20px;
height: 20px;
background: #7730E5;
`

const ProgressView = styled.div`
background-color: #FFFFFFCC;
position: absolute;
width: 100%;
height: 100%;
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;
`

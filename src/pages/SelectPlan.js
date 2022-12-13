import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PlanItem from '../components/planItem';
import { Theme } from "../theme/theme";
import { FetchApi } from '../fetch/FetchApi';
import { showMessage } from "../helpers/showMessage";
import { useLocation, useNavigate } from 'react-router-dom';

export default function SelectPlan() {

    const location = useLocation()

    const [selectedPlan, selectPlan] = useState({});
    const [paymentPlans, setPaymentPlans] = useState([])
    const [showProgress, setShowProgress] = useState(true)

    const grade = location.state

    const navigate = useNavigate()

    const continueTo = () => {
        if (selectedPlan.duration) {
            navigate("/payment", {state: { grade: grade, plan: selectedPlan }})
        } else {
            showMessage({ message: "Select a Plan", type: "danger", autoHide: true })

        }
    }

    useEffect(() => {
        const formData = new FormData()
        formData.append("service", "rates")
        formData.append("gradeID", grade.gradeID);

        console.log(formData)

        FetchApi.MakeRequest("POST", formData, (status, data) => {

            const mPlans = [];


            const daily = {
                name: "DAILY",
                duration: "1 Day",
                cost: data.daily,
                rateID: data.rateID
            }

            mPlans.push(daily)


            const weekly = {
                name: "WEEKLY",
                duration: "1 Week",
                cost: data.weekly,
                rateID: data.rateID
            }

            mPlans.push(weekly)


            const monthly = {
                name: "MONTHLY",
                duration: "1 Month",
                cost: data.monthly,
                rateID: data.rateID
            }

            mPlans.push(monthly)

            const moths6 = {
                name: "MONTHS",
                duration: "6 Months",
                cost: data['6months'],
                rateID: data.rateID
            }

            mPlans.push(moths6)

            const yearly = {
                name: "YEARLY",
                duration: "1 Year",
                cost: data.yearly,
                rateID: data.rateID
            }

            mPlans.push(yearly)

            setPaymentPlans(mPlans)
            setShowProgress(false)
        })

    }, [])


    const setSelectedPlan = (selectedPlan) => {

        selectPlan(selectedPlan)
    }

    return (

        <Cont>

            <Container>

                <h2>Unlocking : {grade.grade}</h2>

                <FList>

                    {
                        paymentPlans.map((item, index) =>
                            <PlanItem plan={item} key={index}
                                selected={selectedPlan}
                                onChanged={setSelectedPlan}
                            />)
                    }

                </FList>

            </Container>

            <MPressable onClick={continueTo}>
                <LoginButton>Continue To Pay</LoginButton>
            </MPressable>

        </Cont>
    )

}


const Cont = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
height: 100%;
padding-bottom: 10px;
background: #F4f4f4;


`

const FList = styled.div`
width: 50%;
padding-bottom: 20px;
padding-top: 10px;
`

const Container = styled.div`
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
padding-bottom: 10px;
`

const LoginButton = styled.p`
 color: white;
 font-weight: bold;
 margin: auto;
 font-size: 20px;
 text-align: center;
 width: 400px;

`
const MPressable = styled.div`
background: ${Theme.orangeColor};
border-radius: 5px;
height: 50px;
margin-left: 10px;
margin-right: 10px;
margin-top: 10px;
display: flex;
justify-content: center;
width: 400px;
align-self: center;
cursor: pointer;

`
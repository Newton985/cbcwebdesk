import React, { useState } from "react";
import styled from "styled-components";
import { Theme } from "../theme/theme";


export default function PlanItem(props) {

  const plan = props.plan
  const selected = props.selected
  const onChanged = props.onChanged

  const setSelection = () => {
    onChanged(plan)
  }

  return (
    <MPress
      onClick={setSelection}
    >
      <Container
        selected={selected.name == plan.name}
        style={{
          elevation: 8, shadowColor: Theme.lightShadowColor
        }}
      >

        <CheckBox checked={selected.name == plan.name}>
          <input type="checkbox" checked={selected.name == plan.name} />
        </CheckBox>

        <VerticalV>
          <PlanName>{plan.duration} Access</PlanName>
          <PlanCost>Ksh {plan.cost} /-</PlanCost>
        </VerticalV>

      </Container>
    </MPress>
  )
}

const MPress = styled.div`
width: 100%;
background: #f4f4f4;
cursor: pointer;

`

const Container = styled.div`
background: ${props => props.selected ? '#bf94e4' : '#ffffff'};
display: flex;
flex-direction: row;
align-items: center;
height: 70px;
padding: 10px;
width: 90%;
margin-left: 5%; 
margin-right: 5%; 
border-radius: 5px;
margin-bottom: 12px;

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

const CheckBox = styled.label`
width: 20px;
height: 20px;
background: ${props => props.checked ? '#7730E5' : '#7730E51E'};
`

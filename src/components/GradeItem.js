import React, { useState } from "react";
import styled from "styled-components";
import { ICONBASEURL } from "../endpoints";
import { Theme } from "../theme/theme";
import LearningAreaItem from "./LearningAreaItem";

export const GradeItem = (props) => {

    const { grade, gradeID, subjects, icon_url, color1, color2 } = props.item
    const { open, setUnCollapsedGrade, index, setStrands, setUnCollapsedStrand,
        setActiveGrade, setActiveLArea, setColors } = props

    const [status, setStatus] = useState("Locked");


    return (
        <div>
            <Constainer
                onClick={() => {
                    if (status != "Locked") { setUnCollapsedGrade(index) }
                    setActiveGrade(props.item)
                    setActiveLArea("")
                    setColors([color1, color2])
                }}
                style={{ background: `linear-gradient(${color1}, ${color2})` }}>
                <DetailsContainer>
                    <GradeName>{grade}</GradeName>
                    <Line />
                    <Status>{status}</Status>
                </DetailsContainer>
                <Image src={ICONBASEURL(icon_url)} />
            </Constainer>

            {
                open &&
                <>
                    {
                        subjects.map((subject, index) => <LearningAreaItem
                            setStrands={setStrands}
                            index={index} item={subject}
                            setUnCollapsedStrand={setUnCollapsedStrand}
                            setActiveLArea={setActiveLArea} />)
                    }
                </>
            }
        </div>

    )
}

const Constainer = styled.div`
border-radius: 10px;
padding: 10px;
display: flex;
flex-direction: row;
align-items: center;
margin-top: 10px;
margin-right: 10px;
justify-content: space-between;
cursor: pointer;

`

const DetailsContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

`

const GradeName = styled.h5`
font-weight: bold;
color: ${Theme.background};
margin: 5px;
font-size: x-large;

`

const Line = styled.div`
height: 3px;
background-color: #FFFFFF;
width: 100px;

`

const Status = styled.h6`
font-weight: bold;
color: ${Theme.background};
margin: 5px;
font-size: large;

`

const Image = styled.img`
height: 100%;
width: 50px;
margin: 5px;
align-self: center;

`
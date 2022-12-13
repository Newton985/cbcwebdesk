import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Theme } from "../theme/theme";
import { useNavigate } from "react-router-dom";
import { ICONBASEURL } from "../endpoints";
import { ContentContext } from "../context/ContentContext";


export default function LearningAreaItem(props) {

    const { subject, status, strands, icon_url, subjectID } = props.item
    const {setStrands, setUnCollapsedStrand, setActiveLArea } = props
    const gradeID = props.gradeID
    const color = props.bgColor
    const navigate = useNavigate();
    const grade = props.grade
    const index = props.index

    const [percentageCover, setPercentageCover] = useState(0)

    useEffect(() => {
        //   //get total Number of Substrands in learningArea

        //   ContentRepository.getSubStrandsSubject(subjectID, (substrands) => {

        //   if(substrands){

        //     //get opened subs for subject
        //     StatsRepository.getOpenedSubStrandsSubject(subjectID, (openedSubs) => {

        //       if(openedSubs) {

        //         const pCover = Math.floor((openedSubs.length/substrands.length)*100)
        //         setPercentageCover(pCover)

        //       }

        //     })
        //   }

        //   })      

    }, [])


    const openStrands = () => {

        setUnCollapsedStrand(-1)
        setStrands(strands)
        setActiveLArea(subject)

        const openedLAItem = {
            learningAreaID: subjectID,
            gradeID: gradeID
        }

        //   StatsRepository.saveOpenedLearningArea(openedLAItem, (saved) => {
        //     if(saved){
        //       console.log("SAVED OPEN LA")
        //     }
        //   })

        // navigation.navigate("Strands", {strands : strands, routeLocation : grade + " - "+ subject, learningAreaID : subjectID, color: color} )
    }

    return (
        <MPress
            onClick={openStrands}
            index={index}

        >
            <Card >

                <CardImage
                    src={ICONBASEURL(icon_url)}
                />

                <DetailsView>
                    <ClassName>{subject}</ClassName>
                    {/* <ClassStatus>{percentageCover}% Covered</ClassStatus> */}
                </DetailsView>

            </Card>
        </MPress>
    )
}

const MPress = styled.div`
 width: 95%;
 margin-left: 2.5%;
 margin-right: 2.5%;
 margin-top: 5px;
 background: ${Theme.lightBackground};
 border-radius: 5px;
 cursor: pointer;

`

const Card = styled.div`
display: flex;
align-items: center;
flex-direction: row;
align-items: center;
height: 70px;
border-radius: 5px;

`

const CardImage = styled.img`
height: 70px;
width: 60px;
border-top-left-radius: 5px;
border-bottom-left-radius : 5px;

`

const DetailsView = styled.div`
display: flex;
flex-direction: column;
width: 200px;
margin-left: 10;
margin-right: 10;
justify-content: center;

`

const ClassName = styled.p`
font-size: 15px;
font-weight: bold;
color: ${Theme.textColor};
margin-top: 1px;
margin-bottom: 1px;
margin-left: 5px;

`

const ClassStatus = styled.p`
font-weight: bold;
color: ${Theme.lightPrimaryColor};
font-size: 13px;
margin-top: 1px;
margin-bottom: 1px;
margin-left: 5px;

`


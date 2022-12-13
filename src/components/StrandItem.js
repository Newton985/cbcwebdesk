import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Theme } from "../theme/theme";
import { ContentRepository } from '../repository/ContentRepository';
import { useNavigate } from "react-router-dom";
import { ICONBASEURL } from "../endpoints";
import SubStrandItem from "./SubstrandItem";


export default function StrandItem(props) {

    const { topic, status, strandID, subStrands, icon_url } = props.item
    const { open, setUnCollapsedStrand, index } = props
    const navigate = useNavigate()
    const grade = props.grade
    const subjectID = props.subjectID
    const color = props.color

    const [percentageCover, setPercentageCover] = useState(0)


    useEffect(() => {

        //get subs for strand 
        // ContentRepository.getSubStrands(strandID, (substrands) => {

        // if(substrands){
        //   //get opened subs for strand

        //   StatsRepository.getOpenedSubStrands(strandID, (openedSubs) => {

        //     if(openedSubs){
        //       const cPct = Math.floor((openedSubs.length/subStrands.length)*100)
        //       setPercentageCover(cPct)
        //     }

        //   })


        // }

        // })

    }, [])




    function openSubStrands() {

        setUnCollapsedStrand(index)

        const strandTos = {
            _id: strandID,
            strandID: strandID,
            subjectID: subjectID,
        }

        //    StatsRepository.saveOpenedStrand(strandTos, (savedStrand) => {

        //     navigation.navigate("Sub-Strands", {subStrands: subStrands, color : color,
        //       routeLocation : grade + " - "+ topic, strandID: strandID, subjectID : subjectID})

        //    })

    }

    return (
        <div>
            <MPress
                onClick={() => openSubStrands()}
                index={index}

            >
                <Card >

                    <CardImage
                        src={ICONBASEURL(icon_url)}
                    />

                    <ClassName>{topic}</ClassName>
                    {/* <ClassStatus>{percentageCover}% Covered  </ClassStatus> */}

                </Card>
            </MPress>

            {
                open &&
                <>
                    {
                        subStrands.map(subStrand => <SubStrandItem class={subStrand} strandID={strandID} subjectID={subjectID} />)
                    }
                </>
            }

        </div>
    )
}

const MPress = styled.div`
 width: 95%;
 margin-left: 2.5%;
 margin-right: 2.5%;
 margin-top: 10px;
 background: ${Theme.lightBackground};
 border-radius: 9px;
 border: .5px solid ${Theme.primaryColor};
 
`

const Card = styled.div`
display: flex;
align-items: center;
flex-direction: row;
align-items: center;
height: 70px;
border-radius: 9px;
cursor: pointer;

`

const CardImage = styled.img`
height: 70px;
width: 60px;
border-top-left-radius: 9px;
border-bottom-left-radius : 9px;

`

const DetailsView = styled.div`
display: flex;
flex-direction: column;
margin-left: 10;
margin-right: 10;
justify-content: center;

`

const ClassName = styled.p`
font-size: 20px;
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

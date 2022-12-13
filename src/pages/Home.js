import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Theme } from "../theme/theme";
import { FetchApi } from "../fetch/FetchApi";
import { GradeItem } from "../components/GradeItem";
import { ContentContext, ContentContextProvider } from "../context/ContentContext";
import StrandItem from "../components/StrandItem";
import { useNavigate } from "react-router-dom";

export const Home = () => {

    const navigate = useNavigate()

    const [classes, setClasses] = useState([])
    const [showProgress, setShowProgress] = useState(true)
    const [numberOfGrades, setNumberOfGrades] = useState(0)
    const [numberOfUnlockedGrades, setNumberOfUnlockedGrades] = useState(0)
    const [numberOfOpenedGrades, setNumberOfOpenedGrades] = useState(0)


    const [unCollapsedGrade, setUnCollapedGrade] = useState(-1)
    const [unCollapsedStrand, setUnCollapsedStrand] = useState(-1)

    const [strands, setStrands] = useState([])

    const [colors, setColors] = useState(['#7730E5', '#7730E5'])
    const [activeGrade, setActiveGrade] = useState({})
    const [activeLArea, setActiveLArea] = useState('')

    const [lockStatus, setLockStatus] = useState('Locked')


    useEffect(() => {
        getUserSub()
    }, [])


    const getUserSub = () => {
        //get User Subscriptions

        const userStr = localStorage.getItem("userStr")

        const user = JSON.parse(userStr)

        const userSubReq = new FormData()
        userSubReq.append("service", "getSubscription")
        userSubReq.append("customerID", user.customerID)

        console.log(userSubReq)

        FetchApi.MakeRequest("POST", userSubReq, (status, response) => {

            console.log("::::::::::::::::::::::::::::::::::::::::::::;")
            // console.log(response)

            if (status && response) {

                response.forEach(sub => {

                    const subscription = {
                        code: sub.substrandID,
                        customerID: sub.customerID,
                        startsAt: Number.parseInt(sub.startDate),
                        endsAt: Number.parseInt(sub.ExpiryDate),
                        name: "string",
                        grade: sub.gradeID
                    }

                    //SAVE SUBS

                })


            }
        })

        fetchData();



    }



    const fetchData = () => {


        const email = localStorage.getItem("userEmail")

        const formData = new FormData()
        formData.append("service", "content")
        formData.append("username", email)

        FetchApi.MakeRequest("POST", formData, (status, data) => {

            if (status) {

                //console.log(data)

                setClasses(data)
                fetchStatistics(data);
                saveOfflineData(data)

                localStorage.setItem("longString", JSON.stringify(data))

            } else {

                //Fetch failed // Try Offline

                // ContentRepository.getAllGrades((grades) => {


                //     if (grades) {

                //         const mGrades = Array()
                //         grades.forEach((grade) => {

                //             //get subjects
                //             ContentRepository.getSubjects(grade.gradeID, (subjects) => {

                //                 const mSubjects = Array()
                //                 subjects.forEach((subject) => {

                //                     ContentRepository.getStrands(subject.subjectID, (strands) => {


                //                         const mStrands = Array()

                //                         strands.forEach((strand) => {

                //                             //get substrands
                //                             ContentRepository.getSubStrandsStrand(strand.strandID, (substrands) => {

                //                                 strand.substrands = substrands
                //                                 mStrands.push(strand)

                //                             })


                //                         })

                //                         subject.strands = mStrands
                //                         mSubjects.push(subject)


                //                     })


                //                 })


                //                 grade.subjects = mSubjects
                //                 mGrades.push(grade)



                //             })

                //         })

                //         console.log("GRADES:::")
                //         console.log(mGrades)

                //         //  setClasses(mGrades)

                //         AsyncStorage.getItem("longString").then((longString) => {
                //             const dat = JSON.parse(longString)
                //             setClasses(dat)
                //             fetchStatistics(dat);
                //         }).catch(err => console.log(err))



                //     } else {

                //         //No data in offline - request data 
                //         Alert.alert('Error', 'You need to be online for this operation. Turn On your data and try again',
                //             [
                //                 {
                //                     text: "Retry",
                //                     style: "default",
                //                     onPress: () => fetchData()
                //                 }
                //             ]
                //         );


                //     }

                // })

            }

        })



    }



    const fetchStatistics = (data) => {

        setNumberOfGrades(data.length)


        // SubscriptionRepository.getAllSubscription((subs) => {
        //     if (subs) {
        //         const num = subs.length;
        //         setNumberOfUnlockedGrades(num)
        //     }
        // })


        // StatsRepository.getOpenedGrades((openedGrades) => {
        //     const num = openedGrades.length
        //     setNumberOfOpenedGrades(num)
        // })


    }




    const saveOfflineData = (data) => {


        // data.forEach(grade => {

        //     grade._id = grade.gradeID;

        //     ContentRepository.saveGrade(grade, () => { })

        //     grade.subjects.forEach(subject => {

        //         subject._id = subject.subjectID
        //         subject.gradeID = grade.gradeID
        //         ContentRepository.saveSubject(subject, () => { })

        //         subject.strands.forEach(strand => {

        //             strand._id = strand.strandID
        //             strand.subjectID = subject.subjectID
        //             ContentRepository.saveStrand(strand, () => { })

        //             strand.subStrands.forEach(substrand => {

        //                 substrand.strandID = strand.strandID
        //                 substrand.fileUrl = "0"
        //                 substrand._id = substrand.substrandID
        //                 substrand.subjectID = subject.subjectID

        //                 ContentRepository.saveSubStrand(substrand, () => { })

        //             })

        //         })

        //     })



        // })



    }



    return (
        <ContentContextProvider>
            <Container style={{ backgroundColor: `${colors[0]}65` }}>

                <SideBar>
                    <LogoContainer>

                    </LogoContainer>

                    <GradesHeader>Grades</GradesHeader>

                    {
                        classes.map((clazz, index) => <GradeItem
                            key={index}
                            item={clazz}
                            open={unCollapsedGrade == index}
                            index={index}
                            setUnCollapsedGrade={setUnCollapedGrade}
                            setStrands={setStrands}
                            setUnCollapsedStrand={setUnCollapsedStrand}
                            setActiveGrade={setActiveGrade}
                            setActiveLArea={setActiveLArea}
                            setColors={setColors} />)
                    }

                </SideBar>

                <BodyContainer>

                    {
                        lockStatus == "Locked" ?
                            <UnlockView>
                                <h2 style={{
                                    textAlign: "center"
                                }}>Content Locked!</h2>
                                <Button
                                onClick={() => {
                                    navigate('/plans', { state: activeGrade})
                                }}
                                >Unlock Now</Button>
                            </UnlockView>

                            :

                            <ContentContainer>

                                <StrandTopContainer style={{ background: `linear-gradient(${colors[0]}, ${colors[1]})` }}>
                                    <GradeTitle>{activeGrade.grade}</GradeTitle>
                                    <WhiteLine />
                                    <GradeName>{activeLArea}</GradeName>
                                </StrandTopContainer>


                                <StrandsTitle>
                                    Strands
                                </StrandsTitle>

                                <StrandsContainer>
                                    {
                                        strands.map((strand, index) =>
                                            <StrandItem
                                                key={`${index}`}
                                                index={index}
                                                item={strand}
                                                open={unCollapsedStrand == index}
                                                setUnCollapsedStrand={setUnCollapsedStrand} />)

                                    }
                                </StrandsContainer>

                            </ContentContainer>
                    }


                    <ProfileContainer>
                        <Avatar />
                        <DetailCard>
                            <DetailIcon />
                            <div>
                                <DetailName>Name</DetailName>
                                <p>Calachi Monale</p>
                            </div>
                        </DetailCard>
                        <DetailCard>
                            <DetailIcon />
                            <div>
                                <DetailName>Name</DetailName>
                                <p>Calachi Monale</p>
                            </div>
                        </DetailCard>
                        <DetailCard>
                            <DetailIcon />
                            <div>
                                <DetailName>Name</DetailName>
                                <p>Calachi Monale</p>
                            </div>
                        </DetailCard>
                        <DetailCard>
                            <DetailIcon />
                            <div>
                                <DetailName>Name</DetailName>
                                <p>Calachi Monale</p>
                            </div>
                        </DetailCard>
                        <DetailCard>
                            <DetailIcon />
                            <div>
                                <DetailName>Name</DetailName>
                                <p>Calachi Monale</p>
                            </div>
                        </DetailCard>
                    </ProfileContainer>

                </BodyContainer>

            </Container>

            <ContentContext.Consumer>
                {
                    value =>
                        value.playerOpen && (
                            <div>
                                <PlayerView src={value.activeUrl} />
                                <ClosePlayer title="Close" onClick={() => value.setPlayerOpen(false)}>X</ClosePlayer>
                            </div>
                        )
                }
            </ContentContext.Consumer>

        </ContentContextProvider>
    )
}

const Container = styled.div`
height: 100%;
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
padding: 20px;
`

const SideBar = styled.div`
height: 95vh;
width: 20%;
overflow-y: scroll;
`

const LogoContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
background-color: ${Theme.background};
border-radius: 10px;
margin-top: 10px;
margin-bottom: 10px;
height: 100px;
width: 200px;
background-color: blueviolet;

`

const GradesHeader = styled.p`
font-weight: bolder;
font-size: x-large;
color: ${Theme.primaryColor};
align-self: center;
`

const BodyContainer = styled.div`
border-radius: 25px;
background-color: white;
height: 95vh;
width: 85%;
display: flex;
flex-direction: row;
margin-left: 10px;

`

const ContentContainer = styled.div`
width: 70%;
height: 100%;
padding: 10px;
display: flex;
flex-direction: column;

`

const ProfileContainer = styled.div`
width: 30%;
display: flex;
flex-direction: column;
align-items: center;
margin: 10px;
padding-top: 20px;

`

const StrandsTitle = styled.p`
color: ${Theme.primaryColor};
font-weight: bolder;
font-size: x-large;

`

const PlayerView = styled.iframe`
position: absolute;
top: 0;
width: 100%;
height: 98%;
padding: 10px;
background-color: black;

`

const StrandTopContainer = styled.div`
border-radius: 10px;
padding: 10px;
display: flex;
flex-direction: row;
height: 50px;

`

const GradeTitle = styled.p`
font-size: large;
font-weight: bolder;
color: yellow;

`

const WhiteLine = styled.div`
background-color: white;
width: 5px;
margin-left: 20px;
margin-right: 20px;
height: '100%';
`

const GradeName = styled.p`
font-size: large;
font-weight: bolder;
color: white;

`

const ClosePlayer = styled.p`
position: absolute;
font-size: xx-large;
color: red;
background-color: #000000CC;
border-radius: 10px;
top: 0;
margin: 30px;
padding: 15px;
cursor: pointer;
display: flex;
right: 0;
justify-content: center;
font-weight: bolder;

`

const StrandsContainer = styled.div`
background-color: whitesmoke;
padding: 5px;
width: '100%';
flex: auto;
overflow-y: scroll;
margin-bottom: 20px;
border-bottom-left-radius: 10px;

`

const Avatar = styled.img`
width: 100px;
height: 100px;
border-radius: 50%;
background-color: wheat;

`

const DetailCard = styled.div`
display: flex;
flex-direction: row;
width: 100%;
box-shadow: rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;
align-items: center;
margin: 10px;

`

const DetailIcon = styled.div`
width: 20px;
height: 20px;
border-radius: 50%;
border-color: blueviolet;
border-width: 10px;
background-color: wheat;
margin: 5px;
margin-right: 20px;
`

const DetailName = styled.p`
font-size: medium;
font-weight: bold;
margin-left: 5px;
margin-right: 5px;
margin-top: 5px;
margin-bottom: -10px;

`

const UnlockView = styled.div`
width: 70%;
height: 100%;
padding: 10px;
display: flex;
flex-direction: column;
justify-content: center;

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
width: 400px;
align-self: center;
cursor: pointer;

`
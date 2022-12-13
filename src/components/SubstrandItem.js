import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Theme } from "../theme/theme";
// import * as Progress from 'react-native-progress';
// import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
// import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import { EndPoints } from '../constants/Constants';
import { useNavigate } from "react-router-dom";
import { ContentContext } from "../context/ContentContext";


export default function SubStrandItem(props) {

    const { substrand, substrandID, zipUrl, icon_url, updateID } = props.class
    const strandID = props.strandID;
    const navigation = useNavigate()
    const index = props.class.index
    const subjectID = props.subjectID

    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState(0)
    const [updateRequired, setUpdateRequired] = useState(false)

    const zipUrl1 = EndPoints.FILEBASEURL + zipUrl;

    const [status, setStatus] = useState("Tap to Download")
    const [isOffline, setIsOffline] = useState(false)
    const [offlineUrl, setOfflineUlr] = useState("")


    const { setActiveUrl, setPlayerOpen } = useContext(ContentContext)

    const onDownloadProgress = (percentage) => {
        setDownloadProgress(percentage);
    }

    const onDownloadComplete = (filePath) => {
        setIsDownloading(false)

        if (filePath) {
            console.log("UNZIPPED:::::::")
            console.log(filePath)

            setOfflineUlr(filePath)

            setStatus("Tap to Learn")
            setIsOffline(true)

            persistOffline(filePath)

        }
    }

    useEffect(() => {

        // ContentRepository.getSubStrands(substrandID, (subFromDb) => {

        //     if (subFromDb.length > 0 && (subFromDb[0].fileUrl != "0")) {
        //         subFromDb = subFromDb[0]

        //         setIsOffline(true)
        //         setOfflineUlr(subFromDb.fileUrl)
        //         setStatus("Tap to Learn")

        //         if (subFromDb.updateID != updateID) {
        //             setStatus("Tap to Learn (update available)")
        //             setUpdateRequired(true)
        //         }

        //     }

        // })

    }, [])



    const persistOffline = (offlinePath) => {

        // const substrandTos = {
        //     substrand: substrand,
        //     _id: substrandID,
        //     zipUrl: zipUrl,
        //     fileUrl: offlinePath,
        //     substrandID: substrandID,
        //     strandID: strandID,
        //     subjectID: subjectID,
        //     updateID: updateID
        // }


        // ContentRepository.saveSubStrand(substrandTos, (savedSub) => {
        //     if (savedSub) {
        //         console.log("PERSISTED OFFLINE")

        //     }

        //     else {

        //         ContentRepository.getAndUpdateSubStrand(substrandTos, (updatedSub) => {
        //             if (updatedSub) {
        //                 console.log("UPDATED SUBB")
        //                 console.log(updatedSub)
        //             } else {
        //                 console.log("NOT SAVED")
        //             }
        //         })


        //     }
        // })

        setUpdateRequired(false)

    }


    const startUpdate = () => {
        const pathSplit = offlineUrl.split("/");
        pathSplit.pop(); pathSplit.pop();

        const fileP = pathSplit.join("/")

        console.log("TO DELETE ::", fileP)

        // FileService.deleteFile(fileP, () => {
        //     console.log("DELETED ")
        // })

        startDownload()

    }


    const startDownload = () => {
        // setIsDownloading(true)
        // FileService.downloadFile(zipUrl1, "substrand_" + substrandID,
        //     onDownloadProgress, onDownloadComplete)
    }


    function openSubStrands() {

        setPlayerOpen(true)

        const cUrl = EndPoints.FILEBASEURL + zipUrl.replace(".zip", "") + "/index.html"
        // const fileUrl = EndPoints.FILEBASEURL + "/klickit/uploads/Animals - Storyline output"+"/index.html"
        console.log(cUrl)
        setActiveUrl(cUrl)

        //  setActiveUrl("https://content.infoneysolutions.com/klickit/uploads/Addition%20-%20Storyline%20output/index.html")

        // if (isOffline) {

        //     const openedSubStrand = {
        //         strandID: strandID,
        //         subStrandID: substrandID,
        //         subjectID: subjectID
        //     }

        //     StatsRepository.saveOpenedSubStrand(openedSubStrand, (savedSubStrand) => {

        //         if (updateRequired) {

        //             Alert.alert(
        //                 "Update ?",
        //                 "Sub strand has been updated. Do you want to download the new one ?",
        //                 [
        //                     {
        //                         text: "No",
        //                         onPress: () => navigation.navigate("Learn", { url: offlineUrl }),
        //                         style: "cancel"
        //                     },

        //                     {
        //                         text: "Yes, Download",
        //                         onPress: () => startUpdate(),
        //                         style: "default"
        //                     }
        //                 ],
        //                 {
        //                     cancelable: false
        //                 }

        //             )

        //         } else {
        //             navigation.navigate("Learn", { url: offlineUrl })
        //         }

        //     })

        // } else {
        //     startDownload()
        // }
    }

    return (
        <MPress
            onClick={openSubStrands}
            style={{
                elevation: 7, shadowColor: Theme.lightShadowColor
            }}
            index={index}

        >
            <Card >

                <CardImage
                    src={EndPoints.FILEBASEURL + icon_url}
                />

                <ClassName>{substrand}</ClassName>
                <ClassStatus>{isDownloading ? "Downloading.." : status}</ClassStatus>

                {/* {
                        isDownloading && <Progress.Bar progress={downloadProgress}
                            color={Theme.primaryColor} width={200} />
                    } */}


                {/* <FontAwesomeIcon
                    icon={faArrowCircleRight}
                    color={status == 'Tap to Learn' ? '#340368' : 'gray'}
                    style={{
                        marginRight: 10
                    }} /> */}
            </Card>
        </MPress>
    )
}

const MPress = styled.div`
 width: 90%;
 margin-left: 7.5%;
 margin-right: 2.5%;
 margin-top: 10px;
 background: #a7d2ff1e;
 border-radius: 9px;
 border: .5px solid ${Theme.primaryColor};
 cursor: pointer;
 
`

const Card = styled.div`
display: flex;
align-items: center;
flex-direction: row;
align-items: center;
height: 70px;
border-radius: 9px;

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
font-size: 18px;
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
margin-left: auto;
margin-right: 10px;

`

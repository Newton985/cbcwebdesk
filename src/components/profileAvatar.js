import React, {useState, useEffect} from "react"
import styled from "styled-components"


const defImage = require("../assets/images/userprofile.png");

export default function ProfileAvatar() {

    const [photo, setPhoto] = useState("https://www.seekpng.com/png/detail/966-9665493_my-profile-icon-blank-profile-image-circle.png")

    useEffect(() => {


    }, [])

    const getPhoto = () => {
        FileService.downloadFile("", "", "", (file) => {
            setPhoto(file)
        }, "PPP")
    }

    return (
        <UserPIcon onPress={getPhoto}>
            <ProfileImage
                source={
                    photo ? {
                        uri: photo
                    } : defImage}
            />
        </UserPIcon>
    )

}


const ProfileImage = styled.img`
margin: 10px;
width: 30px;
height: 30px;
border-radius: 30px;

`

const UserPIcon = styled.div`
height: 30px;
width: 30px;
margin-bottom: 15px;
margin-right: 25px;

`
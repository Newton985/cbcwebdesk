
export const Theme = {
    primaryColor : "#7730E5",
    orangeColor: "#EF820C",
    yellowColor: "#FFFF00",
    darkPrimaryColor: "",
    lightPrimaryColor : "#8460F4",
    textColor : "#001A5A",
    background: "#FCF6E6",
    itemsBackground : "#faebd7",
    lightBackground: "#ffffff",
    darkBackground: "",
    lightShadowColor: "#ffffff",
    darkShadowColor: "",
    blackColor: "#000000",
    randomColor : () =>{
        var randomColor = Math.floor(Math.random()*16777190).toString(16);
        return "#"+randomColor
    },
    randomOpacedColor : (num) => {
        var randomColor = Math.floor(Math.random()*16777190+num).toString(16);
        return "#"+randomColor+"CC"
    }

}
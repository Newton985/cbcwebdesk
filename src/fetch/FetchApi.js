import { BASEURL } from '../endpoints';
var base64 = require('base-64');

export const FetchApi = {

    MakeRequest: (method, body, callback) => {

        console.log("MAKING REQUEST ::::")

        const auth = base64.encode("klickit:Klickit@2022")


        fetch(BASEURL, {
            method: "POST",
            body: body,
            headers: {
                'Authorization': 'Basic ' + auth,
            }
        })
            .then((res) => {
                return res.json()
            })
            .then(response => {
                callback(true, response)

            })
            .catch((error) => {
                console.log("ERROR", error.message)
                callback(false, undefined)
            })
    }

}


export const FetchApi2 = {

    MakeRequest: (url, body, callback) => {

        console.log("MAKING REQUEST ::::")

        const auth = btoa("klickit:Klickit@2022")

        fetch(url, {
            method: "POST",
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Basic ' + auth
            },
            body: body
        })
            .then((res) => {
                console.log(res)
                return res.json()
            })
            .then(response => {

                callback(true, response)
                console.log(response)

            })
            .catch((error) => {
                console.log(error.message)
                callback(false, undefined)
            })
    }

}
export const Grade = {
    name: "Grade",
    properties: {
        _id: "string",
        grade: "string",
        gradeID: "string",
        icon_url: "string",

    },
    primaryKey: "_id"
}

export const Subject = {
    name: "Subject",
    properties: {
        gradeID: "string",
        _id: "string",
        subjectID: "string",
        subject:"string",
        icon_url: "string"
    },
    primaryKey:"_id"
}

export const Strand = {
    name:"Strand",
    properties: {
        topic:"string",
        _id: "string",
        subjectID:"string",
        strandID: "string",
        icon_url: "string"
    },
    primaryKey:"_id"
}

export const SubStrand = {
    name:"SubStrand",
    properties:{
        substrand:"string",
        _id :"string",
        substrandID:"string",
        zipUrl:"string",
        fileUrl:"string",
        strandID: "string",
        subjectID : "string",
        icon_url: "string",
        updateID: "string"
    },
    primaryKey:"_id"
}
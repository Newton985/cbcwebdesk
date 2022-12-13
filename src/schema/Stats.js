export const UnlockedGrade = {
    name: "UnlockedGrade",
    properties: {
        gradeID : "string"
    },
    primaryKey: "gradeID"

}

export const OpenedGrade = {
    name: "OpenedGrade",
    properties: {
        gradeID : "string"
    },
    primaryKey: "gradeID"

}


export const OpenedLearningArea = {
    name: "OpenedLearningArea",
    properties: {
        learningAreaID : "string",
        gradeID : "string"
    },
    primaryKey: "learningAreaID"

}

export const OpenedStrand = {
    name: "OpenedStrand",
    properties: {
    strandID : "string",
    subjectID : "string"

    },
    primaryKey: "strandID"

}

export const OpenedSubStrand = {

    name: "OpenedSubStrand",
    properties: {
    strandID : "string",
    subStrandID: "string",
    subjectID : "string"

    },
    primaryKey: "subStrandID"

}


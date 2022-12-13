import  secureLocalStorage  from  "react-secure-storage";

export const ContentRepository = {

    saveGrade: (grade, onComplete) => {

        const gradeIds = JSON.parse(secureLocalStorage.getItem("XGrades"))

        if (gradeIds) {
            gradeIds.push(grade.gradeID)
            secureLocalStorage.setItem("XGrades", JSON.stringify(gradeIds))
        } else {
            secureLocalStorage.setItem("XGrades", JSON.stringify([`${grade.gradeID}`]))
        }
        secureLocalStorage.setItem(grade.gradeID, JSON.stringify(grade))

        onComplete(grade)

    },

    saveSubject: (subject, onComplete) => {

        const gradeIds = JSON.parse(secureLocalStorage.getItem("XSubjects"))

        if (gradeIds) {
            gradeIds.push(subject.subjectID)
            secureLocalStorage.setItem("XSubjects", JSON.stringify(gradeIds))
        } else {
            secureLocalStorage.setItem("XSubjects", JSON.stringify([`${subject.subjectID}`]))
        }
        secureLocalStorage.setItem(subject.subjectID, JSON.stringify(subject))

        onComplete(subject)

    },


    saveStrand: (strand, onComplete) => {
        const gradeIds = JSON.parse(secureLocalStorage.getItem("XStrands"))

        if (gradeIds) {
            gradeIds.push(strand.strandID)
            secureLocalStorage.setItem("XStrands", JSON.stringify(gradeIds))
        } else {
            secureLocalStorage.setItem("XStrands", JSON.stringify([`${strand.strandID}`]))
        }
        secureLocalStorage.setItem(strand.strandID, JSON.stringify(strand))

        onComplete(strand)
    },


    saveSubStrand: (strand, onComplete) => {
        const gradeIds = JSON.parse(secureLocalStorage.getItem("XSubStrands"))

        if (gradeIds) {
            gradeIds.push(strand.subStrandID)
            secureLocalStorage.setItem("XSubStrands", JSON.stringify(gradeIds))
        } else {
            secureLocalStorage.setItem("XSubStrands", JSON.stringify([`${strand.subStrandID}`]))
        }
        secureLocalStorage.setItem(strand.subStrandID, JSON.stringify(strand))

        onComplete(strand)
    },


    getGrades: (grade, onComplete) => {

        const gradeIDs = JSON.parse(secureLocalStorage.getItem("XGrades"));

        const grades = []

        gradeIDs.forEach(gradeID => {
            grades.push(JSON.parse(secureLocalStorage.getItem(gradeID)))
        });

        onComplete(grades)

    },


    getAllGrades: (onComplete) => {

        const gradeIDs = JSON.parse(secureLocalStorage.getItem("XGrades"));

        const grades = []

        gradeIDs.forEach(gradeID => {
            grades.push(JSON.parse(secureLocalStorage.getItem(gradeID)))
        });

        onComplete(grades)

    },
    

    getSubjects: (grade, onComplete) => {

        const gradeIDs = JSON.parse(secureLocalStorage.getItem("XSubjects"));

        const subjects = []

        gradeIDs.forEach(gradeID => {
            subjects.push(JSON.parse(secureLocalStorage.getItem(gradeID)))
        });

        subjects = subjects.filter(subject => subject.gradeID == grade)

        onComplete(subjects)

    },


    getStrands: (subject, onComplete) => {
        const gradeIDs = JSON.parse(secureLocalStorage.getItem("XStrands"));

        const subjects = []

        gradeIDs.forEach(gradeID => {
            subjects.push(JSON.parse(secureLocalStorage.getItem(gradeID)))
        });

        subjects = subjects.filter(strand => strand.subjectID == subject)

        onComplete(subjects)
    },


    getSubStrands: (strand, onComplete) => {
        const gradeIDs = JSON.parse(secureLocalStorage.getItem("XSubStrands"));

        const subjects = []

        gradeIDs.forEach(gradeID => {
            subjects.push(JSON.parse(secureLocalStorage.getItem(gradeID)))
        });

        subjects = subjects.filter(subStrand => subStrand.strandID == strand)

        onComplete(subjects)

    },


    getSubStrandsSubject: (strand, onComplete) => {
        const gradeIDs = JSON.parse(secureLocalStorage.getItem("XSubStrands"));

        const subjects = []

        gradeIDs.forEach(gradeID => {
            subjects.push(JSON.parse(secureLocalStorage.getItem(gradeID)))
        });

        subjects = subjects.filter(subStrand => subStrand.subjectID == strand)

        onComplete(subjects)
    },


    getAndUpdateSubStrand: (strand, onComplete) => {

    },


    getSubStrandsStrand: (strand, onComplete) => {


    }



}


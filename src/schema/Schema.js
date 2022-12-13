
// export const Schema = [
//     Subscription, Grade, Strand, SubStrand, Subject, User, UnlockedGrade,
//     OpenedGrade, OpenedLearningArea, OpenedStrand, OpenedSubStrand
// ]



export const Schema = {
    initialize: () => {
        //create `tables`
        localStorage.setItem("XSubscriptions", JSON.stringify([]))
        localStorage.setItem("XGrades", JSON.stringify([]))
        localStorage.setItem("XStrands", JSON.stringify([]))
        localStorage.setItem("XSubStrands", JSON.stringify([]))
        localStorage.setItem("XSubjects", JSON.stringify([]))
        localStorage.setItem("XUsers", JSON.stringify([]))

    }
}
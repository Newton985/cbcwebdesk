export const SubscriptionRepository = {

    saveGradeSubscription: (subscription, onComplete) => {

        const gradeIds = JSON.parse(localStorage.getItem("XSubscriptions"))

        if (gradeIds) {
            gradeIds.push(subscription.code)
            localStorage.setItem("XSubscriptions", JSON.stringify(gradeIds))
        } else {
            localStorage.setItem("XSubscriptions", JSON.stringify([`${subscription.code}`]))
        }

        localStorage.setItem(subscription.code, JSON.stringify(subscription))

        onComplete(subscription)

    },

    getGradeSubscription: (grade, onComplete) => {

        const subsIds = JSON.parse(localStorage.getItem("XSubscriptions"))

        const subscriptions = []

        subsIds.forEach(subID => {
            subscriptions.push(JSON.parse(localStorage.getItem(subID)))
        });

        subscriptions = subscriptions.filter(sub => sub.gradeID == grade)

        onComplete(subscriptions)

    },


    getAllSubscription: (onComplete) => {
        const subsIds = JSON.parse(localStorage.getItem("XSubscriptions"))

        const subscriptions = []

        subsIds.forEach(subID => {
            subscriptions.push(JSON.parse(localStorage.getItem(subID)))
        });

        onComplete(subscriptions)
    },


    deleteAllSubscription: (onComplete) => {

    }

}

import  secureLocalStorage  from  "react-secure-storage";

export const UserRepository = {
    getUser :  (onComplete)=>{
     const user = secureLocalStorage.getItem("@UserData")
     onComplete(user)
    },


    saveUser : (user, onComplete) => {

     secureLocalStorage.setItem("@UserData", user)
     onComplete(user)
        
    },


    clearAll : () =>{

    }


}


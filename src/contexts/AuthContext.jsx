//sign up and login
import React,{ useEffect, useState } from 'react'
import "../../firebase.js"        //for using firebase features
import { getAuth, createUserWithEmailAndPassword, updateProfile ,
    signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"   //for authentication

    //getAuth = unique for each user
    //createUserWithEmailAndPassword = for email & password signup
    //updateProfile = for updating profile
    //signInWithEmailAndPassword for signing in with email & password
    //signOut = for singing out
    //onAuthStateChanged



//creating context (best practice, doing everything in one file) ----------------
const AuthContext = React.createContext()


/*custom hook - now we dont need to import useContext(AuthContext) 
in every component. We'll just import useAuth()*/
export function useAuth(){ 
    return React.useContext(AuthContext)
}


export function AuthProvider({children}){
    const [loading,setLoading] = useState(true);        //for maintaining things while loading
    const [currentUser, setCurrentUser] = useState();   // for storing user data as an object 

    // console.log(children)

    useEffect(()=> {
        const auth = getAuth();     //is an object | auth.currentUser is too an object
        const unsubscribe = onAuthStateChanged(auth, (user)=> {
            setCurrentUser(user);
            setLoading(false);
            // console.log(user)
        })
        return unsubscribe; // clean up on unmount to avoid memory leak
    },[]);
    //for signin the state will be authenticated and for signup the state will be no authenticated.
    //onAuthStateChanged is an event listener waits for listening whether a user signed in or singed out ,
    //it gets fired on sign in/ sign up ( auth state change) 
    //user = current user (gets as default parameter)
    //it is a side effect


    //sign up function 
    async function signup(email, username, password){                     //asynchronous, returns a promise
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email,password)        //asynchoronous process
    
    //update profile
    await updateProfile(auth.currentUser, {displayName : username})   //asynchoronous process |alias

        const user = auth.currentUser       //object
        
        setCurrentUser({
        ...user})
        // console.log(auth.currentUser)
    }

    //login function
    function login(email, password){        //return  a promise
        const auth = getAuth()
        return signInWithEmailAndPassword(auth, email, password) //asynchronous - returned a promise
    }

    //logout function
    function logout(){
        const auth = getAuth();
        return signOut(auth)        ////asynchronous - returned a promise
    }

    const value = {     //object | provided thingd through context to wrapped components
        currentUser,
        signup,
        login,
        logout,
    };

    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

//--------------------------------- done-----------------------------------



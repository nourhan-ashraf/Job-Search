import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateEmail, updatePassword } from "firebase/auth";
import { auth, storage } from "../firebase";
import { ref, uploadBytes } from "firebase/storage";

export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState()
    useEffect(() => {
        const currentUser = auth.onAuthStateChanged((authUser) => {
            setUser(authUser)
        })
        return currentUser
    }, [])

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    function signin(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }
    function signout(auth) {
        return signOut(auth)
    }
    function updateUserEmail(user, password) {
        return updateEmail(user, password)
    }
    function updateUserPassword(user, password) {
        return updatePassword(user, password)
    }

    
    function forgotPassword(email) {
        return sendPasswordResetEmail(auth, email)
    }
    function upload (uid, file){
        const fileRef = ref(storage, uid+'.png')
        uploadBytes(fileRef, file)
    }
    return (
        <AuthContext.Provider value={{ user, signin, signup, signout, updateUserEmail, updateUserPassword, forgotPassword, upload }}>
            {children}
        </AuthContext.Provider>
    )
}
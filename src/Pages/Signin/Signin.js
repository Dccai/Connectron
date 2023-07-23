import React,{useContext,useState,useEffect} from "react";
import { auth } from "../../Firebase";
import { signInWithEmailAndPassword ,onAuthStateChanged} from "firebase/auth";
import { Navigate } from "react-router-dom";
import { Context} from "../../App";
export function Signin(){
    let contextData=useContext(Context);
    let [page,newPage]=useState(false);
    let [back,setBack]=useState(false);
    useEffect(()=>{
        let authChange=onAuthStateChanged(auth,async(user)=>{
            user&&contextData.userSetter(user.uid)}); return ()=>authChange;
    },[]);
    if(page){
        return <Navigate to="/Portfolio" replace={true}/>
    }
    async function handleSubmit(e){
        e.preventDefault();
        let form =new FormData(e.currentTarget);
        let data=Object.fromEntries(form);
        try{
        let user=await signInUsers(data.email,data.password);
        }catch(e){
            alert('Sorry, Wrong Password or Email!');
        }
    }
    async function signInUsers(email,password){
        return signInWithEmailAndPassword(auth,email,password).then(()=>{newPage(true)}); 
    }
    return (
        <>
        <div>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='email'>User Email</label>
                <input required type="text" name="email"/>
                <label htmlFor="password">User Password</label>
                <input required type="text" name="password"/>
                <input type ="submit"/>
            </form> 
        </div>
        </>
    );
}
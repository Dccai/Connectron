import React,{useContext,useEffect,useState} from "react";
import { Context } from "../../App";
import { ProfSignupPic } from "../../Assets/Images";
import { Navigate } from "react-router-dom";
import "./ProfessionalSignup.css";
import { fireStore,auth } from "../../Firebase";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged} from 'firebase/auth';
import {addDoc, collection} from '@firebase/firestore';
export function ProfessionalSignup(){
    let ref=collection(fireStore,'userData');
    let contextData=useContext(Context);
    let [page,newPage]=useState(false);
    useEffect(()=>{let authChange=onAuthStateChanged(auth,async(user)=>{user&&contextData.userSetter(user.uid)}); return ()=>authChange;},[]);
    if(page){
        return <Navigate to="/Portfolio" replace={true}/>
    }
    async function handleSubmit(e){
        e.preventDefault();
        let form= new FormData(e.currentTarget);
        let data=Object.fromEntries(form);
       let user=await createUser(data.profEmail,data.profPassword,data.profName);
    }
    async function createUser(email,password,name){
        return createUserWithEmailAndPassword(auth,email,password).then(cred=>{addDoc(ref,{id:cred.user.uid,preferences:[],bio:'I want to teach people',userName:name,role:'professional',email:email,contacts:[]}); newPage(true);});
    }
    return (
        <div id="signUp">
        <h1 id="headh1">Signup Page For People Who Want To Be Tuturs, Teachers, Professionals</h1>
        <img id="headImage" src={ProfSignupPic}/>
        <section id="body">
        <form onSubmit={handleSubmit}>
            <label htmlFor="profName">What Is Your Name?</label>
            <input name="profName" type="text"/>
            <label htmlFor="profEmail">What Is Your Email?</label>
            <input type="text" name="profEmail"/>
            <label htmlFor="profPassword">What Is Your Password?</label>
            <input name="profPassword" type="text"/>
            <input type="submit"/>
        </form>
        </section>
        </div>
    );
}
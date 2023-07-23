import React,{useContext,useEffect,useState} from "react";
import { LearnSignupPic } from "../../Assets/Images";
import { Navigate } from "react-router-dom";
import "./LearnersSignup.css";
import { Context } from "../../App";
import { fireStore,auth } from "../../Firebase";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged} from 'firebase/auth';
import {addDoc, collection} from '@firebase/firestore';
export function LearnersSignup(){
    let contextData=useContext(Context);
    useEffect(()=>{let authChange=onAuthStateChanged(auth,async(user)=>{(user&&contextData.userSetter(user.uid))}); return ()=>authChange;},[]);
    let [page,newPage]=useState(false);
    if(page){
        return <Navigate to="/Portfolio" replace={true}/>
    }
    let ref=collection(fireStore,'userData');
    async function handleSubmit(e){
        e.preventDefault();
        let form= new FormData(e.currentTarget);
        let data=Object.fromEntries(form);
       let user=await createUser(data.learnerEmail,data.learnerPassword,data.learnerName);
    }
    async function createUser(email,password,name){
        return createUserWithEmailAndPassword(auth,email,password).then(cred=>{addDoc(ref,{id:cred.user.uid,preferences:[],bio:'I am a new user',userName:name,role:'learner',email:email,contacts:[]}); newPage(true)});
    }
    return (
        <div id="signUp">
        <h1 id="headh1">Signup Page For People Who Want To Connect To Tuturs, Teachers, Professionals</h1>
        <img id="headImage" src={LearnSignupPic}/>
        <section id="body">
        <form onSubmit={handleSubmit}>
            <label htmlFor="learnerName">What Is Your Name?</label>
            <input name="learnerName" type="text"/>
            <label htmlFor="learnerEmail">What Is Your Email?</label>
            <input type="text" name="learnerEmail"/>
            <label htmlFor="learnerPassword">What Is Your Password?</label>
            <input name="learnerPassword" type="text"/>
            <input type="submit"/>
        </form>
        </section>
        </div>
    );
}
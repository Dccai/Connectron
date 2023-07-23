import React,{useContext} from "react";
import "./MainPage.css";
import { Context } from "../../App";
import {useNavigate } from "react-router-dom";
export function MainPage(){
    let navigate=useNavigate();
    let contextData=useContext(Context);
    function handleSubmit(e){
        e.preventDefault();
        let form=new FormData(e.currentTarget);
        let entries=Object.fromEntries(form);
    }
    return (
        <>
        <section id="head">
        <h1 id="title">Connectron</h1>
        <h4 style={{color:"cyan"}}>Website to Connect Professionals and Amateurs</h4>
        </section>
        <section id="body" >
        <div id="ProfSignup">
        <h2>Do You Want To Reach Out To Amateurs? Make Money And Gain Credit Teaching Lessons? <br/>Sign Up Now </h2>
        <button onClick={()=>{navigate('ProfSignup')}}>Signup Now</button>
        </div>
        <div id="LearnersSignup">
        <h2>Do You Want To Contact The Right Teacher For You? <br/>Sign Up Now </h2>
        <button onClick={()=>{navigate('LearnSignup')}}>Signup Now</button>
        </div>
        <div id="Signin">
        <h2>Sign In For Users Who Already Have An Account</h2>
        <button onClick={()=>{navigate('Signin')}}>Sign In</button>
        </div>
        <div id="Portfolio">
        {contextData.currentUser?<button onClick={()=>{navigate('Portfolio')}}>Portfolio</button>:<h2>Sign In or Sign Up First</h2>}
        </div>
        </section>
        </>
    )
}
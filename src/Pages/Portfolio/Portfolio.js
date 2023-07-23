import React,{useEffect,useState} from "react";
import { Preferences } from "../../Assets/Preferences";
import { Context } from "../../App";
import { useContext } from "react";
import { fireStore } from "../../Firebase";
import { Navigate } from "react-router-dom";
import {collection,getDocs,where,query,data,updateDoc,doc} from "firebase/firestore"
import './Portfolio.css';
export function Portfolio(){
    let contextData=useContext(Context);
    let [user,setUser]=useState({});
    let [update,setUpdate]=useState(0);
    let ref=collection(fireStore,'userData');
    let docID=React.useRef('');
    useEffect(()=>{
    if(contextData.currentUser===''){
        return;
    }
    async function rando(){
    let q= query(ref,where("id","==",contextData.currentUser));
    let data=await getDocs(q);
    docID.current=data.docs[0].id;
    setUser(data.docs[0].data());
    }
    rando();
    return ()=>{}
    },[contextData.currentUser,update]);
    async function changeBio(e){
        await updateDoc(doc(ref,docID.current),{bio:e.currentTarget.value});
    }
    async function deleteSpecialty(e){
        user.preferences.pop(user.preferences.indexOf(e.target.id)) ;
        await updateDoc(doc(ref,docID.current),{preferences:user.preferences})
        setUpdate(a=>a+1);
    }
    async function addSpecialty(e){
        let newArray=user.preferences;
        newArray.push(e.target.id);
        await updateDoc(doc(ref,docID.current),{preferences:newArray});
        setUpdate(a=>a+1);
    }
    async function addContact(e){
        e.preventDefault();
        let form= new FormData(e.currentTarget);
        let data=Object.fromEntries(form);
        let array=user.contacts;
        await updateDoc(doc(ref,docID.current),{contacts:[...array,data.contact]});
        setUpdate(a=>a+1);
        console.log(user.contacts)
    }
    return (
        <>
        <h1 id="name">{user.userName}</h1>
        <h3>Your Bio</h3>
        <textarea onChange={changeBio}id="bio" defaultValue={user.bio} />
        <h3>Your Specialties</h3>
        {user.preferences&&user.preferences.map((a)=>{
            return(<div className="specialtyBar"><button id={a} onClick={deleteSpecialty}>Delete</button><h5>{a}</h5></div>);}
        )}
        <h3>Specialties To Add To Portfolio</h3>
        <div id="specialtyGrid">
        {Preferences.map(a=>{return (<button onClick={addSpecialty} id={a}>{a}</button>);})}
        </div>
        <form onSubmit={addContact}>
            <label htmlFor="contact">New Contact</label>
            <input type="text" name="contact"/>
            <label htmlFor="submit">Add Contact</label>
            <input type="submit"name="submit"/>
        </form>
        {user.contacts&&user.contacts.map(a=>{return <a style={{display:"block"}}>{a}</a>;})}
        </>
    );
}
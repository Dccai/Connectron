import {collection,getDocs,where,query,data,updateDoc,doc,addDoc,getDoc} from "firebase/firestore"
import React,{useId,useContext,useState} from "react"
import { fireStore } from "../../Firebase"
import { Navigate } from "react-router-dom";
import { Context } from "../../App";
export function Chat(){
    let contextData=useContext(Context);
    let arrayToLoad;
    let ref=collection(fireStore,'chatRooms');
    let [up,update]=useState(0);
    let [chatroom,enter]=useState(false);
    if(chatroom){
        return <Navigate to="/ChatRoom" replace={true}/>;
    }
    async function createChat(e){
        e.preventDefault();
        let form=new FormData(e.currentTarget);
        let data=Object.fromEntries(form);
        let id=data['password'];
        addDoc(ref,{users:[],usersChar:[],password:id});
        let user=query(collection(fireStore,'userData'),where('id','==',contextData.currentUser));
        let userDocs=await getDocs(user);
        let arrayToUpdate=userDocs.docs[0].data();
        arrayToUpdate=arrayToUpdate.chats.length===0?[id]:[...arrayToUpdate.chats,id];
        console.log(userDocs.docs[0].id)
        await updateDoc(doc(collection(fireStore,'userData'),userDocs.docs[0].id),{chats:arrayToUpdate});
        update(a=>a+1);
    }
    async function addChat(e){
        e.preventDefault();
        let form=new FormData(e.currentTarget);
        let data=Object.fromEntries(form);
        let pass=data['password'];
        let p=query(ref,where('password','==',pass));
        let docs=await getDocs(p);
        if(docs.docs.length===0){return;}
        
        let user=query(collection(fireStore,'userData'),where('id','==',contextData.currentUser));
        let userDocs=await getDocs(user);
        let arrayToUpdate=userDocs.docs[0].data();
        arrayToUpdate=arrayToUpdate.chats.length===0?[]:arrayToUpdate.chats;
        arrayToUpdate.push(e.target.value);
        await updateDoc(doc(fireStore,'userData',userDocs.docs[0].id),{chats:arrayToUpdate});
        update(a=>a+1);
    }
    async function loadRooms(){
        try{
        let user=query(collection(fireStore,'userData'),where('id','==',contextData.currentUser));
        let userDocs=await getDocs(user);
        let chatsArray=userDocs.docs[0].data();
        let real=chatsArray.chat;
        arrayToLoad=real;
        }catch(e){
            alert("Come Back After Logging In");
        }
    }
    loadRooms();
    console.log(arrayToLoad)
    function enterChat(password){
        contextData.chatRoom.current=password;
        enter(true);
    }
    return (<>
    <h1 id="head">Chat</h1>
    <form onSubmit={createChat}>
    <label>+ Create New Chat Room</label>
    <input  type="text" name="password"/>
    <input type="submit"/>
    </form>
    <form onSubmit={addChat}>
    <label>+ Add Chat Room</label>
    <input type="text" name="password"/>
    <input type="submit"/>
    </form>
    {arrayToLoad&&arrayToLoad.map(a=>{return (<button onClick={()=>{enterChat(a)}}>Enter Chat</button>);})}
    </>

    );
}
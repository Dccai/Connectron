import React,{useContext} from "react";
import { Context } from "../../App";
import { fireStore } from "../../Firebase";
import {collection,getDocs,where,query,data,updateDoc,doc,addDoc,getDoc} from "firebase/firestore"
export function ChatRoom (){
    let contextData=useContext(Context);
    let ref=collection(fireStore,'chatRooms');
    async function getChat(){
    let chat=query(ref,where('password','==',contextData.chatRoom));
    let chatDocs=await getDocs(chat);
    let chatData=chatDocs.docs[0].data();
    return chatData
    }
    let chatData=getChat();
    return (
    <div>
    Hi
    </div>
    );
}
import React ,{useState,useContext}from "react";
import { Context } from "../../App";
import { fireStore } from "../../Firebase";
import { Navigate } from "react-router-dom";
import {collection,getDocs,where,query,data} from "firebase/firestore"
export function Search(){
    let ref=collection(fireStore,'userData');
    let contextData=useContext(Context);
    let [search,setSearch]=useState([]);
    let [searchDone,setSearchDone]=useState(false);
    let n=100;
    if(searchDone){
        return <Navigate to="/ShowPortfolio" replace={true}/>;
    }
    async function getSearchResults(){
        let q=query(ref,where("role","==","professional"));
        let docs=await getDocs(q);
        let searchResult=[];
        let qUser= query(ref,where("id","==",contextData.currentUser));
        let data=await getDocs(qUser);
        let userData=data.docs[0].data();
        docs.forEach(doc=>{
            let data=doc.data();
            if(data.preferences.length!==0&&userData.preferences.length!==0){
                let score=0;
                for (let x in data.preferences){
                    if(userData.preferences.includes(data.preferences[x])){
                        score++;
                    }
                }
                searchResult.push([data,score]);
            }
        });
        searchResult.sort((a,b)=>{return b[1]-a[1];});
        setSearch(searchResult.slice(0,n));
    }
function goToPortfolio(data){
    contextData.showPortfolio.current=data;
    setSearchDone(true);
    
}
    return(<div>
        Search Bar
        <button onClick={getSearchResults}>Search Based On Your Preferences</button>
        {search&&search.map((a)=>{return (<div id={a[0].id}><button onClick={()=>{goToPortfolio(a[0])}}>{a[0].userName}</button></div>);})}
    </div>);
}
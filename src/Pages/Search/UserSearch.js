import React ,{useState,useContext}from "react";
import { Context } from "../../App";
import { fireStore } from "../../Firebase";
import { Navigate } from "react-router-dom";
import './UserSearch.css';
import {collection,getDocs,where,query,data} from "firebase/firestore"
export function UserSearch(){
    let ref=collection(fireStore,'userData');
    let contextData=useContext(Context);
    let [search,setSearch]=useState([]);
    let [searchDone,setSearchDone]=useState(false);
    let n=100;
    if(searchDone){
        return <Navigate to="/ShowPortfolio" replace={true}/>;
    }
    async function getSearchResults(e){
        let q=query(ref,where("email","==",e.target.value));
        let docs=await getDocs(q);
        let searchResult=[];
        docs.forEach(doc=>{
            searchResult.push(doc.data());
        });
        setSearch(searchResult.slice(0,n));
    }
function goToPortfolio(data){
    contextData.showPortfolio.current=data;
    setSearchDone(true);  
}
    return(<div>
        <div class="form__group field">
  <input type="input" onChange={getSearchResults} class="form__field" placeholder="Name" name="name" id='name' required />
  <label for="name" class="form__label">Search Bar</label>
        </div>
        {search&&search.map((a)=>{return (<div id={a.id}><button onClick={()=>{goToPortfolio(a)}}>{a.userName}</button></div>);})}
    </div>);
}
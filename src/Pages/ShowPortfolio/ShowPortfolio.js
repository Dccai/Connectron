import React,{useContext} from 'react';
import { Context } from '../../App';
export function ShowPortfolio(){
    let contextData=useContext(Context);
    let data=contextData.showPortfolio;
    if(data.current===0){return <h1>Sign In And Choose Portfolio To View</h1>}
    return (
        <>
        <h1 id="name">{data.current.userName}</h1>
        <h3>Their Bio</h3>
        <p>{data.current.bio}</p>
        <h3>Their {data.current.role==='learner'?'Preferences':'Specialties'}</h3>
        {data.current.preferences&&data.current.preferences.map((a)=>{
            return(<div className="specialtyBar"><h5>{a}</h5></div>);}
        )}
         {<a style={{display:"block"}}>{data.current.email}</a>}
        {data.current.contacts&&data.current.contacts.map(a=>{return <a style={{display:"block"}}>{a}</a>;})}
        </>
    );
}
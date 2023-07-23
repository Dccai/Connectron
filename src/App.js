import './App.css';
import React,{createContext,useState} from 'react';
import { MainPage } from './Pages/Main/MainPage.js';
import { LearnersSignup } from './Pages/Signup/LearnersSignup.js';
import { ProfessionalSignup } from './Pages/Signup/ProfessionalSignup.js';
import { Route,Routes,Link,BrowserRouter} from 'react-router-dom';
import { Signin } from './Pages/Signin/Signin.js';
import { Portfolio } from './Pages/Portfolio/Portfolio.js';
import { Search } from './Pages/Search/Search.js';
import { ShowPortfolio } from './Pages/ShowPortfolio/ShowPortfolio';
import { UserSearch } from './Pages/Search/UserSearch';
import { Chat } from './Pages/Chat/Chat.js';
import { ChatRoom } from './Pages/Chat/ChatRoom.js';
export const Context=createContext();
function App() {
  let [currentUser,setCurrentUser]=useState('');
  let portfolio=React.useRef(0);
  let chatRoom=React.useRef('');
  let contextData={currentUser:currentUser,userSetter:setCurrentUser,showPortfolio:portfolio,chatRoom:chatRoom};
  function Navbar(){
    return (
      <nav id="websiteHead">
        <div className="Link">
        <Link to="/">Home</Link>
        </div>
        <div className="Link">
        <Link to="/Search">Search For Teachers</Link>
        </div>
        <div className="Link">
        <Link to="/UserSearch">Search For Users</Link>
        </div>
      </nav>
    );
  }
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Context.Provider value={contextData}><MainPage/></Context.Provider>}/>
      <Route path="/ProfSignup" element={<Context.Provider value={contextData}><ProfessionalSignup/></Context.Provider>}/>
      <Route path="/LearnSignup" element={<Context.Provider value={contextData}><LearnersSignup/></Context.Provider>}/>
      <Route path="/Signin" element={<Context.Provider value={contextData}><Signin/></Context.Provider>}/>
      <Route path="/Portfolio" element={<Context.Provider value={contextData}><Portfolio/></Context.Provider>}/>
      <Route path="/Search" element={<Context.Provider value={contextData}><Search/></Context.Provider>}/>
      <Route path="/ShowPortfolio" element={<Context.Provider value={contextData}><ShowPortfolio/></Context.Provider>}/>
      <Route path="/UserSearch" element={<Context.Provider value={contextData}><UserSearch/></Context.Provider>}/>
      
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

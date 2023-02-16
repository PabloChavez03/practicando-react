import { useState } from "react";
import "./App.css";
import TwitterFollowCard from "./components/TwitterFollowCard";


function App() {
  return <>
    <TwitterFollowCard userName={'chavezpablo_'} name="pablito ⭐⭐⭐" initialIsFollowing={true}/>
    <TwitterFollowCard userName={'chavezpablo_'} name="pablito ⭐⭐⭐"/>
    <TwitterFollowCard userName={'chavezpablo_'} name="pablito ⭐⭐⭐"/>
  </>
}

export default App;

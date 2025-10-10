"use client";
import React, { createContext, useContext, useState, useMemo, useEffect } from "react";





const GlobalStateContext = createContext(null);
export function GlobalStateProvider({ children }) {
  // UI state used across the app
  const [hidecon, setHidecon] = useState(true);
  const [status, setStatus] = useState("1");
  const [volumeOn, setVolumeOn] = useState(true);
  const [groupData, setgroupData] = useState([]);
  const [onlines,setonlines]=useState("-")
  let [chats, setchats] = useState([]);
  let [valumestatus, setvalumestatus] = useState(
    (localStorage.getItem("settings") ?? 1) == 1
      ? true
      : JSON.parse(localStorage.getItem("settings")).valumestatus
  );
  let [notification, setnotification] = useState(
    (localStorage.getItem("settings") ?? 1) == 1
      ? "audio1"
      : JSON.parse(localStorage.getItem("settings")).notification
  );
  
useEffect(()=>{



const userId = localStorage.getItem("user");
console.log(userId);

  let wss=()=>{
 const ws = new WebSocket(`ws://${window.location.hostname}:9090?uid=${userId}`);

ws.onmessage = (event) => {
const msg = JSON.parse(event.data);
console.log(msg);
console.log(`online${msg.data}`)
if(msg.type=="on"){
setonlines(msg.data)
}

}
  ws.onclose = () => {
    console.log("❌ Disconnected, retrying...");
    setTimeout(wss, 1000); // بعد ۳ ثانیه دوباره وصل می‌شه
  };
    ws.onerror = () => {
      console.log("errore WSS");
      
    ws.close(); // اگر ارور داشت ببند و بذار onclose هندل کنه
  };
}
wss()
let mas=localStorage.getItem("group_mas")
!mas?localStorage.setItem("group_mas",JSON.stringify([{id:groupId,date:4}])):console.log(mas);

const ws = new WebSocket(`ws://${window.location.hostname}:6060`);

      ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
  let groupid=localStorage.getItem("groupId")


 



if(msg.type=="ms"){


let getdata=async()=>{
let data=await fetch(`http://${window.location.hostname}:6060/getgroup`)
let resdata=await data.json()
let massagecount = JSON.parse(localStorage.getItem("group_mas")) || [];

let nwdat = await Promise.all(
  resdata.data.map(async (i) => {
    let countmas = 0;

    for (const ii of massagecount) {
      if (i.id === ii.id) {
        const req = await fetch(
          `http://${window.location.hostname}:6060/getmascount?groupid=${ii.id}&datenumber=${ii.date}`
        );
        const res = await req.json();
        countmas = res.data[0]?.count ?? 0;
        break; // چون match شد، ادامه لازم نیست
      }
    }

    // بازگشت آبجکت جدید با داده‌های اصلی + countmas
    return {
      ...i,
      countmas,
    };
  })
);
nwdat.sort((a, b) => b.countmas - a.countmas);
console.log(nwdat);
setgroupData(nwdat)
}
getdata()


  console.log(Number(groupid),Number(msg.data.data.group_id));
  
  if (Number(groupid)==Number(msg.data.data.group_id) ) {
    if(window.location.pathname=="/chat"){
 
    


       setchats((chats) => [...chats,msg.data.data,])

       //update ,assage count
       let massagecount=JSON.parse(localStorage.getItem("group_mas"))
console.log(massagecount);

let newms=massagecount.map((ii)=>{

if (Number(ii.id)==Number(msg.data.data.group_id)) {
  return {id:ii.id,date:new Date().getTime()}
} else {
  return {id:ii.id,date:ii.date}
}

})
console.log(newms);
localStorage.setItem("group_mas",JSON.stringify(newms))
     console.log("yess")

      }
    console.log("noo")
    }  


if (userId!=msg.data.data.user_id) {
    if (JSON.parse(localStorage.getItem("settings")).valumestatus  == true) {
    console.log("alarmmmm")
        if (JSON.parse(localStorage.getItem("settings")).notification === "audio1") {
          console.log("alarm1")
          new Audio("/notification/1.mp3").play();
        } else if (JSON.parse(localStorage.getItem("settings")).notification === "audio2") {
          console.log("alarm2")
          new Audio("/notification/2.mp3").play();
        } else if (JSON.parse(localStorage.getItem("settings")).notification === "audio3") {
          console.log("alarm3")
          new Audio("/notification/3.mp3").play();
        }

      } 
}else{
  console.log("not notif");
  
}
   
    

  }

}},[])

  const value = useMemo(
    () => ({ hidecon, setHidecon, status, setStatus, volumeOn, setVolumeOn,groupData, setgroupData,onlines,setonlines,chats, setchats}),
    [hidecon, status, volumeOn,groupData,onlines,chats]
  );

  return (
    <GlobalStateContext.Provider value={value}>
      {children}
    </GlobalStateContext.Provider>
  );
}

export function useGlobalState() {
  const ctx = useContext(GlobalStateContext);
  if (!ctx)
    throw new Error("useGlobalState must be used within GlobalStateProvider");
  return ctx;
}

export default GlobalStateProvider;

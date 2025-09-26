"use client";

import { useEffect,useState} from "react";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/globallContext/globallstate";


function Home() {
  let [groupData, setgroupData] = useState([]);
  let router=useRouter()
  //test data group

useEffect(()=>{
  function testdata(params) {
    let data = [];
    for (let i = 0; i <= 20; i++) {
      //create name
      let numbername = Math.floor(Math.random() * 10);
      let name = [];
      for (let i = 0; i <= numbername; i++) {
        let shans = Math.floor(Math.random() * 10);
        switch (shans) {
          case 1:
            name.push("A");
            break;
          case 2:
            name.push("B");
            break;
          case 3:
            name.push("C");
            break;
          case 4:
            name.push("D");
            break;
          case 5:
            name.push("E");
            break;
          case 6:
            name.push("F");
            break;
          case 7:
            name.push("G");
            break;
          case 8:
            name.push("H");
            break;
          case 9:
            name.push("I");
            break;
          default:
            name.push("A")
            break;
        }
      }

      data.push({
        color: `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`,
        name:name.toString().replaceAll(",","")
      });
    }
    setgroupData(data);
    
  }
  testdata()
},[])
  const { hidecon, setHidecon, status, setStatus, volumeOn, setVolumeOn }=useGlobalState();

let groups=groupData.map((i,index)=>{

return(
<div onClick={()=>router.push(`/chat?id=${i.name}`)} key={index} className="group-element">
  <div className="group-icon-name">
  <svg className="icon-header" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs/><path  d="m32,6c-12.15,0-22,9.85-22,22,0,14.49,12.95,30,22,30s22-15.51,22-30c0-12.15-9.85-22-22-22Zm-15,22v-4h3c4.94,0,8,3.06,8,8v4h-3c-4.94,0-8-3.06-8-8Zm15,20c-5.31,0-9-4.17-9-4.17l2.83-2.83c.84.83,2.78,3,6.17,3s5.31-2.16,6.17-3l2.83,2.83s-3.69,4.17-9,4.17Zm15-20c0,4.94-3.06,8-8,8h-3v-4c0-4.94,3.06-8,8-8h3v4Z" fill={i.color}/></svg>
<p>{i.name}</p></div>
{index<3?<div className="nm-ms"><p>+10</p></div>:""}
</div>)
})






  return (
    <>
   

<div className="group-page-continer">
<div className="groups">
{groups}
</div>
        <div className="add-group">
          <button onClick={()=>{
            setStatus("2")
            setHidecon(false)
              }} className="button-add-group">+ADD GROUP</button>
        </div>
      </div>
    </>
  );
}
export default Home; 
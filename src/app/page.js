"use client";

import { useEffect,useState} from "react";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/globallContext/globallstate";


function Home() {

  let [host, sethost] = useState("localhost");
  const { hidecon, setHidecon, status, setStatus, volumeOn, setVolumeOn,groupData, setgroupData }=useGlobalState();

  let router=useRouter()


  useEffect(() => {
    sethost(window.location.hostname);

  }, []);
  useEffect(()=>{
let mas=localStorage.getItem("group_mas")
!mas?localStorage.setItem("group_mas",JSON.stringify([{id:0,date:0}])):console.log(mas);

let getdata=async()=>{
let data=await fetch(`http://${host}:6060/getgroup`)
let resdata=await data.json()
let massagecount = JSON.parse(localStorage.getItem("group_mas")) || [];

let nwdat = await Promise.all(
  resdata.data.map(async (i) => {
    let countmas = 0;

    for (const ii of massagecount) {
      if (i.id === ii.id) {
        const req = await fetch(
          `http://${host}:6060/getmascount?groupid=${ii.id}&datenumber=${ii.date}`
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


//setmessagecount

//مقدار هایی که از قبل ساخته شدن 
let beforemassagecount=JSON.parse(localStorage.getItem("group_mas"))

//مقدار گروه هایی که ساخته شدن جدید ولی وجود نداره بسازه
let aftermassagecount=[]
resdata.data.forEach((i) => {
let status=true

beforemassagecount.forEach((ii)=>{
  if (i.id==ii.id) {
    status=false
  }
})

if (status==true) {
  aftermassagecount.push({id:i.id,date:2})
}

});

//همه مقادیر اپدیت بشن مثادیر قبلی هم بهش اضاف میشه 
beforemassagecount.forEach((i)=>{
  aftermassagecount.push({id:i.id,date:i.date})
})

//مقادیر گروه هایی که وجود ندارند حذف بشن و مجدد اپدیت بشه
let newmassagegroup=[]
aftermassagecount.forEach((i1,index)=>{
let status=false

 resdata.data.forEach((i2)=>{
 if (i1.id==i2.id) {
   status=true
 }
 })

if (status==true) {
  newmassagegroup.push(aftermassagecount[index])
}

})

localStorage.setItem("group_mas",JSON.stringify(newmassagegroup))
console.log(aftermassagecount);
console.log(newmassagegroup);




}
getdata()
},[host])



let groups=groupData.map((i,index)=>{
let countmas=i.countmas
return(
 <div onClick={()=>router.push(`/chat?id=${i.id}&name=${encodeURIComponent(i.name)}&colors=${i.color}`)} key={index} className="group-element">
  <div className="group-icon-name">
  <svg className="icon-header" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs/><path  d="m32,6c-12.15,0-22,9.85-22,22,0,14.49,12.95,30,22,30s22-15.51,22-30c0-12.15-9.85-22-22-22Zm-15,22v-4h3c4.94,0,8,3.06,8,8v4h-3c-4.94,0-8-3.06-8-8Zm15,20c-5.31,0-9-4.17-9-4.17l2.83-2.83c.84.83,2.78,3,6.17,3s5.31-2.16,6.17-3l2.83,2.83s-3.69,4.17-9,4.17Zm15-20c0,4.94-3.06,8-8,8h-3v-4c0-4.94,3.06-8,8-8h3v4Z" fill={i.color}/></svg>
<p>{i.name}</p></div>
{countmas>0?<div className="nm-ms"><p>+{countmas}</p></div>:""}
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
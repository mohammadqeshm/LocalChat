"use client";

import { useEffect, useRef, useState } from "react";
import "./chat.css";
import { useSearchParams } from "next/navigation";
import { useGlobalState } from "@/globallContext/globallstate";



function CHAT(params) {

//states
let [viw,setviw]=useState(true)
let [filetype,setfiletype]=useState(null)
let [chf,setchf]=useState(false)
 let [host, sethost] = useState("localhost");
 let [userid, setuserid] = useState();
 let [massageinput, setmassageinput] = useState();
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
 let [heightvid, setheightvid] = useState(window.innerWidth / 2);
 const { hidecon, setHidecon, status, setStatus, volumeOn, setVolumeOn,groupData, setgroupData,chats,setchats}=useGlobalState();
 
//---------------------------------------------------------------------
 

//refs
  let files = useRef();
  let chatsref = useRef();
//---------------------------------------------------------------------


//morehoks
  const searchParams = useSearchParams();
//---------------------------------------------------------------------


//consts&lets
  const groupId =searchParams.get("id") ?? "";
  const groupname =searchParams.get("name") ?? "";
  const colors =searchParams.get("colors") ?? "";

//--------------------------------------------------------------------- 


//useEffects
  useEffect(() => {
    sethost(window.location.hostname);
    localStorage.setItem("groupId",groupId)

  }, []);

useEffect(() => {

let mas=localStorage.getItem("group_mas")
!mas?localStorage.setItem("group_mas",JSON.stringify([{id:groupId,date:4}])):console.log(mas);

let massagecount=JSON.parse(localStorage.getItem("group_mas"))
console.log(massagecount);

let newms=massagecount.map((ii)=>{

if (Number(ii.id)==Number(groupId)) {
  return {id:ii.id,date:new Date().getTime()}
} else {
  return {id:ii.id,date:ii.date}
}

})
console.log(newms);
localStorage.setItem("group_mas",JSON.stringify(newms))






    console.log(groupId);
    let userstatus = localStorage.getItem("user");
    if (!userstatus) {
      console.log("کاربر ساخته نشده ");

      let adduser = async () => {
        let res = await fetch(`http://${host}:6060/adduser`);
        let req = await res.json();
        console.log(req);
        if (req.status == true) {
          localStorage.setItem("user", req.data);
          setuserid(req.data);
        }
      };
      adduser();
    } else {
      console.log("کاربر ساخته شده در حال برسی میباشد ");
      let adduser = async () => {
        let res = await fetch(
          `http://${host}:6060/getuser?userid=${Number(
            localStorage.getItem("user")
          )}`
        );
        let req = await res.json();
        console.log(req);
        if (req.status == true) {
          if (req.data == false) {
            console.log("کاربر معتبر نیست");
            let adduser = async () => {
              let res = await fetch(`http://${host}:6060/adduser`);
              let req = await res.json();
              console.log(req);
              if (req.status == true) {
                localStorage.setItem("user", req.data);
                setuserid(req.data);
              }
            };
            adduser();
          } else {
            console.log("کاربر معتبر است");

            setuserid(localStorage.getItem("user"));
          }
        }
      };
      adduser();
    }

    let getdata = async () => {
      let data = await fetch(`http://${host}:6060/getchat?group_id=${groupId}`);
      let resdata = await data.json();
      console.log(resdata.data);
      setchats(resdata.data);
    };
    getdata();
  }, [host]);
  useEffect(()=>{
              setTimeout(() => {
          const el = chatsref.current;
          if (!el) return;
          if (el.scrollTo) el.scrollTo({ top: el.scrollHeight });
          else el.scrollTop = el.scrollHeight;
        }, 10);
  },[chats])
//---------------------------------------------------------------------


//evnts
  async function sendData(params) {
    let file = files.current?.files?.[0];
    if (!file) {
      console.log("no file");
      let req = await fetch(`http://${host}:6060/sendchat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: massageinput,
          group_id: groupId,
          user_id: userid,
        }),
      });
      let resdata = await req.json();
      console.log(resdata);

      if (resdata.status == "true") {
        setmassageinput("");
      }
    } else {
      console.log("yes file");
      let fd = new FormData();
      fd.append("file", file, file.name);
      fd.append("message", massageinput);
      fd.append("group_id", groupId);
      fd.append("user_id", userid);
      let req = await fetch(`http://${host}:6060/sendchat`, {
        method: "POST",
        body: fd,
      });
      let resdata = await req.json();
      console.log(resdata.status);

      if (resdata.status == "true") {
        setmassageinput("");
        files.current.value=null
       setchf(false)

      }
    }
  }
function changefile(params) {
   let file = files.current?.files?.[0];
   console.log("change file");
    if (!file) {
         console.log("change file false");

      setchf(false)
    }else{
         console.log("change file true");

      setchf(true)
     let type= files.current.files[0].type.split("/")[0]
     console.log(type);
     setfiletype(type)
    }
}
//---------------------------------------------------------------------
 

let chatData = chats.map((i, index) => {
    let my;
    if (i.user_id == userid) {
      my = true;
    } else {
      my = false;
    }

    let time = `${new Date(i.time).getHours()}:${new Date(
      i.time
    ).getMinutes()}`;
    return (
      <div
        className="chat"
        style={
          my === true ? { border: "solid rgba(201, 34, 190, 0.4) 1px" } : {}
        }
        key={index}
      >
        <p
          style={my === true ? { textAlign: "right" } : {}}
          className="chat-massage"
        >
          {i.message}
        </p>

        <div
          style={my === false ? { textAlign: "right" } : {}}
          className="chat-file"
        >
          {i.file_type === "image" ? (
            <div className="chat-file-image">
              <img
                className="chat-file-image-content"
                src={`http://${host}:6060/uploads/${i.url}`}
                width="50%"
              ></img>
            </div>
          ) : (
            ""
          )}

          {i.file_type === "video" ? (
            <div className="chat-file-video">
              <video
                style={{ width: "50%", aspectRatio: "1 / 1" }}
                src={`http://${host}:6060/uploads/${i.url}`}
                controls
              ></video>
            </div>
          ) : (
            ""
          )}

          {i.file_type === "more" ? (
            <div className="chat-file-more">
              <a
                className="chat-file-more-continer"
                href={`http://${host}:6060/uploads/${i.url}`}
                download={i.file_url}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.0351 1V6.21053H18.0527L13.0351 1ZM12.2002 1H3.00006V21.8421H18.0527V7.07759H12.2002V1ZM14.709 14.8934L10.5264 19.2368L6.34378 14.8934H8.85256V9.68285H12.1963V14.8934H14.709Z"
                    fill="white"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p>{i.url}</p>
              </a>
            </div>
          ) : (
            ""
          )}
        </div>

        <div
          style={my === false ? { direction: "rtl" } : {}}
          className="chat-date"
        >
          <div className="chat-date-continer">
            <p className="chat-date-continer-text">{time}</p>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="group-chat-continer">
                  <div className="popup-chat" style={{display:viw==true?"flex":"none"}}>
<div className="popup-chat-name">
    <svg className="icon-header" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs/><path  d="m32,6c-12.15,0-22,9.85-22,22,0,14.49,12.95,30,22,30s22-15.51,22-30c0-12.15-9.85-22-22-22Zm-15,22v-4h3c4.94,0,8,3.06,8,8v4h-3c-4.94,0-8-3.06-8-8Zm15,20c-5.31,0-9-4.17-9-4.17l2.83-2.83c.84.83,2.78,3,6.17,3s5.31-2.16,6.17-3l2.83,2.83s-3.69,4.17-9,4.17Zm15-20c0,4.94-3.06,8-8,8h-3v-4c0-4.94,3.06-8,8-8h3v4Z" fill={colors}/></svg>

  <h1>{decodeURIComponent(groupname)}</h1></div>
<div className="popup-chat-button"><button onClick={()=>setviw(false)} className="popup-chat-button-btn">ok</button></div>
        </div>

        <div ref={chatsref} className="chats">

          {chatData}
        </div>
        <div className="send-continer">
        <div  style={{display:chf===false?"none":"flex"}} className="file-continer">
        {filetype=="image"?(<img src={!files.current.files[0]?"": URL.createObjectURL(files.current.files[0])} height="100%" />):""}
        {filetype=="video"?(<video controls src={!files.current.files[0]?"":  URL.createObjectURL(files.current.files[0])} height="100%" />):""}



        </div>
          <div className="send">
            <input onChange={()=>changefile()} ref={files} style={{ display: "none" }} type="file"></input>
            <button
              onClick={() =>files.current.click()}
              className="upload-file"
            >
              <svg
                width="31"
                height="31"
                viewBox="0 0 31 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.2102 10.8965L12.2644 15.7454C11.7942 16.2104 11.5359 16.8459 11.5462 17.5137C11.5603 18.1893 11.8385 18.8324 12.3212 19.3053C12.8056 19.7845 13.4579 20.0596 14.1334 20.0712C14.4641 20.0782 14.7929 20.0189 15.1003 19.8969C15.4078 19.7749 15.6877 19.5926 15.9237 19.3608L20.8682 14.5119C21.3347 14.0504 21.7025 13.499 21.9494 12.891C22.1963 12.2831 22.3171 11.6313 22.3045 10.9753C22.2773 9.62411 21.7218 8.33736 20.7571 7.39093C19.7897 6.43362 18.4909 5.8855 17.1301 5.8603C16.4694 5.84712 15.8127 5.96575 15.1984 6.20926C14.584 6.45277 14.0244 6.81629 13.5522 7.27855L8.6038 12.1288C7.90463 12.8213 7.35329 13.6485 6.98318 14.5604C6.61307 15.4722 6.43188 16.4497 6.45059 17.4336C6.49219 19.4599 7.32589 21.3893 8.77301 22.8083C10.2234 24.2439 12.1706 25.0662 14.2109 25.1048C15.2024 25.1255 16.188 24.9481 17.11 24.583C18.032 24.2179 18.8718 23.6725 19.5804 22.9788L24.5262 18.1273"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <textarea
              onChange={(i) => setmassageinput(i.target.value)}
              className="massage"
              placeholder="please massage"
              type="text"
              value={massageinput}
            ></textarea>
            <button onClick={() => sendData()} className="send-massage">
              send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default CHAT;

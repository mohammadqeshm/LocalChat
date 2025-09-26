"use client";
import {useEffect, useRef, useState } from "react";
import "./chat.css";

function CHAT(params) {
  let [chats, setchats] = useState([
    {
      message: "Hello, how are you today?",
      file_type: "none",
      is_mine: true,
      timestamp: "10:35",
    },
    {
      message: "I'm good, thanks! Did you see the new movie trailer?",
      file_type: "video",
      url: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
      is_mine: false,
      timestamp: "10:37",
    },
    {
      message: "Yes, it looks amazing! I also sent you a picture from my trip.",
      file_type: "image",
      url: "https://picsum.photos/800/600",
      is_mine: true,
      timestamp: "10:40",
    },
    {
      message: "Wow, that view is beautiful!",
      file_type: "none",
      is_mine: false,
      timestamp: "10:41",
    },
    {
      message: "I found a useful document for our project.",
      file_type: "more",
      url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      file_name: "dummy.pdf",
      is_mine: true,
      timestamp: "10:45",
    },
    {
      message: "This is a great idea. I will check it later.",
      file_type: "none",
      is_mine: false,
      timestamp: "10:50",
    },
    {
      message: "Don't forget to send me the final report.",
      file_type: "none",
      is_mine: true,
      timestamp: "11:00",
    },
    {
      message: "Sure, I'll do it by the end of the day.",
      file_type: "none",
      is_mine: false,
      timestamp: "11:01",
    },
    {
      message: "Here is the video from the conference.",
      file_type: "video",
      url: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
      is_mine: false,
      timestamp: "11:15",
    },
    {
      message: "Got it, thanks!",
      file_type: "none",
      is_mine: true,
      timestamp: "11:16",
    },
    {
      message: "How is the weather over there?",
      file_type: "none",
      is_mine: true,
      timestamp: "11:20",
    },
    {
      message: "It's sunny. I will send you a picture.",
      file_type: "image",
      url: "https://picsum.photos/600/800",
      is_mine: false,
      timestamp: "11:21",
    },
    {
      message: "That's great!",
      file_type: "none",
      is_mine: true,
      timestamp: "11:22",
    },
    {
      message: "Did you receive the files I sent yesterday?",
      file_type: "none",
      is_mine: false,
      timestamp: "11:30",
    },
    {
      message: "Yes, I downloaded them this morning.",
      file_type: "none",
      is_mine: true,
      timestamp: "11:32",
    },
    {
      message: "I also have an idea for our new logo.",
      file_type: "more",
      url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      file_name: "sample.pdf",
      is_mine: true,
      timestamp: "11:35",
    },
    {
      message: "Send me the details whenever you can.",
      file_type: "none",
      is_mine: false,
      timestamp: "11:36",
    },
    {
      message: "I'm running late for the meeting, sorry!",
      file_type: "none",
      is_mine: true,
      timestamp: "11:45",
    },
    {
      message: "No problem, we can start without you.",
      file_type: "none",
      is_mine: false,
      timestamp: "11:46",
    },
    {
      message: "Just sent you the video of the presentation.",
      file_type: "video",
      url: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
      is_mine: true,
      timestamp: "11:50",
    },
    {
      message: "تصویر جدید تولید شده با هوش مصنوعی",
      file_type: "image",
      url: "https://picsum.photos/640/800",
      is_mine: false,
      timestamp: "11:21",
    },
    {
      message: "",
      file_type: "image",
      url: "https://picsum.photos/640/820",
      is_mine: true,
      timestamp: "11:21",
    },
    {
      message: `نکات مهم عیب‌یابی (اگر بالا نیامد)

مطمئن شو هر دو دستگاه (سرور و موبایل) به همان شبکه وای‌فای وصلند (نه به شبکه مهمان جدا یا VPN).

فایروال سیستم ممکنه پورت 3000 را بلاک کند:

ویندوز: Allow app node.exe یا باز کردن پورت 3000 در Windows Defender Firewall.

لینوکس: sudo ufw allow 3000 یا تنظیم iptables.

اگر از VPN یا پروفایل شبکه متفاوت استفاده می‌کنی، قطعش کن.

بعضی مودم‌ها «Client isolation» دارند (دستگاه‌ها را از اتصال به‌هم منع می‌کنند). در پنل مودم چک کن یا تست کن با لپ‌تاپ دوم.

اگر از next dev -H 0.0.0.0 خطا داد، از متغیر محیطی یا cross-env استفاده کن.نکات مهم عیب‌یابی (اگر بالا نیامد)

مطمئن شو هر دو دستگاه (سرور و موبایل) به همان شبکه وای‌فای وصلند (نه به شبکه مهمان جدا یا VPN).

فایروال سیستم ممکنه پورت 3000 را بلاک کند:

ویندوز: Allow app node.exe یا باز کردن پورت 3000 در Windows Defender Firewall.

لینوکس: sudo ufw allow 3000 یا تنظیم iptables.

اگر از VPN یا پروفایل شبکه متفاوت استفاده می‌کنی، قطعش کن.

بعضی مودم‌ها «Client isolation» دارند (دستگاه‌ها را از اتصال به‌هم منع می‌کنند). در پنل مودم چک کن یا تست کن با لپ‌تاپ دوم.

اگر از next dev -H 0.0.0.0 خطا داد، از متغیر محیطی یا cross-env استفاده کن.نکات مهم عیب‌یابی (اگر بالا نیامد)

مطمئن شو هر دو دستگاه (سرور و موبایل) به همان شبکه وای‌فای وصلند (نه به شبکه مهمان جدا یا VPN).

فایروال سیستم ممکنه پورت 3000 را بلاک کند:

ویندوز: Allow app node.exe یا باز کردن پورت 3000 در Windows Defender Firewall.

لینوکس: sudo ufw allow 3000 یا تنظیم iptables.

اگر از VPN یا پروفایل شبکه متفاوت استفاده می‌کنی، قطعش کن.

بعضی مودم‌ها «Client isolation» دارند (دستگاه‌ها را از اتصال به‌هم منع می‌کنند). در پنل مودم چک کن یا تست کن با لپ‌تاپ دوم.

اگر از next dev -H 0.0.0.0 خطا داد، از متغیر محیطی یا cross-env استفاده کن.`,
      file_type: "none",
      url: "https://picsum.photos/640/920",
      is_mine: true,
      timestamp: "11:21",
    },
  ]);
  let [valumestatus, setvalumestatus] = useState((localStorage.getItem("settings")??1)==1?true:JSON.parse(localStorage.getItem("settings")).valumestatus);
  let [notification, setnotification] = useState((localStorage.getItem("settings")??1)==1?"audio1":JSON.parse(localStorage.getItem("settings")).notification);
let [heightvid,setheightvid]=useState(window.innerWidth/2)
let files=useRef()
function filesselect() {
  files.current.click()
} 
useEffect(()=>{

  function send(params) {
        if (valumestatus==true) {
      if (notification ==="audio1") {
      new Audio("/notification/1.mp3").play();
    } else if (notification ==="audio2") {
      new Audio("/notification/2.mp3").play();
    } else if (notification ==="audio3") {
      new Audio("/notification/3.mp3").play();
    }
  } 
  }

window.addEventListener("click",send)
return ()=> window.removeEventListener("click",send)
},[])

  let chatData = chats.map((i, index) => {
    return (
      <div
        className="chat"
        style={
          i.is_mine === true
            ? { border: "solid rgba(201, 34, 190, 0.4) 1px" }
            : {}
        }
        key={index}
      >
        <p
          style={i.is_mine === true ? { textAlign: "right" } : {}}
          className="chat-massage"
        >
          {i.message}
        </p>

        <div
          style={i.is_mine === false ? { textAlign: "right" } : {}}
          className="chat-file"
        >
          {i.file_type === "image" ? (
            <div className="chat-file-image">
              <img
                className="chat-file-image-content"
                src={i.url}
                width="50%"
              ></img>
            </div>
          ) : (
            ""
          )}

          {i.file_type === "video" ? (
            <div className="chat-file-video"> 
              <video style={{ width: "50%", aspectRatio: "1 / 1" }}src={i.url} controls></video>
            </div>
          ) : (
            ""
          )}

          {i.file_type === "more" ? (
            <div className="chat-file-more">
              <a
                className="chat-file-more-continer"
                href={i.url}
                download={i.file_name}
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
                <p>{i.file_name}</p>
              </a>
            </div>
          ) : (
            ""
          )}
        </div>

        <div
          style={i.is_mine === false ? { direction: "rtl" } : {}}
          className="chat-date"
        >
          <div className="chat-date-continer">
            <p className="chat-date-continer-text">{i.timestamp}</p>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="group-chat-continer">
        <div className="chats">{chatData}</div>
        <div className="send-continer">
          <div className="send"> 
            <input ref={files} style={{display:"none"}} type="file"></input>
            <button onClick={()=>{filesselect()}} className="upload-file">
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
              className="massage"
              placeholder="please massage"
              type="text"
            ></textarea>
            <button className="send-massage">send</button>
          </div>
        </div>
      </div>
    </>
  );
}
export default CHAT;

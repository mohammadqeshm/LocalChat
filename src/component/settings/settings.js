"use client";

import { useGlobalState } from "@/globallContext/globallstate";
import { useEffect, useState } from "react";
import "./a.css";

function Settings() {
  const { hidecon, setHidecon, status, setStatus, volumeOn, setVolumeOn } =useGlobalState();
  let [valumestatus, setvalumestatus] = useState((localStorage.getItem("settings")??1)==1?true:JSON.parse(localStorage.getItem("settings")).valumestatus);
  let [notification, setnotification] = useState((localStorage.getItem("settings")??1)==1?"audio1":JSON.parse(localStorage.getItem("settings")).notification);
  let [valumestatusn, setvalumestatusn] = useState((localStorage.getItem("settings")??1)==1?true:JSON.parse(localStorage.getItem("settings")).valumestatus);
  let [notificationn, setnotificationn] = useState((localStorage.getItem("settings")??1)==1?"audio1":JSON.parse(localStorage.getItem("settings")).notification);


  function changenoti(i) {
    if (i.target.value === "audio1") {
      new Audio("/notification/1.mp3").play();
      setnotificationn("audio1")
    } else if (i.target.value === "audio2") {
      new Audio("/notification/2.mp3").play();
      setnotificationn("audio2")
    } else if (i.target.value === "audio3") {
      new Audio("/notification/3.mp3").play();
      setnotificationn("audio3")
    }
}

useEffect(()=>{
 let ob={notification:notification,valumestatus:valumestatus}
    
        localStorage.setItem("settings",JSON.stringify(ob))
console.log(JSON.parse(localStorage.getItem("settings")).valumestatus);

},[notification,valumestatus])



  return (
    <>
      <div
        style={{ display: hidecon == true ? "none" : "flex" }}
        className="popup-continer"
      >
        {status == "1" ? (
          <div className="popup-continer-valum">
            <div className="popup-continer-valum-header">
              <p>SETTINGS</p>
            </div>
            <div className="popup-continer-valum-main">
              <div className="popup-continer-valum-item1">
                <p>audio:</p>

                <select
                  onChange={(i) => {changenoti(i)}}
                  className="popup-continer-valum-item1-select"
                  name="audio">
                  <option value="audio1">audio1</option>
                  <option value="audio2">audio2</option>
                  <option value="audio3">audio3</option>
                </select>
              </div>
              <div className="popup-continer-valum-item2">
                <p>volum:</p>
                <div
                  onClick={() =>{
                    setvalumestatusn(valumestatusn == false ? true : false)}
                  }
                  style={{
                    backgroundColor:
                      valumestatusn === true ? "#0086ff" : "#ffffffff",
                  }}
                  className="popup-continer-valum-item2-togle"
                >
                  <div
                    style={{
                      right: valumestatusn == true ? "0px" : "20px",
                      backgroundColor:
                        valumestatusn === false ? "#0086ff" : "#ffffffff",
                    }}
                    className="popup-continer-valum-item2-togle-circle"
                  ></div>
                </div>
              </div>
            </div>
            <div className="popup-continer-valum-fother">
              <button
                onClick={() =>{
                setvalumestatusn(valumestatus)
                setnotificationn(notification)
                  setHidecon(true)}}
                className="popup-continer-valum-close"
              >
                CLOSE
              </button>
              <button onClick={()=>{
                setvalumestatus(valumestatusn)
                setnotification(notificationn)
                setHidecon(true)
              }} className="popup-continer-valum-save">SAVE</button>
            </div>
          </div>
        ) : (
          <div className="popup-continer-valum">
            <div className="popup-continer-valum-header">
              <p>ADD GROUP</p>
            </div>
            <div className="popup-continer-add-main">
              <div className="popup-continer-add-item1">
                <p>Name:</p>
                <input
                  type="text"
                  className="popup-continer-add-item1-name"
                  placeholder="group name..."
                ></input>
              </div>
              <div className="popup-continer-add-item2">
                <p>color:</p>
                <input
                  className="popup-continer-add-item2-color"
                  type="color"
                ></input>
              </div>
            </div>
            <div className="popup-continer-valum-fother">
              <button
                onClick={() => setHidecon(true)}
                className="popup-continer-valum-close"
              >
                CLOSE
              </button>
              <button className="popup-continer-valum-save">SAVE</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Settings;

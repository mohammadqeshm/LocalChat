"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/globallContext/globallstate";

function Header() {
  let mypath = usePathname();
  let router = useRouter();
  const { hidecon, setHidecon, status, setStatus, volumeOn, setVolumeOn }=useGlobalState();

  return (
    <>
      <div className="continer">
        <div className="icon-section">
          <h1>
            Local{" "}
            <span>
              <svg
                className="icon-header"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
              >
                <defs fill="#D3D3D3" />
                <path
                  d="m32,6c-12.15,0-22,9.85-22,22,0,14.49,12.95,30,22,30s22-15.51,22-30c0-12.15-9.85-22-22-22Zm-15,22v-4h3c4.94,0,8,3.06,8,8v4h-3c-4.94,0-8-3.06-8-8Zm15,20c-5.31,0-9-4.17-9-4.17l2.83-2.83c.84.83,2.78,3,6.17,3s5.31-2.16,6.17-3l2.83,2.83s-3.69,4.17-9,4.17Zm15-20c0,4.94-3.06,8-8,8h-3v-4c0-4.94,3.06-8,8-8h3v4Z"
                  fill="#D3D3D3"
                />
              </svg>
            </span>{" "}
            Chat
          </h1>
        </div>
        <div className="online-section">
          <p className="online-numders">online:{3} </p>
        </div>
        <div className="flex-btn">
          {mypath === "/chat" ? (
            <button onClick={() => router.push("/")} className="flex-btn-2">
              <svg
                width="25"
                viewBox="0 0 36 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26.3333 17.375L34.1666 9.54167M34.1666 9.54167L26.3333 1.70833M34.1666 9.54167L1.85413 9.54167"
                  stroke="#D3D1D1"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ) : (
            <button onClick={()=>{
            setStatus("1")
            setHidecon(false)
              }} className="flex-btn-1">
             
              <svg
                width="25"
                height="26"
                viewBox="0 0 25 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="13" cy="13" r="12" fill="#B6B4B4" />
                <path
                  d="M13.9167 15.3333C14.9792 14.8304 15.6876 13.7467 15.6876 12.5C15.6876 11.2462 14.9792 10.1908 13.9167 9.66666V15.3333Z"
                  fill="black"
                />
                <path
                  d="M13.9167 6.2879C16.7501 6.93249 18.8751 9.46832 18.8751 12.5C18.8751 15.5317 16.7501 18.0675 13.9167 18.7121V17.2458C15.9638 16.6367 17.4584 14.7454 17.4584 12.5C17.4584 10.2546 15.9638 8.35624 13.9167 7.74707V6.2879Z"
                  fill="black"
                />
                <path
                  d="M6.83325 11.0833H9.31242L11.7916 8.60416V16.0417L9.31242 13.5625H6.83325V11.0833Z"
                  fill="black"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </>
  );
}
export default Header;

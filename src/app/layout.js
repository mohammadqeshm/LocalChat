
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/component/headr";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "LocalChat",
  description: "test chat app local lan wifi family",
  icons:{
    icon:"icon/icon.svg",
    shortcut: "icon/icon.svg",
    apple: "icon/icon.svg",
  }
    
};

export default function RootLayout({ children }) {      
     


  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} body`}>
        <div className="app-continer">
       <Header/>
        {children}
        </div>
      </body>
    </html>
  );
}

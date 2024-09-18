//theme
import "primereact/resources/themes/lara-light-cyan/theme.css";   
//core
import "primereact/resources/primereact.min.css";  
//icons
import "primeicons/primeicons.css";
//primeflex
import "primeflex/primeflex.css";

// import Head from "next/head";
// import Image from "next/image";
// import localFont from "next/font/local";
// import styles from "@/styles/Home.module.css";
// import Login from "@/components/login";
import Order from "./kitchen/order.js";

// import KitchenSiderBar from "@/components/kitchen/KitchenSidebar";
// import OrdersPage from "@/kitchen/order.js";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export default function Home() {
  return (
    // <Order />
    // <Login />
    // <KitchenSiderBar/>
    <Order />
  );
}



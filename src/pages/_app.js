import { AuthProvider } from "../../context/AuthContext";
import { MenuProvider } from '../../context/MenuContext'; 

import "@/styles/globals.css";
import "@/styles/sidebar.css";
//PrimeReact CSS
//theme
import "primereact/resources/themes/lara-light-cyan/theme.css";   
//core
import "primereact/resources/primereact.min.css";  
//icons
import "primeicons/primeicons.css";
//primeflex
import "primeflex/primeflex.css";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <MenuProvider>
      <Component {...pageProps} />
      </MenuProvider>
    </AuthProvider>
  );
}

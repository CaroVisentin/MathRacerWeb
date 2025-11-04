// //import type { HomeData } from "../../models/ui/home-data";

 import pila from "../../assets/images/pila-full.png";
 import pilaempty from "../../assets/images/pila-empty.png";
 import pilabolt from "../../assets/images/pila-bolt.png";


export const homeDataMock = {



   battery: {
    time: "02:35",
     levels: ["full", "full", "empty"] as ("full" | "empty")[],
   }};

 export const batteryIcons = { pila, pilaempty, pilabolt };

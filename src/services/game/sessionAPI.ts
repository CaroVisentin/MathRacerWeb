import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { api, API_URLS } from "../network/api";
import { auth } from "../firebase/firebaseConfig";

export const sessionService = {
    //registro al jugador en firebase
    registrarUsuario: async(username: string, email: string, password: string) => {
       
        try{
        const userCredential= await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const uid=userCredential.user.uid;

        //crear perfil del jugador en la base de datos
        const response = await api.post(`${API_URLS.player}`, {
            username,
            email,
            uid,
        });
        return response.data;
    } catch (error:any){
        throw new Error(error.message) || "No se pudo registrar usuario"    }
    },

    //login del jugador en firebase
    loguearUsuario: async (email: string, password: string) =>{
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        const uid= userCredential.user.uid;

        //obtener perfil del jugador desde la api
         try{
        const response = await api.get(`${API_URLS.player}/uid/${uid}`);
        return response.data;
        }catch (error:any){
        throw new Error(error.message) || "No se pudo registrar usuario"    }
    },

   //obtener perfil del jugador por uid
    obtenerPerfil:async (uid: string) =>{
         try{
         const response = await api.get(`${API_URLS.player}/uid/${uid}`);
       return response.data;
        }catch (error:any){
        throw new Error(error.message) || "No se pudo registrar usuario"  
      }
    },
    
    //cierre de sesion

    async logout() {
        await auth.signOut();
    }
};
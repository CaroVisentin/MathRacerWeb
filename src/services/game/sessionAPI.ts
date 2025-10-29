import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { api, API_URLS } from "../network/api";
import { auth } from "../firebase/firebaseConfig";

export const sessionService = {
    //registro al jugador en firebase
    async register(username: string, email: string, password: string) {
        const userCredential= await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const uid=userCredential.user.uid;

        //crear perfil del jugador en la base de datos
        const response = await api.post(`${API_URLS.games}/players`, {
            username,
            email,
            uid,
        });
        return response.data;
    },

    //login del jugador en firebase
    async login(email: string, password: string) {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        const uid= userCredential.user.uid;

        //obtener perfil del jugador desde la api
        const response = await api.get(`${API_URLS.games}/uid/${uid}`);

        return response.data;
    },

    //obtener perfil del jugador por uid
    async getPlayerProfileByUid(uid: string) {
        const response = await api.get(`${API_URLS.games}/uid/${uid}`);
        return response.data;
    },

    //cierre de sesion

    async logout() {
        await auth.signOut();
    }


};
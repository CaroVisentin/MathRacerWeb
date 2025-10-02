import { useNavigate } from "react-router-dom";
import fhome from "../../assets/images/fhome.png"


export const Home = () => {
    const navigate = useNavigate();

    return (
      <div className="w-full h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${fhome})` }}
      >
        <button
        onClick={() => navigate("/multijugador")}
        className="bg-gray-800 text-white  py-4 px-8 rounded-lg text-2xl hover:bg-red-700 transition duration-300"> Multijugador</button>
   </div>
    );
};
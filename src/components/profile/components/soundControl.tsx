import { useState, useRef } from "react";
import { faVolumeHigh, faMusic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const AudioControls = () => {
    const [soundVolume, setSoundVolume] = useState(50);
    const [musicVolume, setMusicVolume] = useState(50);

    const musicRef = useRef<HTMLAudioElement>(null);

    const handleSoundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSoundVolume(Number(e.target.value));
    };

    const handleMusicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const vol = Number(e.target.value);
        setMusicVolume(vol);
        if (musicRef.current) {
            musicRef.current.volume = vol / 100;
        }
    };

    // const playSoundEffect = () => {
    //     const sound = new Audio("/"); 
    //     sound.volume = soundVolume / 100;
    //     sound.play();
    // };

    return (
        <div className="flex flex-col gap-4">

            {/* Pasar canción del juego */}
            <audio ref={musicRef} src="/" loop autoPlay />

            <div className="flex items-center gap-4">
                <span className="text-xl">Sonido</span>
                <FontAwesomeIcon icon={faVolumeHigh} />
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={soundVolume}
                    onChange={handleSoundChange}
                    className="w-40 accent-cyan-400"
                />
            </div>

            <div className="flex items-center gap-4">
                <span className="text-xl">Música</span>
                <FontAwesomeIcon icon={faMusic} />
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={musicVolume}
                    onChange={handleMusicChange}
                    className="w-40 accent-pink-400"
                />
            </div>
        </div>
    );
};

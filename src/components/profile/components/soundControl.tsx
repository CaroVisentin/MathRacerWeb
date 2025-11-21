import { faVolumeHigh, faMusic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAudio } from "../../../contexts/AudioContext";

export const AudioControls = () => {
    const { soundVolume, musicVolume, setSoundVolume, setMusicVolume, playButtonSound } = useAudio();

    const handleSoundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const volume = Number(e.target.value);
        setSoundVolume(volume);
        // Reproducir sonido de prueba al ajustar
        if (volume > 0) {
            playButtonSound();
        }
    };

    const handleMusicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const volume = Number(e.target.value);
        setMusicVolume(volume);
    };

    return (
        <div className="flex flex-col gap-4">
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
                <span className="text-sm text-gray-400">{soundVolume}%</span>
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
                <span className="text-sm text-gray-400">{musicVolume}%</span>
            </div>
        </div>
    );
};

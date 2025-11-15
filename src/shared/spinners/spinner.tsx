import mathi from "../../assets/images/mathi.png";

export const Spinner: React.FC = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black z-[9999]">
            <img
                src={mathi}
                alt="Loading mascot"
                className="w-24 h-24 animate-spin drop-shadow-[0_0_15px_#00ffff]"
            />
        </div>


    );
};

export const SmallSpinner: React.FC = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black z-[9999]">
            <img
                src={mathi}
                alt="Loading mascot"
                className="w-12 h-12 animate-spin drop-shadow-[0_0_15px_#00ffff]"
            />
        </div>
    );
};

export default Spinner;


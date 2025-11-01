const Spinner: React.FC = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black z-[9999]">
            <div className="w-24 h-24 border-4 border-t-[#5df9f9] border-b-[#f95ec8] border-l-transparent border-r-transparent rounded-full animate-spin drop-shadow-[0_0_15px_#00ffff]"></div>
        </div>
    );
};

export default Spinner;

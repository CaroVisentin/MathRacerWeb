export const StarsBackground = () => {
    return (
        <div className="pointer-events-none absolute inset-0 opacity-20">
            <div className="absolute left-[5%] top-[10%] h-32 w-24 -skew-y-12 transform bg-gradient-to-b from-purple-900/50 to-purple-700/30" />
            <div className="absolute left-[15%] top-[5%] h-40 w-20 skew-y-6 transform bg-gradient-to-b from-fuchsia-900/50 to-fuchsia-700/30" />
            <div className="absolute right-[10%] top-[8%] h-48 w-28 -skew-y-6 transform bg-gradient-to-b from-purple-900/50 to-purple-700/30" />
            <div className="absolute right-[25%] top-[12%] h-36 w-22 skew-y-12 transform bg-gradient-to-b from-fuchsia-900/50 to-fuchsia-700/30" />
        </div>
    )
}
interface ProfileCardProps {
  imageUrl: string;
  backgroundUrl?: string;
}

export const ProfileCard = ({ imageUrl, backgroundUrl }: ProfileCardProps) => (
  <div
    className="w-35 h-35 rounded-full overflow-hidden border-7 border-[#f95ec8] shadow-lg bg-black/40
    hover:text-[#f95ec8]
    hover:border-[#f95ec8]
    hover:shadow-[0_0_3px_rgba(249,94,200,0.5),0_0_20px_rgba(249,94,200,0.6),0_0_11px_rgba(249,94,200,0.4)]
    active:scale-95"
    style={backgroundUrl ? {
      backgroundImage: `url(${backgroundUrl})`,
      backgroundSize: "cover",
      backgroundPosition: "center"
    } : undefined}
  >
    <img src={imageUrl} alt="perfil" className="w-full h-full object-contain" />
  </div>
);

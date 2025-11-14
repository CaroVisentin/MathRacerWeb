interface ProfileCardProps {
  imageUrl: string;
}

export const ProfileCard = ({ imageUrl }: ProfileCardProps) => (
  <div className="w-16 h-16 bg-white rounded-full overflow-hidden border-4 border-[#f95ec8] shadow-lg hover:scale-105
    hover:text-[#f95ec8]
    hover:border-[#f95ec8]
    hover:shadow-[0_0_3px_rgba(249,94,200,0.5),0_0_20px_rgba(249,94,200,0.6),0_0_11px_rgba(249,94,200,0.4)]
    active:scale-95">
    <img src={imageUrl} alt="perfil" className="w-full h-full object-scale-down" />
  </div>
);

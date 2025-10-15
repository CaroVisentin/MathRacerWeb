interface ProfileCardProps {
  imageUrl: string;
}

export const ProfileCard = ({ imageUrl }: ProfileCardProps) => (
  <div className="w-16 h-16 bg-white rounded-full overflow-hidden border-4 border-[#f95ec8] shadow-lg">
    <img src={imageUrl} alt="perfil" className="w-full h-full object-scale-down" />
  </div>
);

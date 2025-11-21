interface CarDisplayProps {
  imageUrl: string;
}

export const CarDisplay = ({ imageUrl }: CarDisplayProps) => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <img src={imageUrl} alt="Auto" className="w-120 drop-shadow-lg translate-y-30 translate-x-18 " />
  </div>
);

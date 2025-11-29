interface CarDisplayProps {
  imageUrl: string;
  className?: string;
}

export const CarDisplay = ({ imageUrl }: CarDisplayProps) => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <img
      src={imageUrl}
      alt="Auto"
      className="
        drop-shadow-lg
        transition-transform duration-500

        /* Mobile */
        w-[70%] translate-y-10

        /* Tablet */
        sm:w-[30%] sm:translate-y-16

        /* Desktop */
        md:w-[45%] md:translate-y-20 md:translate-x-10

        /* Extra large / gaming screens */
        lg:w-[40%] lg:translate-y-24 lg:translate-x-20
      "
    />
  </div>
);

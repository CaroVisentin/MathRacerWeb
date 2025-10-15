import currencyIcon from "../../assets/images/coin.png"; // ajustar path

interface coinsDisplayProps {
  coins: number;
}

export const CoinsDisplay = ({ coins }: coinsDisplayProps) => (
  <div className="flex items-center gap-2">
    <img src={currencyIcon} alt="monedas" className="w-6 h-6" />
    <span className="text-white font-bold text-3xl">{coins}</span>
  </div>
);

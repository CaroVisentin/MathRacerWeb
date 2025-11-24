import currencyIcon from "../../assets/images/coin.png";

interface coinsDisplayProps {
  coins: number;
}

export const CoinsDisplay = ({ coins }: coinsDisplayProps) => (
  <div className="flex items-center gap-2">
    <img src={currencyIcon} alt="monedas" className="w-10 h-10" />
    <span className="text-white font-bold text-6xl leading-none">
      {coins}
    </span>
  </div>
);

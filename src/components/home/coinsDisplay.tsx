import currencyIcon from "../../assets/images/coin.png";

interface coinsDisplayProps {
  coins: number;
}

export const CoinsDisplay = ({ coins }: coinsDisplayProps) => (
  <div className="flex items-center gap-1 sm:gap-3">
    <img src={currencyIcon} alt="monedas" className="sm:w-10 sm:h-10 w-5 h-5" />
    <span className="text-white font-bold  leading-none sm:text-6xl text-2xl">
      {coins}
    </span>
  </div>
);

import { faBolt, faCar, faCoins, faHelmetSafety, faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type CategorySelectorProps = {
  activeCategory: "cars" | "characters" | "backgrounds" | "coins" | "energy";
  setActiveCategory: (category: "cars" | "characters" | "backgrounds" | "coins" | "energy") => void;
};

export const CategorySelector = ({ activeCategory, setActiveCategory }: CategorySelectorProps) => {
  return (
    <div className="flex justify-center gap-8 py-2">
      <button type="button" onClick={() => setActiveCategory("cars")}>
        <FontAwesomeIcon
          icon={faCar}
          className={`text-xl transition ${
            activeCategory === "cars" ? "text-white scale-110" : "text-gray-400 hover:text-white"
          }`}
        />
      </button>

      <button type="button" onClick={() => setActiveCategory("characters")}>
        <FontAwesomeIcon
          icon={faHelmetSafety}
          className={`text-xl transition ${
            activeCategory === "characters"
              ? "text-white scale-110"
              : "text-gray-400 hover:text-white"
          }`}
        />
      </button>

      <button type="button" onClick={() => setActiveCategory("backgrounds")}>
        <FontAwesomeIcon
          icon={faImage}
          className={`text-xl transition ${
            activeCategory === "backgrounds"
              ? "text-white scale-110"
              : "text-gray-400 hover:text-white"
          }`}
        />
      </button>

      <button type="button" onClick={() => setActiveCategory("coins")}>
        <FontAwesomeIcon
          icon={faCoins}
          className={`text-xl transition ${
            activeCategory === "coins" ? "text-white scale-110" : "text-gray-400 hover:text-white"
          }`}
        />
      </button>

      <button type="button" onClick={() => setActiveCategory("energy")}>
        <FontAwesomeIcon
          icon={faBolt}
          className={`text-xl transition ${
            activeCategory === "energy" ? "text-white scale-110" : "text-gray-400 hover:text-white"
          }`}
        />
      </button>
    </div>
  );
};

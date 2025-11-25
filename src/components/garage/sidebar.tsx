import type { ItemSelectable } from "../../models/ui/garage/garage";

interface SelectionSidebarProps<T extends ItemSelectable> {
  title: string;
  items: T[];
  selectedItemId: number;
  setSelectedItemId: (id: number) => void;
}

export const SelectionSidebar = <T extends ItemSelectable>({
  title,
  items,
  selectedItemId,
  setSelectedItemId,
}: SelectionSidebarProps<T>) => {
  return (
    <div className="w-70 bg-black/70 p-2 flex flex-col gap-2 overflow-y-auto max-h-[90vh] rounded-lg custom-scrollbar">
      <h2 className="text-white text-center text-xl font-semibold mb-2">
        {title}
      </h2>

      {items.map((item) => {
        const isSelected = item.id === selectedItemId;
        const isOwned = item.isOwned !== false; // default true if undefined
        const isActive = item.isActive === true;

        return (
          <div
            key={item.id}
            onClick={() => isOwned && setSelectedItemId(item.id)}
            className={`p-2 flex flex-col items-center gap-2 cursor-pointer rounded-lg transition-all duration-200
                            ${
                              isSelected
                                ? "bg-[#858686] border-2 border-white scale-105"
                                : "bg-gray-700 border border-gray-600 hover:ring-2 ring-blue-400"
                            }
                            ${!isOwned ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <span className="text-white text-lg text-center flex items-center gap-2">
              {item.name}
              {isActive && (
                <span className="ml-2 text-xs bg-cyan-500 text-black px-2 py-0.5 rounded">
                  Activo
                </span>
              )}
            </span>
            <img
              src={item.image}
              alt={item.name}
              className="w-40 h-20 object-contain"
            />
            {!isOwned && (
              <span className="text-xs text-gray-300">No adquirido</span>
            )}
          </div>
        );
      })}
    </div>
  );
};

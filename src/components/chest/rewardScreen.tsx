import { RewardBackground } from "./rewardBackground";
import { ChestView } from "./chestView";
import { RewardsList } from "./rewardsList";
import type { ChestItemDto } from "../../models/domain/chest/chestItemDto";
import type { ChestResponseDto } from "../../models/domain/chest/chestResponseDto";

interface RewardScreenProps {
    isChestOpen: boolean;
    setIsChestOpen: React.Dispatch<React.SetStateAction<boolean>>;
    rewards: boolean;
    setRewards: React.Dispatch<React.SetStateAction<boolean>>;
    obtainedChest: { items: ChestItemDto[] } | null;
    setShowChest: React.Dispatch<React.SetStateAction<boolean>>;
    setObtainedChest: React.Dispatch<React.SetStateAction<ChestResponseDto | null>>;
    setIsPendingChest: React.Dispatch<React.SetStateAction<boolean>>;
    cofre: string;
    cofreAbierto: string;
    chestTitle?: string;
    firstMessage?: string;
    secondMessage?: string;
}

export const RewardScreen = ({
    isChestOpen,
    setIsChestOpen,
    rewards,
    setRewards,
    obtainedChest,
    setShowChest,
    setObtainedChest,
    setIsPendingChest,
    cofre,
    cofreAbierto,
    chestTitle,
    firstMessage,
    secondMessage,
}: RewardScreenProps) => {
    return (
        <RewardBackground>
            <div className="flex flex-col items-center justify-center text-center text-white !p-5 !space-y-6">
                {/* Vista del cofre */}
                <ChestView
                    title={chestTitle}
                    firstMessage={firstMessage}
                    secondMessage={secondMessage}
                    isChestOpen={isChestOpen}
                    setIsChestOpen={setIsChestOpen}
                    setRewards={setRewards}
                    cofre={cofre}
                    cofreAbierto={cofreAbierto}
                />

                {/* Cuando el cofre se abre, mostrar recompensas */}
                {isChestOpen && rewards && (
                    <div className="mt-5">
                        <RewardsList
                            obtainedChest={obtainedChest}
                            setShowChest={setShowChest}
                            setRewards={setRewards}
                            setObtainedChest={setObtainedChest}
                            setIsPendingChest={setIsPendingChest}
                        />
                    </div>
                )}
            </div>
        </RewardBackground>
    )
}

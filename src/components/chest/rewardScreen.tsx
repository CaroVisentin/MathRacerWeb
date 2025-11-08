import { RewardBackground } from "./rewardBackground";
import { ChestView } from "./chestView";
import { RewardsList } from "./rewardsList";

export const RewardScreen = ({ 
    fondoGarage, isChestOpen, setIsChestOpen, rewards, setRewards,
    obtainedChest, setShowChest, setObtainedChest, setIsPendingChest, cofre, cofreAbierto
}: any) => {
    return (
        <RewardBackground backgroundImage={fondoGarage}>
            {!rewards && (
                <ChestView
                    isChestOpen={isChestOpen}
                    setIsChestOpen={setIsChestOpen}
                    setRewards={setRewards}
                    cofre={cofre}
                    cofreAbierto={cofreAbierto}
                />
            )}

            {rewards && (
                <RewardsList
                    obtainedChest={obtainedChest}
                    setShowChest={setShowChest}
                    setRewards={setRewards}
                    setObtainedChest={setObtainedChest}
                    setIsPendingChest={setIsPendingChest}
                />
            )}
        </RewardBackground>
    );
};

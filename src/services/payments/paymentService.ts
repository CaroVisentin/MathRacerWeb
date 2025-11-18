import { api } from "../network/api";

export const createPreference = async (playerId: number, packageId: number) => {
  const response = await api.post(`/payments/create-preference`, {
    playerId,
    coinPackageId: packageId,
    successUrl: `${window.location.origin}/payment-success`,
    failureUrl: `${window.location.origin}/payment-failure`,
    pendingUrl: `${window.location.origin}/payment-pending`,
  });

  return response.data.preferenceId;
};

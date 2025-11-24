import { api } from "../network/api";

export const createPreference = async (playerId: number, packageId: number) => {
  const response = await api.post(`/payments/create-preference`, {
    playerId,
    coinPackageId: packageId,
    successUrl: `${window.location.origin}/pago-exitoso`,
    failureUrl: `${window.location.origin}/pago-fallido`,
    pendingUrl: `${window.location.origin}/pago-pendiente`,
  });

  return response.data.preferenceId;
};

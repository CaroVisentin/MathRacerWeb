import { api } from "../network/api";
import type { FriendDto } from "../../models/domain/friendDto";
import type { FriendRequestDto } from "../../models/domain/friendRequestDto";


export const friendshipService = {
  async getFriends(playerId: number) {
    const res = await api.get(`/Friendship/${playerId}/friends`);
    console.log("API response for getFriends:", res.data);
    return res.data as FriendDto[];
  },

   async sendFriendRequest(request: FriendRequestDto) {
    const res = await api.post(`/Friendship/request`, request);
    return res.status === 201;
  },

  async acceptFriendRequest(request: FriendRequestDto) {
    const res = await api.post(`/Friendship/accept`, request);
    return res.status === 200;
  },

  async rejectFriendRequest(request: FriendRequestDto) {
    const res = await api.post(`/Friendship/reject`, request);
    return res.status === 200;
  },
};


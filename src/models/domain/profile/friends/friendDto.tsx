export interface FriendDto {
  id: number;
  name: string;
  email: string;
  uid: string;
  points: number;
  character: {
    id: number;
  };
}

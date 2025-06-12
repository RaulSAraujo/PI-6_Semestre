export type User = {
  id: number;
  name: string;
  username: string;
  active: boolean;
  is_admin: boolean;
  group_id: number;
  theme: boolean;
  top_menu: boolean;
  lateral_menu: boolean;
  created_at: Date | string;
  updated_at: Date | string;
};

export type FavoriteRoute = {
  id: number;
  user_id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
};

export type Group = {
  id: number;
  name: string;
};

export interface UserPhotos {
  filename: string;
  size: string;
  data: string;
  id: string;
}

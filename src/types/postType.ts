export interface UserInfo {
  profile_image: string;
}

export interface Post {
  id: string;
  user_id: string;
  display_name: string;
  email: string;
  title: string;
  content: string;
  photo_urls: string[];
  users_info: UserInfo;
  created_at: string;
}

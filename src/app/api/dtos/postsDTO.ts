export interface WritePostsReqDTO {
  title: string;
  content: string;
  user_id: string;
  display_name: string;
  photo_urls: string[];
}

export interface PostListReqDTO {
  id: string;
  title: string;
  content: string;
}

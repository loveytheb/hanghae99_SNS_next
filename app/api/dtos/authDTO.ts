export interface RegisterUserReqDTO {
  name: string;
  email: string;
  password: string;
  display_name: string;
  message: string;
}

export interface loginUserDTO {
  email: string;
  password: string;
}

export interface IUser {
  id: string;
  name?: string;
  email: string;
  display_name?: string;
  message?: string;
  profile_image?: string;
}

export type Field = {
  placeholder: string;
  id:
    | "name"
    | "email"
    | "password"
    | "confirmPassword"
    | "displayName"
    | "message";
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export interface AuthFormProps {
  title: string;
  fields: Field[];
  buttonLabel: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  showSocialButtons?: boolean;
  buttonDisabled: boolean;
}

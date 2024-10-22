import React from "react";
import SocialButtons from "./SocialButtons";
import { useAuthStore, AuthState } from "@/src/store/auth/authStore";
import { AuthFormProps } from "@/src/types/authType";
import InputField from "./InputField";

const AuthForm: React.FC<AuthFormProps> = ({
  title,
  fields,
  buttonLabel,
  onSubmit,
  showSocialButtons = false,
  buttonDisabled = false,
}) => {
  const authStore = useAuthStore();
  const authState = authStore;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e);
  };

  const setFieldValue = (
    id: Exclude<keyof AuthState, "reset">,
    value: string
  ) => {
    const setterKey = `set${
      id.charAt(0).toUpperCase() + id.slice(1)
    }` as keyof AuthState;
    const setter = authStore[setterKey] as
      | ((value: string) => void)
      | undefined;

    if (typeof setter === "function") {
      setter(value);
    } else {
      console.warn(`Setter for ${setterKey} not found`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-400">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[450px] max-h-[550px] flex flex-col items-center justify-center">
        <h1 className="text-center text-2xl font-semibold mb-7">{title}</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center space-y-3 w-full"
        >
          {fields.map(({ placeholder, id, type }) => (
            <InputField
              key={id}
              id={id}
              type={type}
              placeholder={placeholder}
              value={String(authState[id as keyof AuthState])}
              onChange={(value) =>
                setFieldValue(id as Exclude<keyof AuthState, "reset">, value)
              }
            />
          ))}
          <button
            type="submit"
            className={`max-w-[300px] w-full mx-auto mt-4 py-2 rounded-full transition duration-300 ${
              buttonDisabled
                ? "bg-gray-400 text-gray-300 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            }`}
            disabled={buttonDisabled}
          >
            {buttonLabel}
          </button>
        </form>
        {showSocialButtons && <SocialButtons />}
      </div>
    </div>
  );
};

export default AuthForm;

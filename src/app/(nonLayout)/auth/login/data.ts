import { Field } from "@/src/types/authType";
import { useAuthStore } from "@/src/store/auth/authStore";

const useAuthFields = (): Field[] => {
  const authStore = useAuthStore();
  const { email, password } = authStore;

  return [
    {
      placeholder: "이메일",
      id: "email",
      type: "email",
      value: email,
      onChange: (e) => authStore.setEmail(e.target.value),
    },
    {
      placeholder: "비밀번호",
      id: "password",
      type: "password",
      value: password,
      onChange: (e) => authStore.setPassword(e.target.value),
    },
  ];
};

export default useAuthFields;

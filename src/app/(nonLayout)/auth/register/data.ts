import { Field } from "@/src/types/authType";
import { useAuthStore } from "@/src/store/auth/authStore";

const useAuthFields = (): Field[] => {
  const authStore = useAuthStore();
  const { name, displayName, email, password, confirmPassword, message } =
    authStore;

  return [
    {
      placeholder: "이름",
      id: "name",
      type: "text",
      value: name,
      onChange: (e) => authStore.setName(e.target.value),
    },
    {
      placeholder: "닉네임",
      id: "displayName",
      type: "text",
      value: displayName,
      onChange: (e) => authStore.setDisplayName(e.target.value),
    },
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
    {
      placeholder: "비밀번호 확인",
      id: "confirmPassword",
      type: "password",
      value: confirmPassword,
      onChange: (e) => authStore.setConfirmPassword(e.target.value),
    },
    {
      placeholder: "인사말",
      id: "message",
      type: "text",
      value: message,
      onChange: (e) => authStore.setMessage(e.target.value),
    },
  ];
};

export default useAuthFields;

import React from "react";

interface Field {
  label: string;
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface AuthFormProps {
  title: string;
  fields: Field[];
  buttonLabel: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({
  title,
  fields,
  buttonLabel,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <h1>{title}</h1>
      {fields.map(
        (
          { label, id, type, value, onChange } // value와 onChange를 구조 분해 할당
        ) => (
          <div key={id}>
            <label htmlFor={id}>{label}</label>
            <input
              id={id}
              name={id}
              type={type}
              required
              value={value}
              onChange={onChange}
            />
          </div>
        )
      )}
      <button type="submit">{buttonLabel}</button>
    </form>
  );
};

export default AuthForm;

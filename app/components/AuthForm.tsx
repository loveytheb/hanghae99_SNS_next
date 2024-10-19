import React from "react";

interface Field {
  placeholder: string;
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
    <div className="flex items-center justify-center min-h-screen bg-gray-400">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[450px] min-h-[550px] flex flex-col items-center justify-center">
        <h1 className="text-center text-2xl font-semibold mb-7">{title}</h1>
        <form
          onSubmit={onSubmit}
          className="flex flex-col items-center space-y-3 w-full"
        >
          {fields.map(({ placeholder, id, type, value, onChange }) => (
            <div className="flex justify-center w-full" key={id}>
              <input
                id={id}
                name={id}
                type={type}
                required
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="max-w-[300px] w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          ))}
          <button
            type="submit"
            className="max-w-[300px] w-full mx-auto mt-40 bg-black text-white py-2 rounded-full hover:bg-gray-800 transition duration-300"
          >
            {buttonLabel}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;

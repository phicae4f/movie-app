import type { InputHTMLAttributes } from "react";
import { Icon } from "./Icon";

interface CustomInputProps extends InputHTMLAttributes<HTMLElement> {
  iconName: string;
  placeholder: string;
  id: string;
  type: string;
  error?: string | null;
}

export const CustomInput = ({
  iconName,
  placeholder,
  id,
  type,
  error = null,
  ...inputProps
}: CustomInputProps) => {
  return (
    <div className={`custom-input ${error ? "custom-input--error" : ""}`}>
      <Icon
        className="custom-input__icon"
        name={iconName}
        width={24}
        height={24}
      />
      <input
        className="custom-input__field"
        type={type}
        id={id}
        placeholder={placeholder}
        {...inputProps}
      />
      {error && <span className="custom-input__error">{error}</span>}
    </div>
  );
};

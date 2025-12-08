import type { InputHTMLAttributes } from "react";
import { Icon } from "./Icon";

interface SearchBarProps extends InputHTMLAttributes<HTMLElement> {
  placeholder: string;
  name: string;
}

export const SearchBar = ({
  placeholder,
  name,
  ...inputProps
}: SearchBarProps) => {
  return (
    <div className="search-bar">
      <Icon
        className="search-bar__icon"
        name="icon-search"
        width={24}
        height={24}
      />
      <input
        className="search-bar__field"
        type="text"
        placeholder={placeholder}
        name={name}
        {...inputProps}
      />
    </div>
  );
};

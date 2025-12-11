import { useState, type InputHTMLAttributes } from "react";
import { Icon } from "./Icon";

interface SearchBarProps extends InputHTMLAttributes<HTMLElement> {
  placeholder: string;
  name: string;
  onSubmit: (query: string) => void;
}

export const SearchBar = ({
  placeholder,
  name,
  onSubmit,
  ...inputProps
}: SearchBarProps) => {

  const [searchQuery, setSearchQuery] = useState("")


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if(searchQuery.trim() && onSubmit) {
      onSubmit(searchQuery.trim())
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
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
        value={searchQuery}
        onChange={handleChange}
        {...inputProps}
      />
    </form>
  );
};

import { useState } from "react";
import { Icon } from "./Icon";

interface SearchBarProps {
  placeholder: string;
  name: string;
  onSubmit: (query: string) => void;
  onClose?: () => void;
}

export const SearchBar = ({
  placeholder,
  name,
  onSubmit,
  onClose,
  ...inputProps
}: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && onSubmit) {
      onSubmit(searchQuery.trim());
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClear = () => {
    setSearchQuery("");
    if (onClose) {
      onClose();
    }
  };

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

      <button
        className="search-bar__btn-close"
        type="button"
        onClick={handleClear}
        aria-label="Очистить поиск"
      >
        <Icon name="icon-close" width={24} height={24} />
      </button>
    </form>
  );
};

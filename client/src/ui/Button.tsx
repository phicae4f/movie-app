interface ButtonProps {
  className?: string;
  type: "submit" | "button" | "reset";
  text: string;
  disabled?: boolean,
  onClick?: () => void
}

export const Button = ({
  className = "btn",
  type = "button",
  text,
  disabled = false,
  onClick
}: ButtonProps) => {
  return (
    <button className={className} type={type} disabled={disabled} onClick={onClick}>
      {text}
    </button>
  );
};

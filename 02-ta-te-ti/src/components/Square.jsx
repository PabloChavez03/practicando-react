const Square = ({ children, updateSquare, isSelected, index }) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;

  function handleClick() {
    updateSquare(index);
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};

export default Square
function CardWrapper({ children, className = "" }) {
  return <article className={`card-wrapper ${className}`}>{children}</article>;
}

export default CardWrapper;

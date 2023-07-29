import "./badge.style.scss";

interface BadgeProps {
  content: string | number;
  variant?: "primary" | "secondary" | "tertiary";
}
const Badge = (prop: BadgeProps) => {
  return (
    <div className={`badge ${prop.variant}`}>
      <p>{prop.content}</p>
    </div>
  );
};

export default Badge;

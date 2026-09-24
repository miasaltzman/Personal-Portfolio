export function ArrowIcon({
  direction = "right",
  className = "",
}: {
  direction?: "right" | "up-right" | "down" | "left";
  className?: string;
}) {
  const rotate = { right: 0, "up-right": -45, down: 90, left: 180 }[direction];
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      className={className}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type TagProps = {
  children: React.ReactNode;
  /** `accent` is for the handful of tags worth pulling the eye toward. */
  tone?: "default" | "accent";
};

export function Tag({ children, tone = "default" }: TagProps) {
  const tones = {
    default: "border-line bg-card text-body",
    accent: "border-accent/20 bg-accent-soft text-accent-strong",
  } as const;

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function TagList({
  items,
  tone = "default",
}: {
  items: string[];
  tone?: "default" | "accent";
}) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item}>
          <Tag tone={tone}>{item}</Tag>
        </li>
      ))}
    </ul>
  );
}

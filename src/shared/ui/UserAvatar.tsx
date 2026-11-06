import { Avatar } from "@heroui/react";

type UserAvatarProps = {
  src: string;
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function UserAvatar({ src, name, size = "md", className }: UserAvatarProps) {
  return (
    <Avatar className={className} size={size}>
      <Avatar.Image alt={name} src={src} />
      <Avatar.Fallback>{initials(name)}</Avatar.Fallback>
    </Avatar>
  );
}

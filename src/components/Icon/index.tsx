import React from "react";

const icons = {
  private: (
    <path d='M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z' />
  ),
  copy: (
    <path d='M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z' />
  ),
};

type IconProps = {
  name: string;
  color?: string;
  size?: number;
  className?: string;
};

export default function Icon({
  name,
  color = "#000000",
  size = 24,
  className = "",
}: IconProps) {
  return (
    <svg
      fill={color}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      width={`${size}px`}
      height={`${size}px`}
      className={className}
    >
      {icons[name]}
    </svg>
  );
}

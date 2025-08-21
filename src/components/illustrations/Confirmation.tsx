import React from "react";

type Props = {
  width?: number;
  height?: number;
  className?: string;
};

export function ConfirmationIllustration({ width = 244, height = 190, className }: Props) {
  return (
    <div className={className} aria-hidden="true">
      <img
        src="/lovable-uploads/d3efabe8-9ff6-4127-a291-fdfebee81fe7.png"
        alt=""
        width={width}
        height={height}
        className="mx-auto object-contain"
      />
    </div>
  );
}
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
        src="/lovable-uploads/0bb9d777-e3cd-43f3-a50f-cc2e6a0509e8.png"
        alt=""
        width={width}
        height={height}
        className="mx-auto object-contain"
      />
    </div>
  );
}
import React from "react";

type Props = {
  width?: number;
  height?: number;
  className?: string;
};

export function ConfirmationIllustration({ width = 244, height = 190, className }: Props) {
  return (
    <div className={className} aria-hidden="true">
      <div
        style={{ width: `${width}px`, height: `${height}px` }}
        className="mx-auto bg-blue-50 rounded-lg flex items-center justify-center"
      >
        <div className="text-xs text-muted-foreground text-center p-4">
          Confirmation Illustration
          <br />
          {width}x{height}
          <br />
          <span className="text-xs opacity-75">SVG markup needed</span>
        </div>
      </div>
    </div>
  );
}
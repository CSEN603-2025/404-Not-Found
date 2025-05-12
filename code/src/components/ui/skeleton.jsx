"use client";

import React from "react";
import { cn } from "../../lib/utils"; // Corrected import path for utils

export function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        "animate-pulse bg-gray-300 rounded",
        className // Allows custom styles to be passed
      )}
      {...props}
    />
  );
}
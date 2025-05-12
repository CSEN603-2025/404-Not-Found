"use client";

import React, { useState } from "react";

export function AlertDialog({ children }) {
  return <div>{children}</div>;
}

export function AlertDialogTrigger({ children, asChild }) {
  return asChild ? children : <button>{children}</button>;
}

export function AlertDialogContent({ children }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">{children}</div>
    </div>
  );
}

export function AlertDialogHeader({ children }) {
  return <div className="mb-4">{children}</div>;
}

export function AlertDialogTitle({ children }) {
  return <h2 className="text-lg font-bold">{children}</h2>;
}

export function AlertDialogDescription({ children }) {
  return <p className="text-sm text-gray-600">{children}</p>;
}

export function AlertDialogFooter({ children }) {
  return <div className="mt-4 flex justify-end space-x-2">{children}</div>;
}

export function AlertDialogCancel({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
    >
      {children}
    </button>
  );
}

export function AlertDialogAction({ children, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 ${className}`}
    >
      {children}
    </button>
  );
}
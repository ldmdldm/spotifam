import React from 'react';

interface Props {
  message: string;
}

export function ErrorMessage({ message }: Props) {
  return (
    <div className="text-center mb-8 p-4 bg-red-100 text-red-700 rounded-lg">
      {message}
    </div>
  );
}
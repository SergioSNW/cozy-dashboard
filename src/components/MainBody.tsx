import type React from 'react';

type MainBodyProps = React.PropsWithChildren<{}>;

export const MainBody = ({ children }: MainBodyProps) => {
  return (
    <main className="flex justify-center items-start mt-10 px-4 min-h-auto">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-4xl">
        {children}
      </div>
    </main>
  );
};

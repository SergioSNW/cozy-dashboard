type WidgetProps = {
  id: string;
  title: string;
  onRemove: (id: string) => void;
  children: React.ReactNode;
};

export const Widget = ({ id, title, onRemove, children }: WidgetProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
      <header className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">{title}</h3>
        <button
          onClick={() => onRemove(id)}
          aria-label="Remove widget"
          className="text-red-500 hover:text-red-700"
        >
          ✕
        </button>
      </header>
      <div className="flex-1">{children}</div>
    </div>
  );
};

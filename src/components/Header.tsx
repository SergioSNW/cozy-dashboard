// New way to express the type of PROPS passed to this component
type HeaderProps = {
  user: { name: string; avatarUrl: string };
};

// Check how we extract the user from props and reference it.
export const Header = ({ user }: HeaderProps) => {
  return (
    <header className="rounded-tl-2xl rounded-tr-2xl flex items-center justify-between bg-white px-8 py-4 shadow-sm w-full">
      <h1 className="text-2xl font-bold text-blue-700">Cozy Dashboard</h1>
      <div className="flex items-center space-x-3">
        <span className="text-gray-700 font-medium">{user.name}</span>
        <img
          className="w-10 h-10 rounded-full border-2 border-blue-100"
          src={user.avatarUrl}
          alt={`${user.name} avatar`}
        />
      </div>
    </header>
  );
};

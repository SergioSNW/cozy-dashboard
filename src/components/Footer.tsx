export default function Footer() {
  return (
    <footer className="mt-auto bg-white text-gray-600 py-4 px-8 rounded-b-2xl shadow-inner text-center text-sm">
      © {new Date().getFullYear()} Cozy Dashboard. All rights reserved.
    </footer>
  );
}

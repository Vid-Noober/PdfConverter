import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const [dropdown, setDropdown] = useState(false);
  const location = useLocation();

  // This is the magic fix: close dropdown whenever the URL changes
  useEffect(() => {
    setDropdown(false);
  }, [location]);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="font-bold text-xl text-red-500">
          BRO VID SINGLE
        </Link>

        {/* Menu */}
        <nav className="hidden md:flex gap-6 items-center">

          <div className="relative">
            <button
              onClick={() => setDropdown(!dropdown)}
              className="hover:text-red-500 font-medium flex items-center gap-1"
            >
              Convert PDF <span className="text-[10px]">{dropdown ? "▲" : "▼"}</span>
            </button>
            
            {dropdown && (
              <div className="absolute top-full left-0 bg-white shadow-xl border border-gray-100 rounded-lg mt-2 w-48 py-2 z-[60]">
                <Link
                  to="/convert-pdf"
                  className="block px-4 py-2 hover:bg-red-50 hover:text-red-500"
                >
                  Image to PDF
                </Link>
              </div>
            )}
          </div>
        </nav>

        <div className="md:hidden">
          <button className="text-2xl">☰</button>
        </div>
      </div>
    </header>
  );
}
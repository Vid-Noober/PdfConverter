import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [dropdown, setDropdown] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="font-bold text-xl text-red-500">
         BRO VID SINGLE
        </div>

        {/* Menu */}
        <nav className="hidden md:flex gap-6 items-center">
          <Link to="/merge" className="hover:text-red-500">Merge</Link>
          <Link to="/split" className="hover:text-red-500">Split</Link>
          <Link to="/compress" className="hover:text-red-500">Compress</Link>

          <div className="relative">
            <button
              onClick={() => setDropdown(!dropdown)}
              className="hover:text-red-500"
            >
              Convert PDF ▼
            </button>
            {dropdown && (
              <div className="absolute top-full left-0 bg-white shadow-md rounded-md mt-1 w-40">
                <Link
                  to="/convert-pdf"
                  className="block px-4 py-2 hover:bg-red-50"
                >
                  Image to PDF
                </Link>
              </div>
            )}
          </div>
        </nav>

       

        {/* Mobile menu toggle */}
        <div className="md:hidden">
          {/* Could add hamburger menu for mobile */}
        </div>
      </div>
    </header>
  );
}

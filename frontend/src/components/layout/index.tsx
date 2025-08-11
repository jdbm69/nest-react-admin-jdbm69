import { useState } from 'react';
import { Menu, X } from 'react-feather';

import Sidebar from './Sidebar';

export default function Layout({ children }) {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <Sidebar className={showSidebar ? 'show' : ''} />
      <div className="pt-10 py-5 px-5 mx-auto w-screen lg:pl-80 sm:px-10">
        {children}
      </div>
      <button
        className={`fixed bottom-5 border shadow-md bg-brand-primary p-3 rounded-full transition-all focus:outline-none text-white lg:hidden ${
          showSidebar ? 'right-5' : 'left-5'
        }`}
        onClick={() => setShowSidebar(!showSidebar)}
      >
        {showSidebar ? <X size={30} /> : <Menu size={30} />}
      </button>
    </>
  );
}

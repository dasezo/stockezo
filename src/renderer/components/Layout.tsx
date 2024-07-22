import React from 'react';
import Sidebar from './Sidebar';

function Layout({
  children,
  activeView,
}: {
  children: JSX.Element;
  activeView: string;
}) {
  return (
    <main className="h-screen flex w-screen relative ">
      <Sidebar activeView={activeView} />
      <div className="w-full px-16 py-24 h-screen overflow-auto">
        {children}
      </div>
    </main>
  );
}

export default Layout;

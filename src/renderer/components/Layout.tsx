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
    <main className="h-screen flex flex-col w-screen relative ">
      <Sidebar activeView={activeView} />
      <div className="w-full px-8 py-6 h-screen overflow-auto">{children}</div>
    </main>
  );
}

export default Layout;

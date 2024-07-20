import React from 'react';
import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';
import Layout from 'renderer/components/Layout';

export default function Home() {
  const items: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-palette',
      url: '/',
    },
    {
      label: 'Products',
      icon: 'pi pi-link',
      url: '/products',
    },
  ];

  return (
    <Layout activeView="home">
      <div className="border">Hello world!!</div>
    </Layout>
  );
}

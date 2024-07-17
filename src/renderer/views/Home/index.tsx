import React from 'react';
import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';

export default function Home() {
  const items: MenuItem[] = [
    {
      label: 'Router',
      icon: 'pi pi-palette',
      items: [
        {
          label: 'Styled',
          url: '/theming',
        },
        {
          label: 'Unstyled',
          url: '/unstyled',
        },
      ],
    },
    {
      label: 'Programmatic',
      icon: 'pi pi-link',
      command: () => {
        // router.push('/installation');
      },
    },
    {
      label: 'External',
      icon: 'pi pi-home',
      items: [
        {
          label: 'React.js',
          url: 'https://react.dev/',
        },
        {
          label: 'Vite.js',
          url: 'https://vitejs.dev/',
        },
      ],
    },
  ];

  return (
    <div className="card">
      <Menubar model={items} />
    </div>
  );
}

import { useContext } from 'react';

import { AuthContext } from 'renderer/context/Auth';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';

export default function Sidebar({
  className = '',
  activeView,
}: {
  className?: string;
  activeView: string;
}) {
  const { logout } = useContext(AuthContext);
  return (
    <aside
      className={`${className} ${styles.sidebar}  shadow-xl border-b  bg-gray-50 top-0 sticky`}
    >
      <h1 className="p-4 text-center text-xl font-bold uppercase tracking-widest ">
        Stock<span className="text-blue-500 font-semibold ">ezo</span>
      </h1>
      <div className="flex px-4">
        <Link
          to="/"
          className={`block p-4  hover:bg-gray-100 font-semibold text-gray-800 ${
            activeView == 'home' && 'bg-gray-200 border-blue-500 border-b-2'
          }`}
        >
          Vente
        </Link>
        <Link
          to="/products"
          className={`block p-4  hover:bg-gray-100 font-semibold text-gray-800 ${
            activeView == 'products' && 'bg-gray-200 border-blue-500 border-b-2'
          }`}
        >
          Produits
        </Link>
        <Link
          to="/invoices"
          className={`block p-4  hover:bg-gray-100 font-semibold text-gray-800 ${
            activeView == 'invoices' && 'bg-gray-200 border-blue-500 border-b-2'
          }`}
        >
          Factures
        </Link>
      </div>
    </aside>
  );
}

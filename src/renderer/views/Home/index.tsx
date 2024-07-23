import Layout from 'renderer/components/Layout';

import { useState } from 'react';
import Entreprise from './Entreprise';
import Client from './Client';
import Facture from './Facture';

export interface EntrepriseType {
  name: string | null;
  address: string | null;
  nrc: string | null;
  rif: number | null;
  codeArticle: number | null;
  niss: string | null;
  compte: string | null;
}

export interface ClientType {
  name: string | null;
  nArticle: number | null;
  idFacial: string | null;
  nrc: string | null;
}

export interface FactureType {
  type: 'facture' | 'bon';
  code: string;
  date: Date;
}

export interface ProductType {
  id: number;
  name: string;
  price: number;
  quantity: number;
  colis: number;
  totalQuantity: number;
  discount: number;
  totalAmount: number;
}

export function newProduct({
  id,
  name,
  price,
  quantity,
  colis,
  discount,
}: {
  id: number;
  name: string;
  price: number;
  quantity: number;
  colis: number;
  discount: number;
}) {
  return {
    id,
    name,
    price,
    quantity,
    colis,
    totalQuantity: quantity * colis,
    discount,
    totalAmount: price * quantity * colis * (1 - discount / 100),
  };
}

export default function Home() {
  const [entreprise, setEntreprise] = useState<EntrepriseType>({
    name: null,
    address: null,
    nrc: null,
    rif: null,
    codeArticle: null,
    niss: null,
    compte: null,
  });

  const [client, setClient] = useState<ClientType>({
    name: null,
    nArticle: null,
    idFacial: null,
    nrc: null,
  });

  const [facture, setFacture] = useState<FactureType>({
    type: 'facture',
    code: 'FV012/21',
    date: new Date(),
  });

  const prod1 = newProduct({
    id: 2,
    name: 'Fer',
    price: 1000,
    quantity: 10,
    colis: 1,
    discount: 1,
  });
  const [products, setProducts] = useState<ArticleType[]>([
    prod1,
    {
      id: 3,
      name: 'Sable',
      price: 200,
      quantity: 10,
      colis: 1,
      totalQuantity: 10,
      discount: 0,
      totalAmount: 2000,
    },
    {
      id: 4,
      name: 'Gravier',
      price: 300,
      quantity: 10,
      colis: 1,
      totalQuantity: 10,
      discount: 0,
      totalAmount: 3000,
    },
  ]);

  return (
    <Layout activeView="home">
      <div className="flex  gap-4">
        <div className="flex flex-col gap-4">
          <Client client={client} setClient={setClient} />
          <Entreprise entreprise={entreprise} setEntreprise={setEntreprise} />
        </div>
        <div className="w-full">
          <Facture
            facture={facture}
            setFacture={setFacture}
            products={products}
            setProducts={setProducts}
          />
        </div>
      </div>
    </Layout>
  );
}

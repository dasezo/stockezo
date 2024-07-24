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
  timbre: number;
}

export interface ProductType {
  id: number;
  name: string;
  price: number;
  qte: number;
  colis: number;
  totalQuantity: number;
  discount: number;
  totalAmount: number;
}

export interface TotalsType {
  montantHT: number;
  montantTTC: number;
  timbre: number;
  montantTVA: number;
  remise: number;
}

export function newProduct({
  id,
  name,
  price,
  qte,
  colis,
  discount,
}: {
  id: number;
  name: string;
  price: number;
  qte: number;
  colis: number;
  discount: number;
}) {
  return {
    id,
    name,
    price,
    qte,
    colis,
    totalQuantity: qte * colis,
    discount,
    totalAmount: price * qte * colis * (1 - discount / 100),
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
    timbre: 2500,
    date: new Date(),
  });

  const [totals, setTotals] = useState<TotalsType>({
    montantHT: 0,
    montantTTC: 0,
    timbre: 0,
    montantTVA: 0,
    remise: 0,
  });

  const [products, setProducts] = useState<ProductType[]>([]);

  return (
    <Layout activeView="home">
      <div className="flex flex-col  gap-4">
        <div className="flex  gap-4">
          <Entreprise entreprise={entreprise} setEntreprise={setEntreprise} />
          <Client client={client} setClient={setClient} />
        </div>
        <div className="w-full">
          <Facture
            facture={facture}
            setFacture={setFacture}
            products={products}
            setProducts={setProducts}
            totals={totals}
            setTotals={setTotals}
          />
        </div>
      </div>
    </Layout>
  );
}

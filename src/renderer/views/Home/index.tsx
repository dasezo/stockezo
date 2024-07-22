import Layout from 'renderer/components/Layout';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { useEffect, useState } from 'react';
import Entreprise from './Entreprise';
import Client from './Client';
import Facture from './Facture';
import { format } from 'date-fns';

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
  useEffect(() => {
    console.log(facture);
  }, [facture]);

  return (
    <Layout activeView="home">
      <div className="flex flex-col gap-4">
        <Entreprise entreprise={entreprise} setEntreprise={setEntreprise} />
        <Client client={client} setClient={setClient} />
        <Facture facture={facture} setFacture={setFacture} />
      </div>
    </Layout>
  );
}

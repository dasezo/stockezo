import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { useEffect } from 'react';

function Client({ client, setClient }) {
  return (
    <div className="border bg-gray-50 rounded-md p-6">
      <h2 className="text-xl font-semibold mb-6">Client</h2>
      <div>
        <div className="flex flex-col space-y-8 px-8 my-6">
          <FloatLabel className="w-full">
            <InputText
              id="namec"
              className="p-inputtext-sm  w-full"
              value={client.name}
              onChange={(e) =>
                setClient({
                  ...client,
                  name: e.target.value,
                })
              }
            />
            <label htmlFor="namec">Nom Client</label>
          </FloatLabel>
          <FloatLabel className="w-full">
            <InputText
              id="nArticle"
              className="p-inputtext-sm w-full"
              value={client.nArticle}
              onChange={(e) =>
                setClient({
                  ...client,
                  nArticle: e.target.value,
                })
              }
            />
            <label htmlFor="nArticle">N° Article</label>
          </FloatLabel>
        </div>
        <div className="flex flex-col space-y-8 px-8 my-6">
          <FloatLabel className="w-full">
            <InputText
              id="idFacial"
              className="p-inputtext-sm  w-full"
              value={client.idFacial}
              onChange={(e) =>
                setClient({
                  ...client,
                  idFacial: e.target.value,
                })
              }
            />
            <label htmlFor="idFacial">ID Facial</label>
          </FloatLabel>
          <FloatLabel className="w-full">
            <InputText
              id="nrc"
              className="p-inputtext-sm w-full"
              value={client.nrc}
              onChange={(e) =>
                setClient({
                  ...client,
                  nrc: e.target.value,
                })
              }
            />
            <label htmlFor="nrc">N°RC</label>
          </FloatLabel>
        </div>
      </div>
    </div>
  );
}

export default Client;

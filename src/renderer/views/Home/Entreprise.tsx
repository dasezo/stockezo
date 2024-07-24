import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { useEffect } from 'react';

function Entreprise({ entreprise, setEntreprise }) {
  const handleEntrepriseChange = (data) => {
    setEntreprise(data);
    localStorage.setItem('entreprise', JSON.stringify(data));
  };

  useEffect(() => {
    const data = localStorage.getItem('entreprise');
    if (data) {
      setEntreprise(JSON.parse(data));
    }
  }, []);

  return (
    <div className="border bg-gray-50 rounded-md p-6 w-full">
      <h2 className="text-xl font-semibold mb-6">Entreprise</h2>
      <div>
        <div className="flex space-x-4 px-8 my-6">
          <FloatLabel className="w-full">
            <InputText
              id="name"
              className="p-inputtext-sm  w-full"
              value={entreprise.name}
              onChange={(e) =>
                handleEntrepriseChange({
                  ...entreprise,
                  name: e.target.value,
                })
              }
            />
            <label htmlFor="name">Nom Entreprise</label>
          </FloatLabel>
          <FloatLabel className="w-full">
            <InputText
              id="address"
              className="p-inputtext-sm w-full"
              value={entreprise.address}
              onChange={(e) =>
                handleEntrepriseChange({
                  ...entreprise,
                  address: e.target.value,
                })
              }
            />
            <label htmlFor="address">Addresse</label>
          </FloatLabel>
        </div>
        <div className="flex space-x-4 px-8 my-6">
          <FloatLabel className="w-full">
            <InputText
              id="nrc"
              className="p-inputtext-sm  w-full"
              value={entreprise.nrc}
              onChange={(e) =>
                handleEntrepriseChange({ ...entreprise, nrc: e.target.value })
              }
            />
            <label htmlFor="nrc">N°RC</label>
          </FloatLabel>
          <FloatLabel className="w-full">
            <InputText
              id="rif"
              className="p-inputtext-sm w-full"
              value={entreprise.rif}
              onChange={(e) =>
                handleEntrepriseChange({ ...entreprise, rif: e.target.value })
              }
            />
            <label htmlFor="rif">R.I.F</label>
          </FloatLabel>
        </div>
        <div className="flex space-x-4 px-8 my-6">
          <FloatLabel className="w-full">
            <InputText
              id="codeArticle"
              className="p-inputtext-sm  w-full"
              value={entreprise.codeArticle}
              onChange={(e) =>
                handleEntrepriseChange({
                  ...entreprise,
                  codeArticle: e.target.value,
                })
              }
            />
            <label htmlFor="codeArticle">Code Article</label>
          </FloatLabel>
          <FloatLabel className="w-full">
            <InputText
              id="niss"
              className="p-inputtext-sm w-full"
              value={entreprise.niss}
              onChange={(e) =>
                handleEntrepriseChange({
                  ...entreprise,
                  niss: e.target.value,
                })
              }
            />
            <label htmlFor="niss">NISS</label>
          </FloatLabel>
          <FloatLabel className="w-full">
            <InputText
              id="compte"
              className="p-inputtext-sm w-full"
              value={entreprise.compte}
              onChange={(e) =>
                handleEntrepriseChange({
                  ...entreprise,
                  compte: e.target.value,
                })
              }
            />
            <label htmlFor="compte">Compte</label>
          </FloatLabel>
        </div>
      </div>
    </div>
  );
}

export default Entreprise;

import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { SelectButton } from 'primereact/selectbutton';
import { Calendar } from 'primereact/calendar';
import { format } from 'date-fns';
import ProductsTable from './ProductsTable';

function Facture({ facture, setFacture, products, setProducts }) {
  const type = [
    { name: 'Facture de vente', type: 'facture' },
    { name: 'Bon de vente', type: 'bon' },
  ];
  return (
    <div className="border bg-gray-50 rounded-md p-6">
      <h2 className="text-xl font-semibold mb-6">Facture</h2>
      <div>
        <div className="flex space-x-4 px-8 my-6 justify-center">
          <SelectButton
            value={facture.type}
            onChange={(e) =>
              setFacture({ ...facture, type: e.value ?? 'facture' })
            }
            options={['facture', 'bon']}
            className="capitalize"
            required
          />
          <InputText
            value={facture.code}
            onChange={(e) => setFacture({ ...facture, code: e.target.value })}
          />
          <FloatLabel>
            <Calendar
              inputId="date"
              value={facture.date}
              onChange={(e) => setFacture({ ...facture, date: e.value })}
              className="text-black"
            />
            <label htmlFor="date">Date</label>
          </FloatLabel>
        </div>
      </div>
      <div>
        <ProductsTable products={products} setProducts={setProducts} />
      </div>
      {/* <div className="w-full flex border rounded mb-4 py-2 bg-white">
        <div
          className=" mx-1 flex-1 flex justify-center font-bold"
          style={{ maxWidth: '64px' }}
        >
          N°
        </div>
        <div
          className=" mx-1 flex-grow flex justify-center font-bold"
          style={{ minWidth: '365px' }}
        >
          Désignation
        </div>
        <div className=" mx-1 flex-1 flex justify-center font-bold">QTE</div>
        <div className=" mx-1 flex-1 flex justify-center font-bold">Colis</div>
        <div className=" mx-1 flex-1 flex justify-center font-bold">
          TotalQte
        </div>
        <div className=" mx-1 flex-1 flex justify-center font-bold">Prix</div>
        <div className=" mx-1 flex-1 flex justify-center font-bold">Remise</div>
        <div className=" mx-1 flex-1 flex justify-center font-bold">
          Montant
        </div>
      </div>
      <div className="w-full flex ">
        <div
          className="bg-white py-1 rounded mx-1 flex-1 flex justify-center "
          style={{ maxWidth: '64px' }}
        >
          1
        </div>
        <div
          className="bg-white py-1 rounded mx-1 flex-grow flex justify-center "
          style={{ minWidth: '365px' }}
        >
          Asus Zenbook 14
        </div>
        <div className="bg-white py-1 rounded mx-1 flex-1 flex justify-center ">
          2
        </div>
        <div className="bg-white py-1 rounded mx-1 flex-1 flex justify-center ">
          10
        </div>
        <div className="bg-white py-1 rounded mx-1 flex-1 flex justify-center ">
          20
        </div>
        <div className="bg-white py-1 rounded mx-1 flex-1 flex justify-center ">
          10000
        </div>
        <div className="bg-white py-1 rounded mx-1 flex-1 flex justify-center ">
          0%
        </div>
        <div className="bg-white py-1 rounded mx-1 flex-1 flex justify-center ">
          200000
        </div>
      </div> */}
    </div>
  );
}

export default Facture;

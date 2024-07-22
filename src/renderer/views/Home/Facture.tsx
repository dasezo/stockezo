import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { SelectButton } from 'primereact/selectbutton';
import { Calendar } from 'primereact/calendar';
import { format } from 'date-fns';

function Facture({ facture, setFacture }) {
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
            onChange={(e) => setFacture({ ...facture, type: e.value })}
            options={['facture', 'bon']}
            className="capitalize"
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
    </div>
  );
}

export default Facture;

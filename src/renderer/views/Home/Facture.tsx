import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { SelectButton } from 'primereact/selectbutton';
import { Calendar } from 'primereact/calendar';
import { format } from 'date-fns';
import ProductsTable from './ProductsTable';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';

function Facture({
  facture,
  setFacture,
  products,
  setProducts,
  totals,
  setTotals,
}) {
  const type = [
    { name: 'Facture de vente', type: 'facture' },
    { name: 'Bon de vente', type: 'bon' },
  ];

  useEffect(() => {
    const { timbre } = facture;
    let montantHT = 0;
    let montantTTC = 0;
    let montantTVA = 0;

    let remise = 0;

    products.forEach((p) => {
      console.log(p);
      montantHT += p.totalAmount;
      remise += p.discount;
    });

    montantTVA = montantHT * 0.19;

    montantTTC = montantHT + montantTVA + timbre;

    setTotals({
      montantHT,
      montantTTC,
      montantTVA,
      timbre,
      remise,
    });
  }, [products]);

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
          <FloatLabel>
            <InputNumber
              inputId="tmbr"
              value={facture.timbre}
              onChange={(e) => setFacture({ ...facture, timbre: e.value })}
              className="text-black"
              mode="currency"
              currency="DZD"
              locale="ar-DZ"
            />
            <label htmlFor="tmbr">Timbre</label>
          </FloatLabel>
        </div>
      </div>
      <div>
        <ProductsTable
          products={products}
          setProducts={setProducts}
          totals={totals}
          setTotals={setTotals}
        />
      </div>
      <div className="flex justify-end gap-4 mt-6">
        <Button
          label="Vider Facture"
          icon="pi pi-cors"
          iconPos="right"
          severity="secondary"
          outlined
          onClick={() => setProducts([])}
        />
        <Button label="Valider" icon="pi pi-check" iconPos="right" />
      </div>
    </div>
  );
}

export default Facture;

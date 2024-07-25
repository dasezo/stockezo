import { useReactToPrint } from 'react-to-print';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { useEffect, useRef, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { SelectButton } from 'primereact/selectbutton';
import { Calendar } from 'primereact/calendar';
import { format } from 'date-fns';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import ProductsTable from './ProductsTable';
import formatCurrency from 'renderer/utils/formatCurrency';
import { validate } from 'webpack';

function Facture({
  facture,
  setFacture,
  products,
  setProducts,
  totals,
  setTotals,
  entreprise,
  client,
}) {
  const [visible, setVisible] = useState(false);
  const factureRef = useRef(null);
  const generatePdf = useReactToPrint({ content: () => factureRef.current });
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

  const submitFacture = () => {
    generatePdf();
  };

  const footerContent = (
    <div>
      <Button
        label="Anuller"
        icon="pi pi-times"
        onClick={() => setVisible(false)}
        className="p-button-text"
      />
      <Button
        label="Imprimer"
        icon="pi pi-check"
        onClick={() => submitFacture()}
        disabled={products.length === 0 || !client?.name || !entreprise?.name}
        autoFocus
      />
    </div>
  );

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
              value={facture?.date ?? new Date()}
              // onChange={(e) =>
              //   e.value instanceof Date &&
              //   console.log({ ...facture, date: e.value })
              // }
              onChange={(e) =>
                e.value instanceof Date &&
                setFacture({ ...facture, date: e.value })
              }
              className="text-black"
              showIcon
              // disabled
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
        <Button
          label="Valider"
          icon="pi pi-check"
          iconPos="right"
          onClick={() => setVisible(true)}
        />
        <Dialog
          header="Impression de Facture"
          visible={visible}
          style={{ width: '80vw' }}
          maximizable
          footer={footerContent}
          draggable={false}
          resizable={false}
          onHide={() => {
            if (!visible) return;
            setVisible(false);
          }}
        >
          <div
            className="bg-white rounded p-8 text-xs text-gray-700"
            ref={factureRef}
          >
            <div className="border-b">
              <div className="mb-1">
                <span className="font-bold text-lg tracking-widest uppercase">
                  {entreprise?.name}
                </span>
              </div>
              {facture?.type === 'facture' && (
                <>
                  <div
                    className="flex justify-between "
                    style={{ width: '80%' }}
                  >
                    <span className="font-semibold ">
                      N°RC: {entreprise?.nrc}
                    </span>{' '}
                    <span className="font-semibold ">
                      R.I.F: {entreprise?.rif}
                    </span>
                  </div>
                  <div
                    className="flex justify-between "
                    style={{ width: '80%' }}
                  >
                    <span className="font-semibold ">
                      Code ARticle: {entreprise?.nrc}
                    </span>{' '}
                    <span className="font-semibold ">
                      NISS: {entreprise?.rif}
                    </span>
                  </div>
                  <div
                    className="flex justify-between "
                    style={{ width: '80%' }}
                  >
                    <span className="font-semibold ">
                      Compte: {entreprise?.codeArticle}
                    </span>
                  </div>
                </>
              )}
              <div className="flex justify-between " style={{ width: '80%' }}>
                <span className="font-semibold ">
                  Adresse: {entreprise?.address}
                </span>
              </div>
            </div>
            <div className="w-full my-2 font-semibold flex justify-between gap-2">
              <div className="flex flex-col" style={{ width: '40%' }}>
                <span className="capitalize text-lg font-bold">
                  {facture?.type} de Vente
                </span>
                <span className="capitalize">{facture?.code}</span>
                <span className="capitalize">
                  {format(facture?.date, 'dd/MM/yyyy')}
                </span>
              </div>
              <div className="flex-1 ml-auto" style={{ width: '50%' }}>
                <div className="capitalize border-b text-sm font-bold">
                  Clinet: {client?.name}
                </div>
                <div className="capitalize">N° Article: {client?.nArticle}</div>
                <div className="capitalize">ID Facial: {client?.idFacial}</div>
                <div className="capitalize">N°RC: {client?.nrc}</div>
              </div>
            </div>
            <div>
              <table className="w-full my-6" border>
                <thead className="border-t border-b">
                  <tr>
                    <th className="text-center border-r border-l">N°</th>
                    <th className="text-center border-r">Designation</th>
                    <th className="text-center border-r">QTE</th>
                    <th className="text-center border-r">Colis</th>
                    <th className="text-center border-r">Total Qte</th>
                    <th className="text-center border-r">Prix</th>
                    <th className="text-center border-r">Remise</th>
                    <th className="text-center border-r">Montant</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p, i) => (
                    <tr key={i}>
                      <td className="text-center px-2 border-r border-l border-b">
                        {i + 1}
                      </td>
                      <td className="text-left px-2 border-r border-b">
                        {p.name}
                      </td>
                      <td className="text-center px-2 border-r border-b">
                        {p.qte}
                      </td>
                      <td className="text-center px-2 border-r border-b">
                        {p.colis}
                      </td>
                      <td className="text-center px-2 border-r border-b">
                        {p.totalQuantity}
                      </td>
                      <td className="text-center px-2 border-r border-b">
                        {formatCurrency(p.price)}
                      </td>
                      <td className="text-center px-2 border-r border-b">
                        {p.discount}%
                      </td>
                      <td className="text-center px-2 border-r border-b">
                        {formatCurrency(p.totalAmount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between gap-4">
              <div className="pl-16 text-center">
                <p>Mode de paiement: Espèce</p>
              </div>
              <div className="flex flex-col " style={{ width: '40%' }}>
                <div className="flex justify-between border-b">
                  <span className=" font-semibold">Montant HT</span>
                  <span className="text-sm font-bold">
                    {formatCurrency(totals?.montantHT)}
                  </span>
                </div>
                <div className="flex justify-between border-b">
                  <span className=" font-semibold">Remise</span>
                  <span className="text-sm font-bold">{totals?.remise}%</span>
                </div>
                <div className="flex justify-between border-b">
                  <span className=" font-semibold">Montant TVA</span>
                  <span className="text-sm font-bold">
                    {formatCurrency(totals?.montantTVA)}
                  </span>
                </div>
                <div className="flex justify-between border-b">
                  <span className=" font-semibold">Timbre</span>
                  <span className="text-sm font-bold">
                    {formatCurrency(totals?.timbre)}
                  </span>
                </div>
                <div className="flex justify-between border-b">
                  <span className=" font-semibold">Montant TTC</span>
                  <span className="text-sm font-bold">
                    {formatCurrency(totals?.montantTTC)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
}

export default Facture;

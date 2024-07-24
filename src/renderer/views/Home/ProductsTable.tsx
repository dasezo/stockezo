import React, { useEffect, useRef, useState } from 'react';
import { DataTable, DataTableRowEditCompleteEvent } from 'primereact/datatable';
import { Column, ColumnEditorOptions } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import {
  InputNumber,
  InputNumberValueChangeEvent,
} from 'primereact/inputnumber';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { newProduct, ProductType } from './index';
import formatCurrency from 'renderer/utils/formatCurrency';
import { FloatLabel } from 'primereact/floatlabel';
import Product from 'types/Product';
import { Button } from 'primereact/button';
import { set } from 'date-fns';
import { ContextMenu } from 'primereact/contextmenu';
import { Toast } from 'primereact/toast';

export default function ProductsTable({
  products,
  setProducts,
  totals,
  setTotals,
}) {
  const [storedProducts, setStoredProducts] = useState([]);
  const [importedProduct, setImportedProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [addedProduct, setAddedProduct] = useState<ProductType>({
    id: null,
    name: null,
    price: null,
    qte: null,
    colis: null,
    totalQuantity: null,
    discount: null,
    totalAmount: null,
  });
  const cm = useRef(null);
  const toast = useRef(null);
  const menuModel = [
    {
      label: 'Supprimer',
      icon: 'pi pi-fw pi-times',
      command: () => deleteProduct(selectedProduct),
    },
  ];
  const deleteProduct = (product) => {
    let _products = [...products];

    _products = _products.filter((p) => p.id !== product.id);

    toast.current.show({
      severity: 'error',
      summary: 'Produit Supprimé',
      detail: product.name,
    });
    setProducts(_products);
  };

  async function getAllProducts() {
    window.electron
      .getAllProducts()
      .then((res) => setStoredProducts(res))
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    getAllProducts();
  }, []);

  const onRowEditComplete = (e: DataTableRowEditCompleteEvent) => {
    let _products = [...products];
    let { newData, index } = e;

    _products[index] = newProduct(newData) as ProductType;

    setProducts(_products);
  };

  const textEditor = (options: ColumnEditorOptions) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          options.editorCallback!(e.target.value)
        }
      />
    );
  };

  const statusEditor = (options: ColumnEditorOptions) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e: DropdownChangeEvent) => options.editorCallback!(e.value)}
        placeholder="Select a Status"
        // itemTemplate={(option) => {
        //   return <Tag value={option} severity={getSeverity(option)}></Tag>;
        // }}
      />
    );
  };

  const priceEditor = (options: ColumnEditorOptions) => {
    return (
      <InputNumber
        value={options.value}
        onValueChange={(e: InputNumberValueChangeEvent) =>
          options.editorCallback!(e.value)
        }
        mode="currency"
        currency="DZD"
        locale="ar-DZ"
      />
    );
  };
  const numberEditor = (options: ColumnEditorOptions) => {
    return (
      <InputNumber
        value={options.value}
        onValueChange={(e: InputNumberValueChangeEvent) =>
          options.editorCallback!(e.value)
        }
        mode="decimal"
      />
    );
  };
  const discountEditor = (options: ColumnEditorOptions) => {
    return (
      <InputNumber
        value={options.value}
        onValueChange={(e: InputNumberValueChangeEvent) =>
          options.editorCallback!(e.value)
        }
        max={100}
        min={0}
        minFractionDigits={0}
        maxFractionDigits={2}
      />
    );
  };

  const priceBodyTemplate = (rowData: ProductType) => {
    return formatCurrency(rowData.price);
  };

  const discountBodyTemplate = (rowData: ProductType) => {
    return `${rowData.discount}%`;
  };
  const amountBodyTemplate = (rowData: ProductType) => {
    return formatCurrency(rowData.totalAmount);
  };

  const allowEdit = (rowData: ProductType) => {
    return rowData.name !== 'Blue Band';
  };

  const addProducttoTable = () => {
    setProducts((prev) => [...prev, addedProduct]);
    setImportedProduct(null);
  };

  useEffect(() => {
    setAddedProduct(
      newProduct({
        id: importedProduct?.id ?? null,
        name: importedProduct?.name ?? null,
        price: importedProduct?.price ?? null,
        qte: importedProduct ? 1 : null,
        colis: importedProduct ? 1 : null,
        discount: importedProduct ? 0 : null,
      }),
    );
  }, [importedProduct]);

  const rowIndexTemplate = (rowData, props) => {
    let index = parseInt(props.rowIndex + 1, 10);
    return <span>{index}</span>;
  };

  return (
    <div className="card p-fluid">
      <Toast ref={toast} />
      <div className="w-full">
        <div className="w-full flex space-x-1 my-6">
          <FloatLabel className="w-full">
            <Dropdown
              id="prod"
              value={importedProduct}
              onChange={(e) => setImportedProduct(e.value)}
              options={storedProducts}
              optionLabel="name"
              filter
              // placeholder="Produit"
              className="w-full md:w-14rem bg-blue-100"
            />
            <label htmlFor="prod">Ajouter Désignation</label>
          </FloatLabel>
          <FloatLabel style={{ width: '25%' }}>
            <InputNumber
              id="qte"
              value={addedProduct?.qte}
              onChange={(e) =>
                setAddedProduct(
                  newProduct({ ...addedProduct, qte: e.value ?? 0 }),
                )
              }
              mode="decimal"
              min={0}
              disabled={!importedProduct}
              placeholder="QTE"
            />
            <label htmlFor="qte">QTE</label>
          </FloatLabel>
          <FloatLabel style={{ width: '25%' }}>
            <InputNumber
              id="qte"
              value={addedProduct?.colis}
              onChange={(e) =>
                setAddedProduct(
                  newProduct({ ...addedProduct, colis: e.value ?? 0 }),
                )
              }
              min={0}
              mode="decimal"
              disabled={!importedProduct}
            />
            <label htmlFor="qte">Colis</label>
          </FloatLabel>
          <FloatLabel style={{ width: '20%' }}>
            <InputNumber
              id="ttlqt"
              value={addedProduct?.totalQuantity}
              disabled
            />
            <label htmlFor="ttlqt">Total QTE</label>
          </FloatLabel>
          <FloatLabel style={{ width: '20%' }}>
            <InputNumber
              id="prix"
              value={addedProduct?.price}
              onChange={(e) =>
                setAddedProduct(
                  newProduct({ ...addedProduct, price: e.value ?? 0 }),
                )
              }
              disabled={!importedProduct}
              min={0}
            />
            <label htmlFor="prix">Prix</label>
          </FloatLabel>
          <FloatLabel style={{ width: '20%' }}>
            <InputNumber
              id="disc"
              value={addedProduct?.discount}
              disabled={!importedProduct}
              max={100}
              min={0}
              onChange={(e) =>
                setAddedProduct(
                  newProduct({ ...addedProduct, discount: e.value ?? 0 }),
                )
              }
              minFractionDigits={0}
              maxFractionDigits={2}
            />
            <label htmlFor="disc">Remise</label>
          </FloatLabel>
          <FloatLabel style={{ width: '30%' }}>
            <InputNumber
              id="ttlamnt"
              value={addedProduct?.totalAmount}
              disabled
              mode="currency"
              currency="DZD"
              locale="ar-DZ"
            />
            <label htmlFor="ttlamnt">Montant</label>
          </FloatLabel>
        </div>
        {importedProduct && (
          <div
            className="flex gap-3 mx-auto justify-center"
            style={{ width: '365px' }}
          >
            <Button
              icon="pi pi-plus"
              rounded
              aria-label="Filter"
              onClick={addProducttoTable}
            />
            <Button
              icon="pi pi-times"
              rounded
              severity="danger"
              aria-label="Cancel"
              outlined
              onClick={() => setImportedProduct(null)}
            />
          </div>
        )}
      </div>

      <div className="w-full">
        <ContextMenu
          model={menuModel}
          ref={cm}
          onHide={() => setSelectedProduct(null)}
        />
        <DataTable
          value={products}
          className="border rounded-md"
          editMode="row"
          dataKey="id"
          onRowEditComplete={onRowEditComplete}
          tableStyle={{ minWidth: '100%' }}
          emptyMessage="Aucun produit ajouté"
          onContextMenu={(e) => cm.current.show(e.originalEvent)}
          contextMenuSelection={selectedProduct}
          onContextMenuSelectionChange={(e) => setSelectedProduct(e.value)}
        >
          <Column
            className=""
            field="id"
            header="N°"
            body={rowIndexTemplate}
            // editor={(options) => textEditor(options)}
            style={{ width: '4rem' }}
          />
          <Column
            className=""
            field="name"
            header="Désignation"
            // editor={(options) => textEditor(options)}
            style={{ width: '40%' }}
          />
          <Column
            className=""
            field="qte"
            header="QTE"
            // body={priceBodyTemplate}
            editor={(options) => numberEditor(options)}
            style={{ width: '20%' }}
          />
          <Column
            className=""
            field="colis"
            header="Colis"
            // body={priceBodyTemplate}
            editor={(options) => numberEditor(options)}
            style={{ width: '5%' }}
          />
          <Column
            className=""
            field="totalQuantity"
            header="QTE Total"
            // body={priceBodyTemplate}
            // editor={(options) => numberEditor(options)}
            style={{ width: '20%' }}
          />
          <Column
            className=""
            field="price"
            header="Prix Unit"
            body={priceBodyTemplate}
            editor={(options) => numberEditor(options)}
            style={{ width: '20%' }}
          />
          <Column
            className=""
            field="discount"
            header="Remise"
            body={discountBodyTemplate}
            editor={(options) => discountEditor(options)}
            style={{ width: '20%' }}
          />
          <Column
            className=""
            field="amount"
            header="Montant"
            body={amountBodyTemplate}
            // editor={(options) => numberEditor(options)}
            style={{ width: '20%' }}
          />
          <Column
            className=""
            rowEditor={allowEdit}
            headerStyle={{ width: '5%', minWidth: '6.5rem' }}
            bodyStyle={{ textAlign: 'center' }}
          />
        </DataTable>
      </div>

      <div className="w-full mt-4 flex flex-col items-end">
        <div className="flex">
          <div
            className="bg-white justify-between m-2 rounded p-4 flex gap-3"
            style={{ width: '400px' }}
          >
            <span className="font-bold text-lg">Montant HT :</span>
            <span className="font-bold text-lg text-blue-700">
              {formatCurrency(totals.montantHT)}
            </span>
          </div>
          <div
            className="bg-white justify-between m-2 rounded p-4 flex gap-3"
            style={{ width: '400px' }}
          >
            <span className="font-bold text-lg">Remise :</span>
            <span className="font-bold text-lg text-blue-700">
              {totals.remise}%
            </span>
          </div>
        </div>
        <div className="flex">
          <div
            className="bg-white justify-between m-2 rounded p-4 flex gap-3"
            style={{ width: '400px' }}
          >
            <span className="font-bold text-lg">TVA 19% :</span>
            <span className="font-bold text-lg text-blue-700">
              {formatCurrency(totals.montantTVA)}
            </span>
          </div>
          <div
            className="bg-white justify-between m-2 rounded p-4 flex gap-3"
            style={{ width: '400px' }}
          >
            <span className="font-bold text-lg">Timbre :</span>
            <span className="font-bold text-lg text-blue-700">
              {formatCurrency(totals.timbre)}
            </span>
          </div>
        </div>
        <div
          className="bg-white justify-between m-2 rounded p-4 flex gap-3"
          style={{ width: '400px' }}
        >
          <span className="font-bold text-lg">Montant TTC :</span>
          <span className="font-bold text-lg text-blue-700">
            {formatCurrency(totals.montantTTC)}
          </span>
        </div>
      </div>
    </div>
  );
}

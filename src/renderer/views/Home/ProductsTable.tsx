import React, { useEffect, useState } from 'react';
import { DataTable, DataTableRowEditCompleteEvent } from 'primereact/datatable';
import { Column, ColumnEditorOptions } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import {
  InputNumber,
  InputNumberValueChangeEvent,
} from 'primereact/inputnumber';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import { newProduct, ProductType } from './index';
import formatCurrency from 'renderer/utils/formatCurrency';
import { ro } from 'date-fns/locale';

export default function ProductsTable({ products, setProducts }) {
  useEffect(() => {
    // ProductService.getProductsMini().then((data) => setProducts(data));
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
        minFractionDigits={2}
        maxFractionDigits={3}
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

  return (
    <div className="card p-fluid">
      <DataTable
        value={products}
        editMode="row"
        dataKey="id"
        onRowEditComplete={onRowEditComplete}
        tableStyle={{ minWidth: '50rem' }}
      >
        <Column
          field="id"
          header="N°"
          // editor={(options) => textEditor(options)}
          style={{ width: '4rem' }}
        />
        <Column
          field="name"
          header="Désignation"
          editor={(options) => textEditor(options)}
          style={{ width: '40%' }}
        />
        <Column
          field="quantity"
          header="QTE"
          // body={priceBodyTemplate}
          editor={(options) => numberEditor(options)}
          style={{ width: '20%' }}
        />
        <Column
          field="colis"
          header="Colis"
          // body={priceBodyTemplate}
          editor={(options) => numberEditor(options)}
          style={{ width: '5%' }}
        />
        <Column
          field="totalQuantity"
          header="QTE Total"
          // body={priceBodyTemplate}
          // editor={(options) => numberEditor(options)}
          style={{ width: '20%' }}
        />
        <Column
          field="price"
          header="Prix Unit"
          body={priceBodyTemplate}
          editor={(options) => numberEditor(options)}
          style={{ width: '20%' }}
        />
        <Column
          field="discount"
          header="Remise"
          body={discountBodyTemplate}
          editor={(options) => discountEditor(options)}
          style={{ width: '20%' }}
        />
        <Column
          field="amount"
          header="Montant"
          body={amountBodyTemplate}
          // editor={(options) => numberEditor(options)}
          style={{ width: '20%' }}
        />
        <Column
          rowEditor={allowEdit}
          headerStyle={{ width: '5%', minWidth: '8rem' }}
          bodyStyle={{ textAlign: 'center' }}
        />
      </DataTable>
      {products.map((product) => (
        <div key={product.id}>
          <span>{product.name}</span>
          <span>{product.price}</span>
          <span>{product.totalQuantity}</span>
          <span>{product.totalAmount}</span>
        </div>
      ))}
    </div>
  );
}

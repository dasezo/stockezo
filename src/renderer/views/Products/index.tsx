import { set } from 'date-fns';
import { Link } from 'react-router-dom';
import Layout from 'renderer/components/Layout';
import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import formatCurrency from 'renderer/utils/formatCurrency';
import Product from 'types/Product';

export default function Products() {
  let emptyProduct = {
    id: null,
    name: '',
    image: null,
    description: '',
    price: 0,
    quantity: 0,
    rating: 0,
    inventoryStatus: 'INSTOCK',
  };

  const [products, setProducts] = useState(null);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  async function getAllProducts() {
    window.electron
      .getAllProducts()
      .then((res) => setProducts(res))
      .catch((err) => console.log(err));
  }
  async function insertProduct(product: Product) {
    window.electron
      .insertProduct(product)
      .then(() => getAllProducts())
      .catch((err) => console.log(err));
  }
  async function updateProduct(product: Product) {
    window.electron
      .updateProduct(product)
      .then(() => getAllProducts())
      .catch((err) => console.log(err));
  }
  async function deleteProduct(id: number) {
    window.electron
      .deleteProduct(id)
      .then(() => {
        getAllProducts();
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current.show({
          severity: 'success',
          summary: 'Réussie',
          detail: 'Produit supprimé avec succès',
          life: 3000,
        });
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const saveProduct = async () => {
    setSubmitted(true);

    if (product.name.trim()) {
      let _product = { ...product };

      if (product.id) {
        await updateProduct(_product);
        toast.current.show({
          severity: 'success',
          summary: 'Réussie',
          detail: 'Produit modifié avec succès',
          life: 3000,
        });
      } else {
        if (!_product.name || !_product.price) {
          toast.current.show({
            severity: 'error',
            summary: 'Erreur',
            detail: 'Veuillez remplir les champs obligatoires',
            life: 3000,
          });
          return;
        }

        await insertProduct(_product);
        toast.current.show({
          severity: 'success',
          summary: 'Réussie',
          detail: 'Produit ajouté avec succès',
          life: 3000,
        });
      }

      setProductDialog(false);
      setProduct(emptyProduct);
    }
  };

  const editProduct = (product) => {
    setProduct({ ...product });
    setProductDialog(true);
  };

  const confirmDeleteProduct = (product: Product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const findIndexById = (id) => {
    let index = -1;

    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  // const confirmDeleteSelected = () => {
  //   setDeleteProductsDialog(true);
  // };

  const deleteSelectedProducts = () => {
    let _products = products.filter((val) => !selectedProducts.includes(val));

    setProducts(_products);
    setDeleteProductsDialog(false);
    setSelectedProducts(null);
    toast.current.show({
      severity: 'success',
      summary: 'Successful',
      detail: 'Products Deleted',
      life: 3000,
    });
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _product = { ...product };

    _product[`${name}`] = val;

    setProduct(_product);
  };

  const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _product = { ...product };

    _product[`${name}`] = val;

    setProduct(_product);
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="Ajouter"
          icon="pi pi-plus"
          severity="success"
          onClick={openNew}
        />
        {/* <Button
          label="Supprimer"
          icon="pi pi-trash"
          severity="danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedProducts || !selectedProducts.length}
        /> */}
      </div>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <Button
        label="Export"
        icon="pi pi-upload"
        className="p-button-help"
        onClick={exportCSV}
      />
    );
  };

  // const imageBodyTemplate = (rowData) => {
  //   return (
  //     <img
  //       src={`https://primefaces.org/cdn/primereact/images/product/${rowData.image}`}
  //       alt={rowData.image}
  //       className="shadow-2 border-round"
  //       style={{ width: '64px' }}
  //     />
  //   );
  // };

  const priceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.price);
  };

  const statusBodyTemplate = (rowData) => {
    return <Tag value={getStatus(rowData)} severity={getSeverity(rowData)} />;
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          onClick={() => editProduct(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </>
    );
  };

  const getSeverity = (product: Product) => {
    if (product.quantity == 0) return 'danger';

    if (product.quantity < 10) return 'warning';

    if (product.quantity > 10) return 'success';
  };
  const getStatus = (product: Product) => {
    if (product.quantity === 0) return 'pas de stock';

    if (product.quantity <= 10) return 'stock faible';

    return 'en stock';
  };

  const header = (
    <div className="flex flex-wrap gap-2 items-center justify-between ">
      <div className="flex gap-4 items-center">
        <h4 className="m-0 text-lg">Gestion de Produits</h4>
        <span className="text-blue-700 text-sm">
          ({products ? products.length : 0} Produits)
        </span>
      </div>
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Recherche..."
        />
      </IconField>
    </div>
  );
  const productDialogFooter = (
    <>
      <Button
        label="Annuler"
        icon="pi pi-times"
        outlined
        onClick={hideDialog}
      />
      <Button label="Sauvgarder" icon="pi pi-check" onClick={saveProduct} />
    </>
  );
  const deleteProductDialogFooter = (
    <>
      <Button
        label="Non"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteProductDialog}
      />
      <Button
        label="Oui"
        icon="pi pi-check"
        severity="danger"
        onClick={() => deleteProduct(product.id)}
      />
    </>
  );
  const deleteProductsDialogFooter = (
    <>
      <Button
        label="Non"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteProductsDialog}
      />
      <Button
        label="Oui"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteSelectedProducts}
      />
    </>
  );

  return (
    <Layout activeView="products">
      <div>
        <Toast ref={toast} />
        <div className="card">
          <Toolbar
            className="mb-4"
            left={leftToolbarTemplate}
            right={rightToolbarTemplate}
          />
          <DataTable
            ref={dt}
            value={products}
            // selection={selectedProducts}
            // onSelectionChange={(e) => setSelectedProducts(e.value)}
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
            globalFilter={globalFilter}
            header={header}
          >
            {/* <Column selectionMode="multiple" exportable={false} /> */}
            <Column
              field="id"
              header="#"
              sortable
              style={{ minWidth: '4rem' }}
            />
            <Column
              field="name"
              header="Titre"
              sortable
              style={{ minWidth: '16rem' }}
            />

            {/* <Column
              field="image"
              header="Image"
              body={imageBodyTemplate}
            /> */}
            <Column
              field="price"
              header="Prix"
              body={priceBodyTemplate}
              sortable
              style={{ minWidth: '8rem' }}
            />
            <Column
              field="quantity"
              header="Quantité"
              // body={ratingBodyTemplate}
              sortable
              style={{ minWidth: '12rem' }}
            />
            <Column
              field="inventoryStatus"
              header="Status"
              body={statusBodyTemplate}
              sortable
              style={{ minWidth: '12rem' }}
            />
            <Column
              body={actionBodyTemplate}
              exportable={false}
              style={{ minWidth: '12rem' }}
            />
          </DataTable>
        </div>
        <Dialog
          visible={productDialog}
          style={{ width: '32rem' }}
          breakpoints={{ '960px': '75vw', '641px': '90vw' }}
          header="Détails du Produit"
          modal
          className="p-fluid"
          footer={productDialogFooter}
          onHide={hideDialog}
        >
          {product.image && (
            <img
              src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`}
              alt={product.image}
              className="product-image block m-auto pb-3"
            />
          )}
          <div className="field">
            <label htmlFor="name" className="font-bold">
              Titre
            </label>
            <InputText
              id="name"
              value={product.name}
              onChange={(e) => onInputChange(e, 'name')}
              required
              autoFocus
              className={classNames({
                'p-invalid': submitted && !product.name,
              })}
            />
            {submitted && !product.name && (
              <small className="p-error">Titre obligatoire.</small>
            )}
          </div>
          <div className="field">
            <label htmlFor="description" className="font-bold">
              Description
            </label>
            <InputTextarea
              id="description"
              value={product.description}
              onChange={(e) => onInputChange(e, 'description')}
              required
              rows={3}
              cols={20}
            />
          </div>

          <div className="formgrid grid">
            <div className="field col">
              <label htmlFor="price" className="font-bold">
                Prix (د.ج)
              </label>
              <InputNumber
                id="price"
                value={product.price}
                onValueChange={(e) => onInputNumberChange(e, 'price')}
                mode="decimal"
                // currency="DZD"
                // locale="ar-DZ"
              />
              {submitted && !product.price && (
                <small className="p-error">Prix obligatoire.</small>
              )}
            </div>
            <div className="field col">
              <label htmlFor="quantity" className="font-bold">
                Quantité
              </label>
              <InputNumber
                id="quantity"
                value={product.quantity}
                onValueChange={(e) => onInputNumberChange(e, 'quantity')}
              />
            </div>
          </div>
        </Dialog>
        <Dialog
          visible={deleteProductDialog}
          style={{ width: '32rem' }}
          breakpoints={{ '960px': '75vw', '641px': '90vw' }}
          header="Confirm"
          modal
          footer={deleteProductDialogFooter}
          onHide={hideDeleteProductDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle mr-3"
              style={{ fontSize: '2rem' }}
            />
            {product && (
              <span>
                Etes-vous sûr que vous voulez supprimer <b>{product.name}</b>?
              </span>
            )}
          </div>
        </Dialog>
        <Dialog
          visible={deleteProductsDialog}
          style={{ width: '32rem' }}
          breakpoints={{ '960px': '75vw', '641px': '90vw' }}
          header="Confirm"
          modal
          footer={deleteProductsDialogFooter}
          onHide={hideDeleteProductsDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle mr-3"
              style={{ fontSize: '2rem' }}
            />
            {product && (
              <span>
                Êtes-vous sûr de vouloir supprimer les produits sélectionnés?
              </span>
            )}
          </div>
        </Dialog>
      </div>
    </Layout>
  );
}

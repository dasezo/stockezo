// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { insertProduct } from './services/Product.service';
import Product from 'types/Product';

export type Channels = 'ipc-example';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
  insertProduct: (product: Product) =>
    ipcRenderer.invoke('product:insert', product),
  deleteProduct: (id: number) => ipcRenderer.invoke('product:delete', id),
  getAllProducts: () => ipcRenderer.invoke('products:getAll'),
  getOneProduct: (id: number) => ipcRenderer.invoke('product:getOne', id),
  updateProduct: (product: Product) =>
    ipcRenderer.invoke('product:update', product),
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;

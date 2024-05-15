import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { fetchCurrentCryptoPrice, getCryptos } from './services/CryptoServices';
import { CryptoCurrency, CryptoPrice, Pair } from './types';

interface CryptoStore {
  cryptoCurrencies: CryptoCurrency[];
  result: CryptoPrice;
  loading: boolean;
  fetchCryptos: () => Promise<void>;
  fetchData: (pair: Pair) => Promise<void>;
}

export const useCryptoStore = create<CryptoStore>()(
  devtools(set => ({
    cryptoCurrencies: [],
    // result: {} as CryptoPrice,
    result: {
      IMAGEURL: '',
      PRICE: '',
      HIGHDAY: '',
      LOWDAY: '',
      CHANGEPCT24HOUR: '',
      LASTUPDATE: ''
    },
    loading: false,
    fetchCryptos: async () => {
      const cryptoCurrencies = await getCryptos();
      set(() => ({ cryptoCurrencies }));
    },
    fetchData: async pair => {
      set(() => ({
        loading: true
      }));
      const result = await fetchCurrentCryptoPrice(pair);
      set(() => {
        return { result,loading: false };
      });
    }
  }))
);

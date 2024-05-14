import { useState } from 'react';
import { currencies } from '../data';
import { useCryptoStore } from '../store';
import { Pair } from '../types';
import ErrorMessage from './ErrorMessage';

const CriptoSearchForm = () => {
  const { cryptoCurrencies, fetchData } = useCryptoStore();

  const [pair, setPair] = useState<Pair>({
    currency: '',
    criptoCurrency: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPair({ ...pair, [name]: value });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(pair).includes('')) {
      setError('Todos los campos son obligatorios');
      return;
    }
    setError('');
    fetchData(pair);
  };

  return (
    <form className='form' onSubmit={onSubmit}>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <div className='field'>
        <label htmlFor='currency' >
          Moneda:
        </label>
        <select
          name='currency'
          id='currency'
          onChange={handleChange}
          value={pair.currency}
        >
          <option value=''>--Seleccione--</option>
          {currencies.map(currency => (
            <option key={currency.code} value={currency.code}>
              {currency.name}
            </option>
          ))}
        </select>
      </div>
      <div className='field'>
        <label htmlFor='criptoCurrency' >
          Criptomoneda:
        </label>
        <select
          name='criptoCurrency'
          id='criptoCurrency'
          onChange={handleChange}
          value={pair.criptoCurrency}
        >
          <option value=''>--Seleccione--</option>
          {cryptoCurrencies.map(crypto => (
            <option value={crypto.CoinInfo.Name} key={crypto.CoinInfo.Name}>
              {crypto.CoinInfo.FullName}
            </option>
          ))}
        </select>
      </div>
      <input type='submit' value='Cotizar' />
    </form>
  );
};

export default CriptoSearchForm;

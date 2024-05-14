import { currencies } from '../data';

const CriptoSearchForm = () => {
  return (
    <form className='form'>
      <div>
        <label htmlFor='currency' className='field'>
          Moneda:
        </label>
        <select name='currency' id='currency'>
          <option value=''>--Seleccione--</option>
          {currencies.map(currency => (
            <option key={currency.code} value={currency.code}>
              {currency.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor='criptoCurrency' className='field'>
          Criptomoneda:
        </label>
        <select name='criptoCurrency' id='criptoCurrency'>
          <option value=''>--Seleccione--</option>
        </select>
      </div>
      <input type='submit' value='Cotizar' />
    </form>
  );
};

export default CriptoSearchForm;

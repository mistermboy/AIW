import React, { useState, useEffect } from 'react';
import getBlockchain from './wallet.js';

function App() {
  const [myContract, setMyContract] = useState(undefined);
  const [data, setData] = useState(undefined);

  useEffect(() => {
    const init = async () => {
      const { myContract } = await getBlockchain();
      const data = await myContract.getPerrosAdoptados();
      setMyContract(myContract);
      setData(data);
    };
    init();
  }, []);



  const updateData = async e => {
    e.preventDefault();
    const perroIndex = parseInt(e.target.elements[0].value);

    const tx = await myContract.adoptar(perroIndex);
    await tx.wait();

    const nuevosDatos = await myContract.getPerrosAdoptados();
    setData(nuevosDatos);
  };

  if(
      typeof myContract === 'undefined'
      || typeof data === 'undefined'
  ) {
    return 'Loading...';
  }


  // Valor auxiliar para el dibujo
  var contador = 0;
  function inCrementerContador(){
    contador++;
  }

  return (
      <div className='container'>
        <div className='row'>
          <div className='col'>

            <ul>
              { data.map(addressAdopcion =>
                  <div className='m-10'>
                    { addressAdopcion == "0x0000000000000000000000000000000000000000" ? (
                        <form className="form-inline" onSubmit={e => updateData(e)}>
                          <input type="number" value={contador} />
                          <button type="submit" > Adoptar </button>
                        </form>
                    ) : (
                        <p>{contador} ya adoptado por {addressAdopcion} </p>
                    ) }
                    { inCrementerContador() }
                  </div>
              )}
            </ul>

          </div>
        </div>
      </div>
  );
}

export default App;

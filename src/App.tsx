import React, {useState} from 'react';
import './App.css';
import useCep from './hooks/useCep';

function App() {
  const [searchCep, setSearchCep] = useState('')
  const cep = useCep(searchCep)

  const handleCepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCep(event.target.value);
  };
  return (
    <div className="App">
      <div> 
        <input type="text" value={searchCep} onChange={handleCepChange} placeholder="Pesquisar cep" />
      </div>
           <div>

           {cep.cep ? (
        <>
          <p>{cep.cep}</p>
          <p>{cep.bairro}</p>
          <p>{cep.localidade}</p>
          <p>{cep.uf}</p>
        </>
      ) : (
        <p>Cep inválido</p>
      )}

  
    </div>
    </div>
  );
}

export default App;

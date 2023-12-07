import React, { useEffect, useState } from 'react';
import { TextField, Button, Switch, FormControlLabel, Typography, Container, Box } from '@mui/material';
import api from './config/services/api';

interface CepProperties {
    cep: string,
    logradouro: string,
    bairro: string,
    localidade: string,
    uf: string
}

function App() {
  const [searchCep, setSearchCep] = useState('');
  const [cep, setCepData] = useState<CepProperties>({
    cep: '',
    logradouro: '',
    bairro: '',
    localidade: '',
    uf: ''
  });
  const [address, setAddress] = useState<CepProperties>({
    cep: '',
    logradouro: '',
    bairro: '',
    localidade: '',
    uf: ''
  });
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [street, setStreet] = useState('');
  const [isSearchingCep, setIsSearchingCep] = useState(false);


  useEffect(() => {
    setAddress({
      cep: '',
      logradouro: '',
      bairro: '',
      localidade: '',
      uf: ''
    })
    setCepData({
      cep: '',
      logradouro: '',
      bairro: '',
      localidade: '',
      uf: ''
    })
  },[isSearchingCep])
  const searchByCep = () => {
    const apiData = async () => {
      try {
        const response = await api.get(`/${searchCep}/json/`);
        setCepData(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    apiData();
  };

  const searchByAddress = () => {
    if (!state || !city || !street) {
      console.error('Preencha todos os campos obrigatórios.');
      return;
    }
  
    const formattedState = state.trim().toUpperCase();
    const formattedCity = city.trim();
    const formattedStreet = street.trim().replace('Rua', '').replace('Avenida', '');
  
    const apiData = async () => {
      try {
        const response = await api.get(`/${formattedState}/${formattedCity}/${formattedStreet}/json/`);
        setAddress(response.data[0]);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    apiData();
  };
  

  const handleCepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCep(event.target.value);
  };
  const handleStreetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStreet(event.target.value);
  };
  const handleStateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newState = event.target.value.slice(0, 2).toUpperCase();
    setState(newState);
  };
  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleSearchTypeChange = () => {
    setIsSearchingCep((prev) => !prev);
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5} p={3} boxShadow={3} borderRadius={4}>
        <Typography variant="h4" align="center" gutterBottom>
          Pesquisa de CEP
        </Typography>

        <FormControlLabel
          control={<Switch checked={isSearchingCep} onChange={handleSearchTypeChange} />}
          label="Pesquisar por CEP"
        />

        {isSearchingCep ? (
          <>
            <TextField
              fullWidth
              label="Digite o CEP"
              variant="outlined"
              value={searchCep}
              onChange={handleCepChange}
              margin="normal"
            />
            <Button variant="contained" color="primary" onClick={searchByCep} fullWidth>
              Pesquisar
            </Button>
          </>
        ) : (
          <>
            <TextField
              fullWidth
              label="Estado (UF)"
              variant="outlined"
              value={state}
              onChange={handleStateChange}
              margin="normal"
              inputProps={{ maxLength: 2 }}
              placeholder="Ex: RJ"
            />
            <TextField
              fullWidth
              label="Cidade"
              variant="outlined"
              value={city}
              onChange={handleCityChange}
              margin="normal"
              placeholder="Ex: Novo Hamburgo"
            />
            <TextField
              fullWidth
              label="Rua"
              variant="outlined"
              value={street}
              onChange={handleStreetChange}
              margin="normal"
              placeholder="Ex: Rua Da Conquista"
            />
            <Button variant="contained" color="primary" onClick={() => searchByAddress()} fullWidth>
              Pesquisar
            </Button>
          </>
        )}

        <div style={{ marginTop: '20px' }}>
          {isSearchingCep && cep.cep ? (
            <>
              <Typography variant="body1">CEP: {cep.cep}</Typography>
              <Typography variant="body1">Bairro: {cep.bairro}</Typography>
              <Typography variant="body1">Cidade: {cep.localidade}</Typography>
              <Typography variant="body1">Estado: {cep.uf}</Typography>
            </>
          ) : (
            !isSearchingCep && address.cep ? (
              <>
                <Typography variant="body1">CEP: {address.cep}</Typography>
                <Typography variant="body1">Bairro: {address.bairro}</Typography>
                <Typography variant="body1">Cidade: {address.localidade}</Typography>
                <Typography variant="body1">Estado: {address.uf}</Typography>
              </>
            ) : (
              <Typography variant="body1">Cep inválido</Typography>
            )
          )}
        </div>
      </Box>
    </Container>
  );
}

export default App;

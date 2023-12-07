import { useEffect, useState } from "react";
import api from "../config/services/api";

interface CepProperties {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

const useCep = (cepNumber: string) => {
  const [cepData, setCepData] = useState<CepProperties>({
    cep: '',
    logradouro: '',
    bairro: '',
    localidade: '',
    uf: ''
  });

  useEffect(() => {
    const apiData = async () => {
      try {
        const response = await api.get(`/${cepNumber}/json/`);

        if (response.data && response.data.cep) {
          setCepData(response.data);
        } 
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (cepNumber.length === 8) {
      apiData();
    }
  }, [cepNumber]);

  return cepData;
};

export default useCep;

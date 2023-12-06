import { useEffect, useState } from "react";
import api from "../config/services/api";

interface CepPropeties {
    cep: string,
    logradouro: string,
    bairro: string,
    localidade: string,
    uf: string
}

const useCep = (cepNumber: string) => {
  const [cepData, setCepData] = useState<CepPropeties>({
    cep: '',
    logradouro: '',
    bairro: '',
    localidade: '',
    uf: ''
  });

    useEffect(() => {
        const apiData = async () => {
            try{
                const response = await api.get(`/${cepNumber}/json/`)
                setCepData(response.data)
            } catch(error){
                console.error('Error:', error);
            }
        }
    apiData();

    }, [cepNumber])
    return cepData;
}

export default useCep
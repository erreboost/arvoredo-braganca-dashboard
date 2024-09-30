import { useState, useEffect, useContext, useRef } from 'react';
import { DataContext } from '../config/DataContext';
import { useTreeContext } from '../utils/TreeProvider';
import { toast } from 'react-toastify';

function CaracteristicasGerais() {
  const [selectedFilters, setSelectedFilters] = useState({
    nomeComum: '',
    especie: '',
    estado: '',
    localizacao: '',
  });

  const data = useContext(DataContext);
  const { trees, setVisibleExtent, setVisibleTrees, visibleTrees, setTrees } = useTreeContext();

  const [uniqueNomeComum, setUniqueNomeComum] = useState([]);
  const [uniqueEspecie, setUniqueEspecie] = useState([]);
  const [uniqueEstado, setUniqueEstado] = useState([]);
  const [uniqueLocalizacao, setUniqueLocalizacao] = useState([]);
  const [loadingOptions, setLoadingOptions] = useState(true);

  const initialTreeDataRef = useRef([]);

  useEffect(() => {
    if (trees.length > 0 && initialTreeDataRef.current.length === 0) {
      initialTreeDataRef.current = [...trees];
    }

    setLoadingOptions(true);
    const uniqueNomeComum = [...new Set(trees.map((tree) => tree.Nomecomum))];
    const uniqueEspecie = [...new Set(trees.map((tree) => tree.Especie))];
    const uniqueEstado = [...new Set(trees.map((tree) => tree.Estado_fit))];
    const uniqueLocalizacao = [...new Set(trees.map((tree) => tree.Localizacao))];

    setUniqueNomeComum(uniqueNomeComum);
    setUniqueEspecie(uniqueEspecie);
    setUniqueEstado(uniqueEstado);
    setUniqueLocalizacao(uniqueLocalizacao);

    setLoadingOptions(false);
  }, [trees]);

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const handleApplyFilters = async () => {
    const filtered = visibleTrees?.filter((tree) => {
      return (
        (selectedFilters.nomeComum === '' || tree.Nomecomum === selectedFilters.nomeComum) &&
        (selectedFilters.especie === '' || tree.Especie === selectedFilters.especie) &&
        (selectedFilters.estado === '' || tree.Estado_fit === selectedFilters.estado) &&
        (selectedFilters.localizacao === '' || tree.Localizacao === selectedFilters.localizacao)
      );
    });

    if (filtered.length === 0) {
      toast.error('Essa pesquisa não existe. Por favor, clique em Reset');
    } else {
      setTrees(filtered);
      setVisibleTrees(filtered);
    }
  };

  const handleResetFilters = () => {
    setSelectedFilters({
      nomeComum: '',
      especie: '',
      estado: '',
      localizacao: '',
    });

    if (initialTreeDataRef.current.length > 0) {
      setTrees(initialTreeDataRef.current);
      setVisibleTrees(initialTreeDataRef.current);
    }
  };

  function generateOptions(values) {
    const sortedValues = values.sort((a, b) => a.localeCompare(b));
    const uniqueValues = [...new Set(sortedValues)];
    return uniqueValues.map((value, index) => (
      <option key={index} value={value}>
        {value}
      </option>
    ));
  }


  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className="text-lg font-semibold mb-2">Selecione o Filtro Pretendido</h2>

      <div className='flex flex-col'>
        
      <div className='flex gap-[5px]'>
      <div className="mb-0 w-1/2">
        <h3 className="text-lg font-semibold">Nome comum:</h3>
        {loadingOptions? (<span className='dots-loader'>Carregando...</span>) : (<select
          value={selectedFilters.nomeComum}
          onChange={(e) => handleFilterChange('nomeComum', e.target.value)}
          className="mb-2 w-full max-w-xs rounded"
          disabled={loadingOptions} 
        >
         <option value="">- Tudo -</option>
              {generateOptions(uniqueNomeComum)}
        </select>)}        
      </div>      
        <div className="mb-0 w-1/2">          
          <h3 className="text-lg font-semibold">Espécie:</h3>
          {loadingOptions? (<span className='dots-loader'>Carregando...</span>) : (<select
            value={selectedFilters.especie}
            onChange={(e) => handleFilterChange('especie', e.target.value)}
            className="mb-2 w-full max-w-xs rounded"
            disabled={loadingOptions}
          >          
            <>
              <option value="">- Tudo -</option>
              {generateOptions(uniqueEspecie)}
            </>          
          </select>)}            
        </div>     
      </div> 
      <div className='flex gap-[5px]'>
      <div className="mb-0 w-1/2">
          <h3 className="text-lg font-semibold">Estado:</h3>
          {loadingOptions? (<span className='dots-loader'>Carregando...</span>) : (<select
            value={selectedFilters.estado}
            onChange={(e) => handleFilterChange('estado', e.target.value)}
            className="mb-2 w-full max-w-xs rounded"
            disabled={loadingOptions}
          >       
              <>
                <option value="">- Tudo -</option>
                {generateOptions(uniqueEstado)}
              </>
          </select>)}      
        </div>      
        <div className="mb-0 w-1/2">
          <h3 className="text-lg font-semibold">Localização:</h3>
          {loadingOptions? (<span className='dots-loader'>Carregando...</span>) : (<select
            value={selectedFilters.localizacao}
            onChange={(e) => handleFilterChange('localizacao', e.target.value)}
            className="mb-4 w-full max-w-xs rounded"
            disabled={loadingOptions}
          >            
              <>
                <option value="">- Tudo -</option>
                {generateOptions(uniqueLocalizacao)}
              </> 
          </select>)}          
        </div>      
      </div>  
        
        <div className="flex justify-center items-center">
          <button
            onClick={() => handleApplyFilters()}
            className="border bg-blue-500 text-white px-4 py-2 mr-2 rounded-lg hover:brightness-50 font-semibold"
            disabled={loadingOptions} 
          >
            Aplicar
          </button>
          <button
            onClick={() => handleResetFilters()}
            className="border bg-white px-4 py-2 rounded-lg hover:brightness-50 font-semibold"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default CaracteristicasGerais;

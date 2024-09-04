import {useState, useEffect, useContext, useRef, useMemo} from 'react';
import FilteredResults from './FilteredResults';
import {DataContext} from '../config/DataContext';
import { useTreeContext } from '../utils/TreeProvider';
import {API_ENDPOINT, API_BASE_URL} from '../config/config';
import { toast } from 'react-toastify';
import { useFilters } from '../context/filters';

function CaracteristicasGerais() {
  const [selectedFilters, setSelectedFilters] = useState({
    nomeComum: '',
    especie: '',
    estado: '',
    localizacao: '',
  });

  const data = useContext(DataContext);
  const {trees, setVisibleExtent, setVisibleTrees, visibleTrees, setTrees, treesCached} = useTreeContext();

  const [uniqueNomeComum, setUniqueNomeComum] = useState([]);
  const [uniqueEspecie, setUniqueEspecie] = useState([]);
  const [uniqueEstado, setUniqueEstado] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [uniqueLocalizacao, setUniqueLocalizacao] = useState([]);

  const initialTreeDataRef = useRef([]);

  // const fetchTreeData = async () => {
  //   try {
  //     const response = await fetch(API_ENDPOINT);
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch tree data');
  //     }
  //     const data = await response.json();
  //     const treesWithFullImageURLs = data.trees.map((tree) => ({
  //       ...tree,
  //       Fotos: tree.Fotos.map((photo) => `${API_BASE_URL}/${photo}`),
  //     }));
  //     setVisibleTrees(treesWithFullImageURLs);
  //     initialTreeDataRef.current = treesWithFullImageURLs;
  //   } catch (error) {
  //     console.error('Error fetching tree data:', error);
  //   }
  // };

  useEffect(() => {
    // const fetchInitialData = async () => {
    //   try {
    //     const response = await fetch(API_ENDPOINT);
    //     if (!response.ok) {
    //       throw new Error('Failed to fetch tree data');
    //     }
    //     const data = await response.json();
    //     const treesWithFullImageURLs = data.trees.map((tree) => ({
    //       ...tree,
    //       Fotos: tree.Fotos.map((photo) => `${API_BASE_URL}/${photo}`),
    //     }));
        
    //     setVisibleTrees(treesWithFullImageURLs);
    //     setTrees(treesWithFullImageURLs);
    //     setFilteredData(treesWithFullImageURLs);
    //     initialTreeDataRef.current = treesWithFullImageURLs;

    //     const uniqueNomeComum = [
    //       ...new Set(treesWithFullImageURLs.map((tree) => tree.Nomecomum)),
    //     ];
    //     const uniqueEspecie = [...new Set(treesWithFullImageURLs.map((tree) => tree.Especie))];
    //     const uniqueEstado = [...new Set(treesWithFullImageURLs.map((tree) => tree.Estado_fit))];
    //     const uniqueLocalizacao = [
    //       ...new Set(treesWithFullImageURLs.map((tree) => tree.Localizacao)),
    //     ];

    //     setUniqueNomeComum(uniqueNomeComum);
    //     setUniqueEspecie(uniqueEspecie);
    //     setUniqueEstado(uniqueEstado);
    //     setUniqueLocalizacao(uniqueLocalizacao);
    //   } catch (error) {
    //     console.error('Error fetching tree data:', error);
    //   }
    // };

    if(treesCached){
      setVisibleTrees(treesCached);
      setTrees(treesCached);
      setFilteredData(treesCached);
      initialTreeDataRef.current = treesCached;

      const uniqueNomeComum = [
        ...new Set(treesCached.map((tree) => tree.Nomecomum)),
      ];
      const uniqueEspecie = [...new Set(treesCached.map((tree) => tree.Especie))];
      const uniqueEstado = [...new Set(treesCached.map((tree) => tree.Estado_fit))];
      const uniqueLocalizacao = [
        ...new Set(treesCached.map((tree) => tree.Localizacao)),
      ];

      setUniqueNomeComum(uniqueNomeComum);
      setUniqueEspecie(uniqueEspecie);
      setUniqueEstado(uniqueEstado);
      setUniqueLocalizacao(uniqueLocalizacao);
    }

    // fetchInitialData();
  }, []);

 



  const handleFilterChange = async (filterType, value) => {
    console.log('Selected filter', selectedFilters)
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  
  };

  const handleApplyFilters = () => {
    // console.log('Cached trees', treesCached)
    const filtered = treesCached?.filter((tree) => {
      return (
        (selectedFilters.nomeComum === '' || tree.Nomecomum === selectedFilters.nomeComum) &&
        (selectedFilters.especie === '' || tree.Especie === selectedFilters.especie) &&
        (selectedFilters.estado === '' || tree.Estado_fit === selectedFilters.estado) &&
        (selectedFilters.localizacao === '' || tree.Localizacao === selectedFilters.localizacao)
      );
    });

    if(filtered.length === 0){
      toast.error('Essa pesquisa não existe. Por favor, clique em Reset')
    }
  
    setTrees(filtered);
    setVisibleTrees(filtered); 

  };
  
  const handleResetFilters = () => {
    setSelectedFilters({
      nomeComum: '',
      especie: '',
      estado: '',
      localizacao: '',
    });

    setFilteredData(initialTreeDataRef.current);
    setVisibleTrees(initialTreeDataRef.current);
    setTrees(initialTreeDataRef.current);
    // console.log('Initial', initialTreeDataRef)
  }

  function generateOptions(values) {
    // Sort the values alphabetically
    const sortedValues = values.sort((a, b) => a.localeCompare(b));

    // Remove duplicates using Set
    const uniqueValues = [...new Set(sortedValues)];

    return uniqueValues.map((value, index) => (
      <option key={index} value={value}>
        {value}
      </option>
    ));
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className="text-lg font-semibold mb-2">
        Selecione o Filtro Pretendido
      </h2>

      <div className='flex flex-col'>
        {/* List 1: Nome comum */}
        <div className="mb-0">
          <h3 className="text-lg font-semibold">Nome comum:</h3>
          <select
            value={selectedFilters.nomeComum}
            onChange={(e) => handleFilterChange('nomeComum', e.target.value)}
            className="mb-2 w-full max-w-xs rounded"
          >
            <option value="">- Tudo -</option>
            {generateOptions(uniqueNomeComum)}
          </select>
        </div>

        {/* List 2: Espécie */}
        <div className="mb-0">
          <h3 className="text-lg font-semibold">Espécie:</h3>
          <select
            value={selectedFilters.especie}
            onChange={(e) => handleFilterChange('especie', e.target.value)}
            className="mb-2 w-full max-w-xs rounded"
          >
            <option value="">- Tudo -</option>
            {generateOptions(uniqueEspecie)}
          </select>
        </div>

        {/* List 3: Estado */}
        <div className="mb-0">
          <h3 className="text-lg font-semibold">Estado:</h3>
          <select
            value={selectedFilters.estado}
            onChange={(e) => handleFilterChange('estado', e.target.value)}
            className="mb-2 w-full max-w-xs rounded"
          >
            <option value="">- Tudo -</option>
            {generateOptions(uniqueEstado)}
          </select>
        </div>

        {/* List 4: Localização */}
        <div className="mb-0">
          <h3 className="text-lg font-semibold">Localização:</h3>
          <select
            value={selectedFilters.localizacao}
            onChange={(e) => handleFilterChange('localizacao', e.target.value)}
            className="mb-4 w-full max-w-xs rounded"
          >
            <option value="">- Tudo -</option>
            {generateOptions(uniqueLocalizacao)}
          </select>
        </div>

        <div className="flex justify-center items-center mt-10">
          <button
            onClick={() => handleApplyFilters()}
            className="border bg-blue-500 text-white px-4 py-2 mr-2 rounded-lg hover:brightness-50 font-semibold"
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
      {/* Display filtered results */}
      {/* {trees.length > 0 && (
        <FilteredResults
          filteredData={trees}
          onClearResults={() => setFilteredData([])}
        />
      )} */}
    </div>
  );
}

export default CaracteristicasGerais;

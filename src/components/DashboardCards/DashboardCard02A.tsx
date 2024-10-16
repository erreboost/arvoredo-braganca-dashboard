//@ts-nocheck
import React, {useEffect, useState} from 'react';

interface Tree {
  Estado_fit: string;
}

interface DashboardCardData {
  trees: Tree[];
}

interface Props {
  data: DashboardCardData;
}

const DashboardCard02A: React.FC<Props> = ({data}) => {

  const [averageAges, setAverageAge] = useState(0)
  const [averageDap, setAverageDap] = useState(0)

  function calculateAverage(input) {
    if (input.includes('-')) {       
        const numbers = input.match(/\d+/g).map(Number);
        return (numbers[0] + numbers[1]) / 2;
    } else if (input.includes('<')) {       
        const number = parseInt(input.match(/\d+/)[0], 10);
        return number; 
    } else if (input.includes('>')) {
        const number = parseInt(input.match(/\d+/)[0], 10);
        return number; 
    } else {
        return null;
    }
  }

  function average(ages) {
    // Check if the array is empty
    if (ages.length === 0) return null;

    // Calculate the sum of all ages
    const sum = ages.reduce((total, age) => total + age, 0);

    // Calculate the average
    return sum / ages.length;
}


   const averageAgeEachTree = data.trees.map((tree) => calculateAverage(tree.idade_apro_v2))
   useEffect(() => console.log('Average', average(averageAgeEachTree) ), [averageAgeEachTree])

   const averageDapEachTree = data.trees.map((tree) => tree. DAP_v2)
   useEffect(() => console.log('DAP', average(averageDapEachTree) ), [averageDapEachTree])

    // const inputString = "40 - 50 anos";
    // const average = calculateAverage(inputString);
    // const [numWithSymptoms, setNumWithSymptoms] = useState(0);
   // const [numWithoutSymptoms, setNumWithoutSymptoms] = useState(0);

  // useEffect(() => {
  //   if (data && data.trees) {
  //     let countWithSymptoms = 0;
  //     let countWithoutSymptoms = 0;

  //     data.trees.forEach((tree) => {
  //       if (tree.Estado_fit.includes('sintomas ou sinais')) {
  //         countWithSymptoms++;
  //       } else {
  //         countWithoutSymptoms++;
  //       }
  //     });

  //     setNumWithSymptoms(countWithSymptoms);
  //     setNumWithoutSymptoms(countWithoutSymptoms);
  //   }
  // }, [data]);

  useEffect(() => {console.log('Idades', data)}, [data])
  return (
    <div className="flex-grow overflow-y-auto py-2 h-full flex items-center justify-center">
      <div className="text-center">
        <div className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-2">
          <p>Idade média das árvores</p>
        </div>
        <div className="text-4xl xl:text-7xl font-bold text-red-800 dark:text-slate-100 mb-2">
          {Math.floor(average(averageAgeEachTree))} anos
        </div>
        <div className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-2">
         <p>DAP médio das árvores </p>          
        </div>
        <div className="text-4xl xl:text-7xl font-bold text-red-800 dark:text-slate-100 mb-2">
        {Math.floor(average(averageDapEachTree))} cm
        </div>
      </div>
    </div>
  );
};

export default DashboardCard02A;

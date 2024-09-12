'use client'
import { set, useForm } from 'react-hook-form'
import { createOccurrence, uploadFile } from '../pages/api/occurrences'
import { useEffect, useState } from 'react'

function Ocorrencia2() {

  const { control, handleSubmit, setValue, getValues, watch, register, reset } = useForm()
  const [file, setFile] = useState()
  const [imagePath, setImagePath] = useState()

  const onSubmit = (data) => {    
    // sendServiceEmail(data)    
    createOccurrence(data, imagePath)
    // console.log('Data to create occurrence', data)
    // reset()
  }

  useEffect(() => console.log('Img', file))

  return (
    <div className="flex flex-col items-center justify-center p-2">
      <h3 className="text-white text-md py-1 px-4 rounded-lg mt-[20px] font-semibold">Dados de Ocorrências</h3>
      <div className='w-full'>
        <form className='flex flex-col gap-[20px]' onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className='flex flex-col'>
              <span className='text-white'>Nome</span>
              <input className='rounded-md' name={'fullName'}  {...register('fullName')}/>
            </label> 
          </div>    
          <div>
            <label className='flex flex-col'>
              <span className='text-white'>Email</span>
              <input className='rounded-md' name={'email'}  {...register('email')}/>
            </label> 
          </div> 
          {/* <div className='flex justify-between'>
            <label className='flex flex-col'>
              <span className='text-white'>Coordenada X*</span>
              <input className='rounded-md w-full' name={'coordinateX'}  {...register('coordinateX')}/>
            </label>             
            <label className='flex flex-col'>
              <span className='text-white'>Coordenada Y*</span>
              <input className='rounded-md w-full' name={'coordinateY'}  {...register('coordinateY')}/>
            </label>  
          </div> 
          <div>
            <label className='flex flex-col'>
              <span className='text-white'>Arvore ID*</span>
              <input className='rounded-md' name={'treeId'}  {...register('treeId')}/>
            </label> 
          </div>  */}
          <div>
            <label className='flex flex-col'>
              <span className='text-white inline-block bg-gray-700 p-2 mb-[10px]'>Por favor, no campo abaixo indique a morada aproximada do local da ocorrência</span>
              <span className='text-white'>Observações</span>
              <textarea className='rounded-md' name={'comments'}  {...register('comments')}/>
            </label> 
              </div> 
              <div className='flex gap-[20px] w-full flex-col justify-center items-center'>
              <label 
              for="uploadFile1"
              className="relative flex bg-gray-600 hover:bg-gray-700 text-white text-base px-5 py-3 outline-none rounded w-[200px] h-[50px] cursor-pointer mx-auto font-[sans-serif] justify-center items-center">
              <div className="flex items-center justify-center w-full h-full">
                <p className="inline-block">Enviar imagem</p>
                <div className="ml-2 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-white" viewBox="0 0 32 32">
                    <path
                      d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                      data-original="#000000" />
                    <path 
                      d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                      data-original="#000000" />
                  </svg>
                </div>
              </div>
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => {
                  let files = e.target.files;
                  if (files && files[0]) {
                    let blobUrl = URL.createObjectURL(files[0]);
                    setFile(blobUrl);
                  }
                  const formData = new FormData();
                  formData.append('file', files[0]);
                  formData.append('fileName', files[0]?.name);
                  console.log('Form Data', formData);
                  uploadFile('https://lrb-app.grupoerre.pt:3010/files/upload', formData, setImagePath);
                }}
              />
            </label>
            {imagePath && (
                  <p className="inline-block max-w-[90%] text-white">
                    {imagePath.split("/")[2]}
                  </p>
                )}
              </div>
             
          <div className='flex w-full items-center justify-center'>
            <button type={'submit'} className='bg-green-800 text-white h-[30px] w-[100px] rounded-sm font-semibold hover:brightness-50'>Enviar</button>
          </div>                 
        </form>
      </div>
    </div>
  );
}

export default Ocorrencia2;

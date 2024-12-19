import { toast } from 'react-toastify'
import axios from 'axios'

const BASE_URL = 'https://lrb-app.grupoerre.pt'

export const editOccurrence = async (occurrence: any, occurrenceId: string) => {
  const token = localStorage.getItem('token')

  const response = await fetch(
    `${BASE_URL}/api/occurrences/edit/${occurrenceId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: occurrence.name,
        email: occurrence.email,
        xCoordinate: occurrence.xCoordinate,
        yCoordinate: occurrence.yCoordinate,
        treeId: occurrence.treeId,
        comments: occurrence.comments,
        status: occurrence.status,
      }),
    }
  )

  const responseData = await response.json()
  // if(responseData){
  //   toast.success('Arvore editada com sucesso')
  // }

  console.log('Editar ocurrence', responseData)
}

export const createOccurrence = async (occurrence: any, imagePath: string) => {
  const token = localStorage.getItem('token')
  console.log('Ocurrence', occurrence)
  console.log('imagePath', imagePath)

  const response = await fetch(`${BASE_URL}/api/occurrences/create-new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: occurrence.fullName,
      email: occurrence.email,
      // xCoordinate: occurrence.coordinateX,
      // yCoordinate: occurrence.coordinateY,
      // treeId: occurrence.treeId,
      comments: occurrence.comments,
      status: occurrence.status,
      nif: occurrence.nif,
      phone: occurrence.phone,
      imgUrl: `${BASE_URL}/${imagePath}`,
    }),
  })

  const responseData = await response.json()
  if (responseData.message === 'New occurence created') {
    toast.success('Ocorrência criada com sucesso!')
  }
  console.log('Occurrence created', responseData)
}

export const uploadFile = async (
  url: string,
  formData: FormData,
  setImgSrc: (filePath: string) => void
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }

    const response = await axios.post(url, formData, config)
    console.log('File', response?.data)
    setImgSrc(response?.data?.filePaths[0])
  } catch (error) {
    console.error('Error uploading the file:', error)
  }
}

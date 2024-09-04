import { toast } from 'react-toastify';

interface OcurrenceFormData {
    fullName: string
    email: string
    comment: string
    coordinateX: string
    coordinateY: string
    treeID: string
}
 
  export const sendServiceEmail = async ({ fullName, email, comment, coordinateX, coordinateY, treeID  }: OcurrenceFormData) => {
    console.log('Sending Email Data:', { fullName, email, comment, coordinateX, coordinateY, treeID});
  
    const apiUrl = 'https://arvoredo-backoffice.vercel.app/api/send-email';
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email,
          comment,
          coordinateX,
          coordinateY,
          treeID
        }),
      });
  
      if (!response.ok) {
        console.error(`Error: ${response.status} - ${response.statusText}`);
      } else {
        const data = await response.json();
        toast.success('Email enviado com sucesso!')
        console.log('Response Data:', data);
      }
    } catch (error) {
      console.error('Network Error:', error);
    }
  };
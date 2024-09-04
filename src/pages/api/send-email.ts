import dotenv from 'dotenv';
dotenv.config();

import nodemailer from 'nodemailer';

export default async function handler(req: any, res: any) {
  console.log('Received POST request at /api/send-email');


  const info = {
    from: 'btrz.dev@gmail.com',
    to: 'btrz.dev@gmail.com',
    subject: ``,
    text: req.body.comment,
    html: `    
    <p> Full Name: ${req.body.fullName}</p> 
    <p> Email: ${req.body.email}</p> 
    <p> Message: ${req.body.comment}
    `,
  };

  console.log(Object.assign({}, info));

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: true,
    auth: {
    //   user: process.env.NEXT_PUBLIC_EMAIL_USERNAME_CONTACT_US, 
    //   pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD_CONTACT_US, 
    },
  });

  await new Promise(() => {
    transporter.sendMail(info, (err: any, info: any) => {
      if (err) {
        res.status(404).json({
          error: `Connection refused at ${err.address}`,
        });
        console.log(err);
      } else {
        res.status(250).json({
          success: `Message delivered to ${info.accepted}`,
        });
      }
    });
  });

  return res.status(200).json;
}
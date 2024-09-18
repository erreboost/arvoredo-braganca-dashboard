import React from 'react';

const Footer = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-200 text-white pb-2 text-center rounded-t-lg z-50">
      <div className="flex justify-between items-center px-8">
        <div>
          <a href="https://lrb.pt/">
            <img className="w-16 h-full" src="/assets/errelrb.png" alt="" />
          </a>
        </div>
        <div className="flex items-center gap-12">
        <img src='/assets/respira.png' className='w-[100px] h-[50px]' />
        <img src='/assets/compete.png' className='w-[170px] h-[50px]' />
        
        </div>
      </div>
    </div>
  );
};

export default Footer;

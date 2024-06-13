const Footer = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-200 text-white p-0 text-center rounded-t-lg">
      <div className="flex justify-between items-center px-8">
        <div>
          <a href="https://lrb.pt/">
            <img
              className="w-16 h-full"
              src="../../public/assets/errelrb.png"
              alt=""
            />
          </a>
        </div>
        <div className="flex items-center gap-12">
          <img
            className="w-16 h-full mr-4"
            src="../../public/assets/respira.png"
            alt=""
          />
          <img
            className="w-24 h-full"
            src="../../public/assets/compete.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;

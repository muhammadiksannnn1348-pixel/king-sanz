const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-[#030014]/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-center px-4 pt-5 pb-3 sm:px-6">
        <div className="h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-gray-400/60 to-transparent" />
      </div>

      <div className="pb-6 text-center">
        <p className="text-sm text-gray-400 sm:text-base">
          © {currentYear}{" "}
          <a
            href="https://king-sanz.vercel.app/"
            className="font-medium text-gray-200 transition-colors duration-200 hover:text-white hover:underline"
          >
            xy.sanzz.kce
          </a>
          . All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
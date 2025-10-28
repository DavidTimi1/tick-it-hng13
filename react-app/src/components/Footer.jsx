function Footer() {
  return (
    <footer className="w-full bg-gray-100 mt-auto">
      <div className="max-w-[90rem] mx-auto p-4 text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} Tick-it. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white cursor-pointer">Quick Links</h3>
          <ul className="mt-4 space-y-3">
            <li><a href="/" className="text-blue-200 hover:text-white transition cursor-pointer">Home</a></li>
            <li><a href="/about" className="text-blue-200 hover:text-white transition cursor-pointer">About Us</a></li>
            <li><a href="/" className="text-blue-200 hover:text-white transition cursor-pointer">Services</a></li>
            <li><a href="/contact" className="text-blue-200 hover:text-white transition cursor-pointer">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold text-white cursor-pointer">Contact Us</h3>
          <p className="text-blue-200 mt-3 cursor-pointer">101 MediLink, navrangpura, india</p>
          <p className="text-blue-200 mt-2 cursor-pointer hover:text-white">📧 MediLink@gmail.com</p>
          <p className="text-blue-200 mt-2 cursor-pointer hover:text-white">📞 (111) 222-3333</p>
        </div>

        {/* Company Info */}
        <div className="ml-16">
          <h2 className="text-2xl font-extrabold text-white tracking-wide cursor-pointer">MediLink</h2>
          <p className="text-blue-200 mt-3 leading-relaxed cursor-pointer">
            Your trusted partner in healthcare, making appointments and medical access easy.
          </p>
        </div>

      </div>

      {/* Copyright */}
      <div className="text-center text-blue-300 mt-8 border-t border-blue-700 pt-4 text-sm">
        &copy; {new Date().getFullYear()} MediLink. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

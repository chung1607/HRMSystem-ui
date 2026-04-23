import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";

const FooterComponent = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">HRM System</h2>
          <p className="text-sm text-gray-400">
            Hệ thống quản lý nhân sự hiện đại, giúp doanh nghiệp tối ưu vận
            hành.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {["Dashboard", "Employees", "Teams", "Reports"].map((item) => (
              <li
                key={item}
                className="hover:text-white cursor-pointer transition-all duration-300 ease-out hover:translate-x-1"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
          <ul className="space-y-2">
            {["Help Center", "Privacy Policy", "Terms of Service"].map(
              (item) => (
                <li
                  key={item}
                  className="hover:text-white cursor-pointer transition-all duration-300 ease-out hover:translate-x-1"
                >
                  {item}
                </li>
              ),
            )}
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            {[FaFacebookF, FaGithub, FaLinkedinIn].map((Icon, index) => (
              <div
                key={index}
                className="p-3 bg-gray-800 rounded-full cursor-pointer 
                transition-all duration-300 ease-out 
                hover:bg-blue-500 hover:scale-110"
              >
                <Icon />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} HRM System. All rights reserved.
      </div>
    </footer>
  );
};

export default FooterComponent;

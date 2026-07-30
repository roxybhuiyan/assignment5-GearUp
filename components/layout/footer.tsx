export function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Logo & Description */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Gear<span className="text-blue-600">Up</span>
            </h2>

            <p className="mt-4 text-sm leading-6 text-gray-600">
              Rent premium sports and outdoor equipment instantly.
              Affordable, reliable, and delivered when you need it.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-900">
              Quick Links
            </h3>

            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="/" className="transition hover:text-blue-600">
                  Home
                </a>
              </li>

              <li>
                <a href="/products" className="transition hover:text-blue-600">
                  Products
                </a>
              </li>

              <li>
                <a href="/about" className="transition hover:text-blue-600">
                  About
                </a>
              </li>

              <li>
                <a href="/contact" className="transition hover:text-blue-600">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-900">
              Support
            </h3>

            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="transition hover:text-blue-600">
                  FAQ
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-blue-600">
                  Privacy Policy
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-blue-600">
                  Terms & Conditions
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-blue-600">
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-900">
              Contact
            </h3>

            <div className="space-y-2 text-sm text-gray-600">
              <p>📧 support@gearup.com</p>
              <p>📞 +1 (234) 567-890</p>
              <p>📍 New York, USA</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 text-sm text-gray-500 md:flex-row">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-gray-700">GearUp</span>. All
            rights reserved.
          </p>

          <div className="flex gap-5">
            <a href="#" className="transition hover:text-blue-600">
              Facebook
            </a>

            <a href="#" className="transition hover:text-blue-600">
              Instagram
            </a>

            <a href="#" className="transition hover:text-blue-600">
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
const Contact = () => {
  return (
    <div className=" ">
      {/* Header Section */}
      <header className="bg-white text-black shadow-xl py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-semibold mb-4">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl">
            We’re here to help. Reach out to us and we’ll get back to you as
            soon as possible.
          </p>
        </div>
      </header>

      {/* Contact Form Section */}
      <section className="pt-16 px-6 md:px-20">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg w-full">
            <h2 className="text-3xl font-semibold text-black mb-6">
              Get in Touch
            </h2>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-lg font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-lg font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-lg font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="6"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-black text-white font-semibold py-3 px-8 rounded-lg shadow-md transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-black mb-6">
              Our Contact Information
            </h2>
            <div>
              <p className="text-lg font-medium text-gray-700">Email:</p>
              <p className="text-lg">support@example.com</p>
            </div>
            <div>
              <p className="text-lg font-medium text-gray-700">Phone:</p>
              <p className="text-lg">+1 800 123 4567</p>
            </div>
            <div>
              <p className="text-lg font-medium text-gray-700">
                Office Location:
              </p>
              <p className="text-lg">123 Main Street, City, Country</p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Optional) */}
      <section className="py-16 px-6 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold text-black mb-6 bg-white max-w-7xl mx-auto p-2 rounded-lg shadow-lg">
            Find Us On The Map
          </h2>
          <div className="w-full h-64 bg-gray-300 rounded-lg shadow-lg">
            {/* Embed a Google Map or custom map here */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.6188202381945!2d144.96305821531767!3d-37.81362737975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d47e7acbd1f%3A0x5045675218ce4d0!2zQ2FyaW5nIFBhdWxh!5e0!3m2!1sen!2sau!4v1588031043371!5m2!1sen!2sau"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

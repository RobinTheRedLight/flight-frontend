/* eslint-disable react/no-unescaped-entities */
import img1 from "../../assets/About/img1.png";
import img2 from "../../assets/About/img2.png";

const About = () => {
  return (
    <div className="bg-gray-50 text-gray-900">
      {/* Header Section */}
      <header className="bg-white text-black py-16 shadow-lg">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-semibold mb-4">
            Welcome to Our Flight Booking Platform
          </h1>
          <p className="text-xl md:text-2xl">
            The easiest way to book flights and explore the world.
          </p>
        </div>
      </header>

      {/* About Section */}
      <section className=" pt-16 px-6 max-w-7xl mx-auto">
        <div className="bg-white shadow-lg container mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 lg:p-12">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-semibold text-black mb-4">About Us</h2>
            <p className="text-lg mb-6 leading-relaxed">
              We are dedicated to simplifying the flight booking process,
              offering a wide variety of options at competitive prices. Our
              mission is to help travelers find their perfect flight in the most
              seamless and efficient way possible.
            </p>
            <p className="text-lg leading-relaxed">
              Whether you're flying for business or leisure, we offer
              personalized recommendations and support to make your journey
              smooth and stress-free. Join thousands of satisfied travelers who
              trust us to take them to their dream destinations!
            </p>
          </div>
          <div className="flex justify-center md:justify-end">
            <img
              src={img1}
              alt="About Us Image"
              className="w-full max-w-sm rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Image Section */}
      <section className="pt-16 px-6 max-w-7xl mx-auto">
        <div className="container mx-auto bg-white shadow-lg lg:p-12">
          <h2 className="text-3xl text-center font-semibold text-black mb-6">
            Our Journey
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex justify-center">
              <img
                src={img2}
                alt="Flight Booking"
                className="w-full max-w-md rounded-lg shadow-lg"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-lg mb-4 leading-relaxed">
                Since our inception, we’ve been working tirelessly to offer the
                best flight options at the most affordable prices. We believe
                that the joy of travel should be accessible to everyone, which
                is why we’re committed to providing top-notch customer service
                and unbeatable value.
              </p>
              <p className="text-lg leading-relaxed">
                Whether it's a last-minute flight or a planned holiday, our
                platform adapts to your needs with ease. Your journey is just a
                few clicks away.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="pt-12 pb-16">
        <div className="container mx-auto text-center bg-white text-black shadow-xl lg:p-12">
          <h2 className="text-3xl font-semibold mb-4">
            Ready to Book Your Next Flight?
          </h2>
          <p className="text-lg mb-6">
            Browse through a variety of flight options and find the perfect one
            for you. Start your journey today!
          </p>
          <a
            href="/flights"
            className="bg-black text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-yellow-500 transition"
          >
            Start Booking
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;

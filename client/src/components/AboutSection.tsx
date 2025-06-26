const AboutSection = () => {
  return (
    <section className="bg-white py-12 px-6" id="about">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Image */}
        <div>
          <img
            src="./about.jpg"
            alt="aboutme"
            className="rounded-xl shadow-md w-full object-cover"/>
        </div>
        {/* Text */}
        <div>
          <h2 className="text-3xl font-bold text-[rgb(63,56,70)] mb-4">
            About Urban Munch
          </h2>
          <p className="text-purple-900 leading-relaxed">
            <strong>Urban Munch</strong> is your go-to neighborhood food and
            grocery store—bringing convenience, quality, and freshness to your
            doorstep. Whether you're craving a warm meal, refreshing drink, or
            essential groceries, we’ve got something delicious for everyone. Our
            mission is to make everyday eating easier, tastier, and faster.
          </p>
          <div className="mt-6 space-y-3 text-sm text-gray-900">
            <p>
              <strong>Meals:</strong> Quick, hot, and satisfying options from
              wraps to full plates for all cravings.
            </p>
            <p>
              <strong>Groceries:</strong> Fresh produce and pantry staples
              delivered to your home or office.
            </p>
            <p>
              <strong>Drinks:</strong> A variety of juices, sodas, and health
              drinks to keep you refreshed.
            </p>
          </div>
          <p className="mt-6  font-medium">
            Order now and experience the Urban Munch difference!
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

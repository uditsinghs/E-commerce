
function Policy() {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 w-full h-full gap-2   ">
      <div className="flex  justify-center items-center">
        <img 
          src="/images/privacy.jpg" 
          alt="contact-image" 
          className="w-full h-[90%] object-cover rounded-lg shadow-lg"
        />
      </div>
      <div className="flex flex-col justify-center mt-2 p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Privacy Policy</h1>

        <p className="mb-2 text-gray-600">
          At [Your Company Name], we value your privacy and are committed to
          protecting your personal information. This Privacy Policy outlines how
          we collect, use, and safeguard your information.
        </p>

        <h2 className="text-2xl font-semibold mt-2 mb-2 text-gray-700">
          Information We Collect
        </h2>
        <ul className="list-disc list-inside mb-2 text-gray-600">
          <li>Personal identification information (Name, email address, etc.)</li>
          <li>Usage data (how you interact with our website)</li>
          <li>Cookies and tracking technologies</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-2 mb-2 text-gray-700">
          How We Use Your Information
        </h2>
        <ul className="list-disc list-inside mb-2 text-gray-600">
          <li>To provide, operate, and maintain our website</li>
          <li>To improve and personalize your experience</li>
          <li>To communicate with you, either directly or through partners</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-2 mb-2 text-gray-700">
          Sharing Your Information
        </h2>
        <p className="mb-2 text-gray-600">
          We do not share your personal information with third parties except to
          comply with legal obligations or with your consent.
        </p>

        <h2 className="text-2xl font-semibold mt-2 mb-2 text-gray-700">
          Security of Your Information
        </h2>
        <p className="mb-2 text-gray-600">
          We use appropriate technical and organizational measures to protect your
          personal data against unauthorized access, loss, and misuse.
        </p>

        <h2 className="text-2xl font-semibold mt-2 mb-2 text-gray-700">
          Changes to This Policy
        </h2>
        <p className="mb-2 text-gray-600">
          We may update our Privacy Policy from time to time. We will notify you
          of any changes by posting the new policy on this page.
        </p>

        <h2 className="text-2xl font-semibold mt-2 mb-2 text-gray-700">
          Contact Us
        </h2>
        <p className="mb-2 text-gray-600">
          If you have any questions or concerns about this Privacy Policy, please
          contact us at [Your Email Address].
        </p>

        <p className="text-gray-500 text-sm">
          Last updated: [Date]
        </p>
      </div>
    </div>
  )
}

export default Policy
import Link from "next/link";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-stone-100">
      <main className="container mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Terms and Conditions
          </h1>
          <p className="text-gray-600 mb-6">Effective Date: 24 December 2024</p>

          <p className="text-gray-700 mb-4">
            Welcome to the Alilals Agrico Pvt Ltd website ("Website"). By
            accessing or using this Website, you agree to comply with and be
            bound by the following terms and conditions ("Terms"). If you do not
            agree with these Terms, please do not use the Website.
          </p>

          {/* Section 1 */}
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            1. Use of the Website
          </h2>
          <ul className="list-disc pl-6 text-gray-700 mb-6">
            <li>
              <strong>Eligibility:</strong> You must be at least 18 years old to
              use the Website. By using the Website, you confirm that you meet
              this requirement.
            </li>
            <li>
              <strong>Permitted Use:</strong> You may use the Website only for
              lawful purposes and in accordance with these Terms.
            </li>
            <li>
              <strong>Prohibited Use:</strong> You may not use the Website:
              <ul className="list-disc pl-6 mt-2">
                <li>
                  To engage in fraudulent, harmful, or illegal activities.
                </li>
                <li>To transmit viruses, malware, or other harmful code.</li>
                <li>
                  To interfere with or disrupt the Website’s functionality or
                  servers.
                </li>
              </ul>
            </li>
          </ul>

          {/* Section 2 */}
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            2. Intellectual Property
          </h2>
          <ul className="list-disc pl-6 text-gray-700 mb-6">
            <li>
              <strong>Ownership:</strong> All content on the Website, including
              but not limited to text, images, logos, and software, is owned by
              or licensed to Alilals Agrico Pvt Ltd.
            </li>
            <li>
              <strong>Restrictions:</strong> You may not copy, modify,
              distribute, or use any content from the Website without prior
              written consent from us.
            </li>
          </ul>

          {/* Section 3 */}
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            3. User Accounts
          </h2>
          <ul className="list-disc pl-6 text-gray-700 mb-6">
            <li>
              <strong>Account Creation:</strong> Some features of the Website
              may require you to create an account. You must provide accurate
              and complete information during registration.
            </li>
            <li>
              <strong>Responsibility:</strong> You are responsible for
              maintaining the confidentiality of your account credentials and
              for all activities conducted under your account.
            </li>
            <li>
              <strong>Termination:</strong> We reserve the right to suspend or
              terminate your account at any time for violation of these Terms or
              other policies.
            </li>
          </ul>

          {/* section 4 */}
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            4. Products and Services
          </h2>
          <ul className="list-disc pl-6 text-gray-700 mb-6">
            <li>
              <strong>Availability:</strong> Products and services displayed on
              the Website are subject to availability and may change without
              notice.
            </li>
            <li>
              <strong>Pricing:</strong> Prices listed on the Website are subject
              to change. We reserve the right to correct pricing errors.
            </li>
            <li>
              <strong>Disclaimer:</strong> We strive to provide accurate product
              descriptions. However, we do not warrant that product
              descriptions, images, or other content on the Website are
              error-free.
            </li>
          </ul>

          {/* section 5 */}
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            5. Privacy
          </h2>
          <p className="text-gray-700 mb-4">
            Your use of the Website is subject to our Privacy Policy, which can
            be found{" "}
            <Link className="underline text-blue-500" href="/privacy-policy">
              here
            </Link>
            . Please review the Privacy Policy to understand how we collect,
            use, and safeguard your information.
          </p>

          {/* section 6 */}
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            6. Limitation of Liability
          </h2>
          <ul className="list-disc pl-6 text-gray-700 mb-6">
            <li>
              <strong>No Warranty:</strong> The Website is provided "as is" and
              "as available." We make no warranties, express or implied,
              regarding the Website’s functionality or content.
            </li>
            <li>
              <strong>Liability Limitation:</strong> To the maximum extent
              permitted by law, Alilals Agrico Pvt Ltd shall not be liable for
              any direct, indirect, incidental, or consequential damages arising
              from your use of the Website.
            </li>
          </ul>

          {/* section 7 */}
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            7. Indemnification
          </h2>
          <p className="text-gray-700 mb-4">
            You agree to indemnify and hold harmless Alilals Agrico Pvt Ltd, its
            officers, directors, employees, and agents from any claims,
            liabilities, damages, or expenses arising from your use of the
            Website or violation of these Terms.
          </p>

          {/* section 8 */}
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            8. Third-Party Links
          </h2>
          <p className="text-gray-700 mb-4">
            The Website may contain links to third-party websites or services.
            We are not responsible for the content, policies, or practices of
            these third-party sites. Your use of such links is at your own risk.
          </p>

          {/* section 9 */}
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            9. Governing Law and Jurisdiction
          </h2>
          <p className="text-gray-700 mb-4">
            These Terms are governed by the laws of India. Any disputes arising
            from these Terms or your use of the Website shall be subject to the
            exclusive jurisdiction of the courts located in Srinagar, Jammu &
            Kashmir.
          </p>

          {/* section 10 */}
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            10. Changes to These Terms
          </h2>
          <p className="text-gray-700 mb-4">
            We may update these Terms from time to time. Changes will be posted
            on this page with the updated effective date. Your continued use of
            the Website after changes signifies acceptance of the revised Terms.
          </p>

          {/* Section 11 */}
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            11. Contact Us
          </h2>
          <p className="text-gray-700">
            If you have any questions or concerns regarding these Terms, please
            contact us:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mt-2">
            <li>
              <strong>Address:</strong> 56-Murad House, Pine Lane-8, Kursk
              Rajbagh, Srinagar-190008, J&K INDIA
            </li>
            <li>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:info@alilals.com"
                className="text-blue-500 underline"
              >
                info@alilals.com
              </a>
            </li>
            <li>
              <strong>Phone:</strong> 0194-796-1490
            </li>
          </ul>
          <br />
          <p>By using the Website, you agree to these Terms and Conditions</p>
        </div>
      </main>
    </div>
  );
}

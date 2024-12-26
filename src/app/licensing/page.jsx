import Link from "next/link";

export default function Licensing() {
  return (
    <div className="min-h-screen bg-stone-100">
      <main className="container mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Licensing</h1>
          <p className="text-gray-600 mb-6">Effective Date: 24 December 2024</p>

          <p className="text-gray-700 mb-4">
            This Licensing Policy outlines the terms and conditions under which
            Alilals Agrico Pvt Ltd ("we," "our," or "us") grants and governs
            licenses for the use of its products, services, and intellectual
            property. By using our licensed materials, you agree to comply with
            the terms of this Licensing Policy.
          </p>

          {/* Section 1 */}
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            1. Grant of License
          </h2>
          <ul className="list-disc pl-6 text-gray-700 mb-6">
            <li>
              <strong>Scope:</strong> Alilals Agrico Pvt. Ltd. grants you a
              non-exclusive, non-transferable, and revocable license to use its
              products and services as specified in the purchase agreement or
              subscription terms.
            </li>
            <li>
              <strong>Restrictions:</strong> The license is limited to the
              purposes explicitly agreed upon and does not grant rights to
              modify, distribute, sublicense, or commercially exploit the
              licensed materials without prior written consent.
            </li>
          </ul>

          {/* Section 2 */}
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            2. Intellectual Property Rights
          </h2>
          <ul className="list-disc pl-6 text-gray-700 mb-6">
            <li>
              <strong>Ownership:</strong> All intellectual property, including
              but not limited to trademarks, copyrights, patents, and
              proprietary information related to our products and services,
              remains the sole property of Alilals Agrico Pvt. Ltd.
            </li>
            <li>
              <strong>Acknowledgment:</strong> You agree that the use of our
              intellectual property does not transfer ownership rights to you.
            </li>
          </ul>

          {/* Section 3 */}
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            3. Permitted Use
          </h2>
          <p>Licensed materials may only be used:</p>
          <ul className="list-disc pl-6 text-gray-700 mb-6">
            <li>
              For the intended purposes as outlined in the relevant agreements
              or documentation.
            </li>
            <li>In compliance with all applicable laws and regulations.</li>
          </ul>

          {/* section 4 */}
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            4. Prohibited Use
          </h2>
          <p>You are prohibited from:</p>
          <ul className="list-disc pl-6 text-gray-700 mb-6">
            <li>
              Copying, reproducing, or creating derivative works of our
              materials without authorization.
            </li>
            <li>
              Using the licensed materials in a manner that infringes on
              third-party rights or violates any laws.
            </li>
            <li>
              Reverse engineering, decompiling, or disassembling any part of our
              licensed products.
            </li>
          </ul>

          {/* section 5 */}
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            5. Licensing Fees and Payment
          </h2>
          <ul className="list-disc pl-6 text-gray-700 mb-6">
            <li>
              <strong>Fees:</strong> Licensing fees, if applicable, are detailed
              in your agreement and are non- refundable except as required by
              law.
            </li>
            <li>
              <strong>Payment Terms:</strong> Payments must be made as per the
              agreed schedule. Failure to pay may result in suspension or
              termination of the license.
            </li>
          </ul>

          {/* section 6 */}
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            6. Term and Termination
          </h2>
          <ul className="list-disc pl-6 text-gray-700 mb-6">
            <li>
              <strong>Term:</strong> The license is valid for the period
              specified in your agreement.
            </li>
            <li>
              <strong>Termination:</strong> We reserve the right to terminate
              the license immediately if you violate the terms of this Licensing
              Policy.
            </li>
            <li>
              <strong>Effect of Termination:</strong> Upon termination, you must
              cease all use of the licensed materials and delete or return any
              copies in your possession.
            </li>
          </ul>

          {/* section 7 */}
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            7. Warranties and Disclaimers
          </h2>
          <ul className="list-disc pl-6 text-gray-700 mb-6">
            <li>
              <strong>Limited Warranty::</strong> We warrant that our licensed
              materials will perform as described in the accompanying
              documentation. This warranty does not apply to unauthorized use or
              modifications.
            </li>
            <li>
              <strong>Disclaimer:</strong> Except as expressly stated, all
              licensed materials are provided "as is" without warranties of any
              kind, either express or implied.
            </li>
          </ul>

          {/* section 8 */}
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            8. Limitation of Liability
          </h2>
          <p className="text-gray-700 mb-4">
            To the maximum extent permitted by law, Alilals Agrico Pvt Ltd shall
            not be liable for any indirect, incidental, or consequential damages
            arising from the use of licensed materials.
          </p>

          {/* section 9 */}
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            9. Compliance and Audits
          </h2>
          <p className="text-gray-700 mb-4">
            We reserve the right to audit your use of licensed materials to
            ensure compliance with this Licensing Policy. Any unauthorized use
            may result in penalties or additional fees.
          </p>

          {/* section 10 */}
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            10. Governing Law and Dispute Resolution
          </h2>
          <p className="text-gray-700 mb-4">
            This Licensing Policy is governed by the laws of India. Any disputes
            shall be resolved through arbitration in accordance with the Central
            Arbitration and Conciliation Act, 1996 and shall take place in
            Srinagar, Jammu & Kashmir, INDIA.
          </p>

          {/* section 11 */}
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            11. Changes to the Licensing Policy
          </h2>
          <p className="text-gray-700 mb-4">
            We may update this Licensing Policy from time to time. Changes will
            be posted on our website with the updated effective date. Continued
            use of licensed materials after changes signifies acceptance of the
            revised policy.
          </p>

          {/* Section 12 */}
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            12. Contact Us
          </h2>
          <p className="text-gray-700">
            For questions or concerns regarding this Licensing Policy, please
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
          <p>
            By using our licensed materials, you acknowledge and agree to the
            terms of this Licensing Policy.
          </p>
        </div>
      </main>
    </div>
  );
}

// frontend2\src\app\privacy-policy\page.tsx
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Ayush Bhandari',
  description: 'Read the privacy policy for Ayush Bhandari\'s portfolio website.',
  openGraph: {
    title: 'Privacy Policy | Ayush Bhandari',
    description: 'Read the privacy policy for Ayush BhandariStill\'s portfolio website.',
    type: 'website',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-950 via-ocean-950 to-slate-900 text-slate-100">
      <div className="container mx-auto px-6 lg:px-12 py-20">
        <nav className="mb-12">
          <Link href="/" className="text-[#E6F6FE]/70 hover:text-white transition-colors duration-300">
            ← Back to Home
          </Link>
        </nav>

        <div className="space-y-8">
          <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-[#00A6FB] to-[#E6F6FE] bg-clip-text text-transparent">
            Privacy Policy
          </h1>

          <div className="prose prose-slate max-w-none text-[#E6F6FE]/90">
            <p className="mb-6">
              Last updated: June 19, 2026
            </p>

            <h2 className="text-3xl font-bold text-[#00A6FB] mb-4">
              Introduction
            </h2>
            <p className="mb-6">
              Welcome to Ayush Bhandari's portfolio website ("we", "our", or "us"). This privacy policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>

            <h2 className="text-3xl font-bold text-[#00A6FB] mb-4">
              Information We Collect
            </h2>
            <p className="mb-6">
              We may collect information about you in a variety of ways. The information we may collect includes:
            </p>
            <ul className="list-disc list-space mb-6 pl-6">
              <li className="mb-2">
                <strong>Personal Data:</strong> Information such as your name, email address, phone number, or other identifiers that you voluntarily provide to us when filling out forms or communicating with us through the website.
              </li>
              <li className="mb-2">
                <strong>Usage Data:</strong> Information collected automatically when you use the website, including your IP address, browser type, operating system, page views, and links clicked.
              </li>
              <li className="mb-2">
                <strong>Cookies and Tracking Technologies:</strong> We use cookies and similar tracking technologies to track activity on our website and store certain information.
              </li>
            </ul>

            <h2 className="text-3xl font-bold text-[#00A6FB] mb-4">
              How We Use Your Information
            </h2>
            <p className="mb-6">
              We may use the information we collect for various purposes, including:
            </p>
            <ul className="list-disc list-space mb-6 pl-6">
              <li className="mb-2">
                To provide and maintain our website and services.
              </li>
              <li className="mb-2">
                To improve, personalize, and expand our website and services.
              </li>
              <li className="mb-2">
                To communicate with you, either directly or through one of our partners, including for customer service, updates, and marketing communications.
              </li>
              <li className="mb-2">
                To analyze how our website is used and to diagnose and prevent technical issues.
              </li>
              <li className="mb-2">
                To send you newsletters, special offers, and promotions about our services.
              </li>
            </ul>

            <h2 className="text-3xl font-bold text-[#00A6FB] mb-4">
              Sharing Your Information
            </h2>
            <p className="mb-6">
              We may share your information in the following situations:
            </p>
            <ul className="list-disc list-space mb-6 pl-6">
              <li className="mb-2">
                With your consent or at your direction.
              </li>
              <li className="mb-2">
                For legal reasons, such as responding to subpoenas, court orders, or legal processes.
              </li>
              <li className="mb-2">
                To enforce our terms and conditions and protect our rights.
              </li>
            </ul>

            <h2 className="text-3xl font-bold text-[#00A6FB] mb-4">
              Cookies and Tracking Technologies
            </h2>
            <p className="mb-6">
              We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with small amount of data which may include an anonymous unique identifier. We use both session cookies and persistent cookies.
            </p>
            <p className="mb-6">
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
            </p>

            <h2 className="text-3xl font-bold text-[#00A6FB] mb-4">
              Data Security
            </h2>
            <p className="mb-6">
              We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the internet, or method of electronic storage, is 100% secure. We cannot guarantee absolute security.
            </p>

            <h2 className="text-3xl font-bold text-[#00A6FB] mb-4">
              Links to Other Websites
            </h2>
            <p className="mb-6">
              Our website may contain links to third-party websites or services that are not owned or controlled by us. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
            </p>

            <h2 className="text-3xl font-bold text-[#00A6FB] mb-4">
              Children's Privacy
            </h2>
            <p className="mb-6">
              Our website does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us.
            </p>

            <h2 className="text-3xl font-bold text-[#00A6FB] mb-4">
              Changes to This Privacy Policy
            </h2>
            <p className="mb-6">
              We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page. You are advised to review this privacy policy periodically for any changes.
            </p>

            <h2 className="text-3xl font-bold text-[#00A6FB] mb-4">
              Contact Us
            </h2>
            <p className="mb-6">
              If you have any questions about this privacy policy, please contact us through the contact information provided on our website.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-brand-accent/10 flex items-center justify-center">
              <FileText className="text-brand-accent" size={20} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">Terms of Service</h1>
          </div>

          <p className="text-gray-500 text-sm mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <div className="space-y-8 text-gray-400 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">1. Agreement to Terms</h2>
              <p>
                By accessing or using ProofLine's website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">2. Services</h2>
              <p className="mb-4">
                ProofLine provides web design, development, and conversion optimization services. Our services include but are not limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Website design and development</li>
                <li>Landing page optimization</li>
                <li>Conversion rate optimization</li>
                <li>Website audits and consultations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">3. Payment Terms</h2>
              <p className="mb-4">
                Payment terms are specified in individual project agreements. General terms include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>A deposit is required before work begins</li>
                <li>Final payment is due upon project completion</li>
                <li>All fees are non-refundable unless otherwise specified</li>
                <li>Late payments may incur additional fees</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">4. Intellectual Property</h2>
              <p className="mb-4">
                <strong className="text-gray-300">Client Ownership:</strong> Upon full payment, you own all custom designs, code, and content created specifically for your project.
              </p>
              <p className="mb-4">
                <strong className="text-gray-300">ProofLine Rights:</strong> We retain the right to use general techniques, methods, and knowledge gained during the project. We may also showcase completed work in our portfolio unless otherwise agreed.
              </p>
              <p>
                <strong className="text-gray-300">Third-Party Assets:</strong> Some projects may include third-party fonts, images, or software subject to their own licenses.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">5. Client Responsibilities</h2>
              <p className="mb-4">Clients agree to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide necessary content, assets, and feedback in a timely manner</li>
                <li>Ensure they have rights to all materials provided to us</li>
                <li>Review and approve deliverables within agreed timeframes</li>
                <li>Maintain appropriate backups of their own data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">6. Limitation of Liability</h2>
              <p className="mb-4">
                ProofLine shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Loss of profits, revenue, or business opportunities</li>
                <li>Loss of data or information</li>
                <li>Downtime or service interruptions</li>
              </ul>
              <p className="mt-4">
                Our total liability shall not exceed the amount paid for the specific service giving rise to the claim.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">7. Disclaimer of Warranties</h2>
              <p>
                While we strive for excellence, our services are provided "as is" without warranties of any kind. We do not guarantee specific results, rankings, or conversion rates, as these depend on many factors outside our control.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">8. Termination</h2>
              <p>
                Either party may terminate a project with written notice. Upon termination, the client is responsible for payment of all work completed up to the termination date. Any deposits paid are non-refundable.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">9. Confidentiality</h2>
              <p>
                Both parties agree to keep confidential any proprietary information shared during the course of the project. This includes business strategies, technical specifications, and any information marked as confidential.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">10. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the State of Colorado, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">11. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services constitutes acceptance of modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">12. Contact</h2>
              <p>
                For questions about these Terms, please contact us at{' '}
                <a href="mailto:hello@proofline.co" className="text-brand-accent hover:underline">
                  hello@proofline.co
                </a>
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsPage;

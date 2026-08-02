import type { Metadata } from 'next'
import { LegalPage, LegalSection } from '@/components/legal-page'

export const metadata: Metadata = {
  title: 'Privacy Policy | Reformed Books House',
  description: 'How Reformed Books House collects, uses, and protects your personal information.',
}

const LAST_UPDATED = 'May 27, 2026'
const CONTACT_EMAIL = 'info@reformedbooks.com'

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated={LAST_UPDATED}>
      <LegalSection title="Introduction">
        <p>
          Reformed Books House (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the website at reformedbooks.com
          and related services (collectively, the &quot;Site&quot;). This Privacy Policy explains how we collect, use,
          disclose, and safeguard information when you visit the Site, browse our catalog, subscribe to updates, or
          otherwise interact with us.
        </p>
        <p>
          By using the Site, you agree to the practices described here. If you do not agree, please do not use the
          Site.
        </p>
      </LegalSection>

      <LegalSection title="Information We Collect">
        <p>
          <strong className="text-foreground">Information you provide.</strong> When you contact us, request a
          newsletter, submit an author inquiry, create an account (if available), or place an order, we may collect
          your name, email address, mailing address, phone number, payment details (processed by our payment provider),
          and the content of your messages.
        </p>
        <p>
          <strong className="text-foreground">Information collected automatically.</strong> When you use the Site, we
          may automatically collect your IP address, browser type, device identifiers, pages viewed, referring URLs,
          and general usage data through cookies and similar technologies. See our{' '}
          <a href="/cookies" className="text-accent underline-offset-2 hover:underline">
            Cookie Policy
          </a>{' '}
          for details.
        </p>
      </LegalSection>

      <LegalSection title="How We Use Your Information">
        <p>We use the information we collect to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Operate, maintain, and improve the Site and our publishing services</li>
          <li>Process orders, fulfill purchases, and provide customer support</li>
          <li>Send administrative messages, newsletters, or marketing communications (where permitted and with your consent where required)</li>
          <li>Respond to inquiries, including author submissions and partnership requests</li>
          <li>Monitor usage, analyze trends, and protect against fraud, abuse, or security incidents</li>
          <li>Comply with legal obligations and enforce our Terms of Service</li>
        </ul>
      </LegalSection>

      <LegalSection title="Legal Bases for Processing (EEA/UK Visitors)">
        <p>
          If you are in the European Economic Area or the United Kingdom, we process personal data only when we have a
          valid legal basis, such as your consent, performance of a contract, compliance with law, or our legitimate
          interests (for example, site security and analytics), balanced against your rights.
        </p>
      </LegalSection>

      <LegalSection title="How We Share Information">
        <p>We do not sell your personal information. We may share information with:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Service providers who assist with hosting, analytics, email delivery, payment processing, and customer support</li>
          <li>Professional advisors (lawyers, accountants) when necessary</li>
          <li>Authorities if required by law or to protect rights, safety, and security</li>
          <li>A successor entity in connection with a merger, acquisition, or asset sale, subject to this policy</li>
        </ul>
        <p>These parties are authorized to use your information only as needed to provide services to us.</p>
      </LegalSection>

      <LegalSection title="Data Retention">
        <p>
          We retain personal information only as long as necessary for the purposes described in this policy, unless a
          longer retention period is required or permitted by law (for example, tax or accounting records).
        </p>
      </LegalSection>

      <LegalSection title="Your Rights and Choices">
        <p>
          Depending on where you live, you may have the right to access, correct, delete, or restrict processing of your
          personal information, to object to certain processing, to data portability, and to withdraw consent where
          processing is based on consent. You may also opt out of marketing emails by using the unsubscribe link in those
          messages.
        </p>
        <p>
          To exercise these rights, contact us at{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent underline-offset-2 hover:underline">
            {CONTACT_EMAIL}
          </a>
          . We may need to verify your identity before responding. You may also lodge a complaint with your local data
          protection authority.
        </p>
      </LegalSection>

      <LegalSection title="Children&apos;s Privacy">
        <p>
          The Site is not directed to children under 13 (or the applicable age in your jurisdiction). We do not knowingly
          collect personal information from children. If you believe we have collected such information, please contact
          us so we can delete it.
        </p>
      </LegalSection>

      <LegalSection title="Security">
        <p>
          We use reasonable administrative, technical, and organizational measures to protect personal information.
          No method of transmission over the Internet or electronic storage is completely secure; we cannot guarantee
          absolute security.
        </p>
      </LegalSection>

      <LegalSection title="International Transfers">
        <p>
          If you access the Site from outside the country where our servers or service providers are located, your
          information may be transferred to and processed in other countries that may have different data protection
          laws. Where required, we use appropriate safeguards for such transfers.
        </p>
      </LegalSection>

      <LegalSection title="Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date at the top indicates
          when changes take effect. Material changes may be communicated through the Site or by email where appropriate.
        </p>
      </LegalSection>

      <LegalSection title="Contact Us">
        <p>
          Questions about this Privacy Policy or our data practices may be sent to{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent underline-offset-2 hover:underline">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  )
}

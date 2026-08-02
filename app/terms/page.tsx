import type { Metadata } from 'next'
import { LegalPage, LegalSection } from '@/components/legal-page'

export const metadata: Metadata = {
  title: 'Terms of Service | Reformed Books House',
  description: 'Terms and conditions for using the Reformed Books House website and services.',
}

const LAST_UPDATED = 'May 27, 2026'
const CONTACT_EMAIL = 'info@reformedbooks.com'

export default function TermsOfServicePage() {
  return (
    <LegalPage title="Terms of Service" lastUpdated={LAST_UPDATED}>
      <LegalSection title="Agreement to Terms">
        <p>
          These Terms of Service (&quot;Terms&quot;) govern your access to and use of the Reformed Books House website and
          related services (the &quot;Site&quot;), operated by Reformed Books House (&quot;we,&quot; &quot;us,&quot; or
          &quot;our&quot;). By accessing or using the Site, you agree to these Terms and our{' '}
          <a href="/privacy" className="text-accent underline-offset-2 hover:underline">
            Privacy Policy
          </a>
          . If you do not agree, do not use the Site.
        </p>
      </LegalSection>

      <LegalSection title="Eligibility">
        <p>
          You must be at least 18 years old (or the age of majority in your jurisdiction) to make purchases or enter
          binding agreements through the Site. By using the Site, you represent that you meet this requirement.
        </p>
      </LegalSection>

      <LegalSection title="Use of the Site">
        <p>You agree to use the Site only for lawful purposes. You must not:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Violate any applicable law or regulation</li>
          <li>Infringe intellectual property or other rights of Reformed Books or third parties</li>
          <li>Upload malware, attempt unauthorized access, or interfere with Site operation</li>
          <li>Scrape, harvest, or automate access to the Site without our prior written consent</li>
          <li>Impersonate any person or misrepresent your affiliation with any entity</li>
        </ul>
      </LegalSection>

      <LegalSection title="Accounts">
        <p>
          If you create an account, you are responsible for safeguarding your credentials and for all activity under
          your account. Notify us promptly at{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent underline-offset-2 hover:underline">
            {CONTACT_EMAIL}
          </a>{' '}
          if you suspect unauthorized use. We may suspend or terminate accounts that violate these Terms.
        </p>
      </LegalSection>

      <LegalSection title="Products, Orders, and Pricing">
        <p>
          We strive to display accurate descriptions, prices, and availability for books and related products. Errors
          may occur; we reserve the right to correct them and to cancel or refuse orders affected by pricing or
          listing mistakes.
        </p>
        <p>
          When e-commerce features are enabled, your order constitutes an offer to purchase. We accept the offer when
          we confirm the order (by email or other notice). Shipping times, taxes, and payment terms will be shown at
          checkout.
        </p>
      </LegalSection>

      <LegalSection title="Intellectual Property">
        <p>
          The Site and its content—including text, graphics, logos, cover art, layouts, and software—are owned by
          Reformed Books or our licensors and are protected by copyright, trademark, and other laws. You may view and
          download content for personal, non-commercial use only, unless we grant written permission otherwise.
        </p>
        <p>
          Book excerpts, articles, and downloadable materials may be subject to additional license terms displayed with
          that content.
        </p>
      </LegalSection>

      <LegalSection title="User Submissions">
        <p>
          If you submit manuscripts, reviews, comments, or other materials (&quot;Submissions&quot;), you grant us a
          non-exclusive, worldwide, royalty-free license to use, reproduce, and display those Submissions in connection
          with operating the Site and evaluating publishing opportunities. You represent that you have the rights to
          grant this license and that your Submissions do not violate any third-party rights or laws.
        </p>
        <p>
          We are under no obligation to publish, respond to, or retain Submissions. Separate agreements may apply to
          accepted manuscripts.
        </p>
      </LegalSection>

      <LegalSection title="Third-Party Links and Services">
        <p>
          The Site may link to third-party websites or services (for example, social networks or payment processors).
          We are not responsible for their content, policies, or practices. Your use of third-party services is at your
          own risk and subject to their terms.
        </p>
      </LegalSection>

      <LegalSection title="Disclaimer of Warranties">
        <p>
          THE SITE AND ALL CONTENT ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY
          KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
          PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SITE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE.
        </p>
        <p>
          Theological, educational, and editorial content on the Site is for general information and does not
          constitute professional, pastoral, or legal advice.
        </p>
      </LegalSection>

      <LegalSection title="Limitation of Liability">
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, REFORMED BOOKS AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS WILL
          NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR FOR ANY LOSS OF
          PROFITS, DATA, OR GOODWILL, ARISING FROM YOUR USE OF THE SITE. OUR TOTAL LIABILITY FOR ANY CLAIM RELATING TO
          THE SITE WILL NOT EXCEED THE GREATER OF (A) THE AMOUNT YOU PAID US IN THE TWELVE MONTHS BEFORE THE CLAIM OR
          (B) ONE HUNDRED U.S. DOLLARS (USD $100).
        </p>
        <p>
          Some jurisdictions do not allow certain limitations; in those cases, our liability is limited to the fullest
          extent permitted by law.
        </p>
      </LegalSection>

      <LegalSection title="Indemnification">
        <p>
          You agree to indemnify and hold harmless Reformed Books from claims, damages, losses, and expenses (including
          reasonable attorneys&apos; fees) arising from your use of the Site, your Submissions, or your violation of
          these Terms or any third-party rights.
        </p>
      </LegalSection>

      <LegalSection title="Governing Law and Disputes">
        <p>
          These Terms are governed by the laws of the jurisdiction in which Reformed Books is established, without
          regard to conflict-of-law principles. Any dispute arising under these Terms shall be resolved in the courts of
          that jurisdiction, except where mandatory consumer protection laws in your country require otherwise.
        </p>
      </LegalSection>

      <LegalSection title="Changes">
        <p>
          We may modify these Terms at any time by posting an updated version on the Site. Continued use after the
          effective date constitutes acceptance of the revised Terms.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          For questions about these Terms, contact{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent underline-offset-2 hover:underline">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  )
}

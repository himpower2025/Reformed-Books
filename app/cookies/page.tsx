import type { Metadata } from 'next'
import { LegalPage, LegalSection } from '@/components/legal-page'

export const metadata: Metadata = {
  title: 'Cookie Policy | Reformed Books',
  description: 'How Reformed Books uses cookies and similar technologies on this website.',
}

const LAST_UPDATED = 'May 27, 2026'
const CONTACT_EMAIL = 'info@reformedbooks.com'

export default function CookiePolicyPage() {
  return (
    <LegalPage title="Cookie Policy" lastUpdated={LAST_UPDATED}>
      <LegalSection title="What Are Cookies?">
        <p>
          Cookies are small text files placed on your device when you visit a website. They help the site remember your
          preferences, keep you signed in, understand how visitors use pages, and support security. We also use similar
          technologies such as local storage and pixels, which we refer to collectively as &quot;cookies&quot; in this
          policy.
        </p>
      </LegalSection>

      <LegalSection title="How We Use Cookies">
        <p>Reformed Books uses cookies for the following purposes:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-foreground">Strictly necessary.</strong> Required for core Site functions such as
            load balancing, security, and remembering privacy choices.
          </li>
          <li>
            <strong className="text-foreground">Functional.</strong> Remember settings you choose (for example, display
            preferences) to improve your experience.
          </li>
          <li>
            <strong className="text-foreground">Analytics.</strong> Help us understand traffic and usage patterns so we
            can improve content and navigation. We may use services such as Vercel Analytics in production
            environments.
          </li>
          <li>
            <strong className="text-foreground">Marketing (if enabled).</strong> Measure newsletter sign-ups or campaign
            effectiveness. We will only use non-essential marketing cookies with your consent where required by law.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Cookies We May Use">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="py-2 pr-4 font-medium text-foreground">Category</th>
                <th className="py-2 pr-4 font-medium text-foreground">Examples</th>
                <th className="py-2 font-medium text-foreground">Typical duration</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border">
                <td className="py-3 pr-4 align-top">Necessary</td>
                <td className="py-3 pr-4 align-top">Session identifiers, consent records</td>
                <td className="py-3 align-top">Session to 1 year</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 pr-4 align-top">Analytics</td>
                <td className="py-3 pr-4 align-top">Anonymous page views, performance metrics</td>
                <td className="py-3 align-top">Up to 2 years</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 align-top">Functional</td>
                <td className="py-3 pr-4 align-top">Theme or layout preferences</td>
                <td className="py-3 align-top">Up to 1 year</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4">
          Specific cookie names may change as we update the Site or our service providers. This table describes typical
          categories rather than an exhaustive real-time list.
        </p>
      </LegalSection>

      <LegalSection title="Third-Party Cookies">
        <p>
          Some cookies are set by third parties that provide services on our behalf (for example, hosting, analytics, or
          embedded media). Those parties have their own privacy policies. We encourage you to review them if you use
          features that load third-party content.
        </p>
      </LegalSection>

      <LegalSection title="Your Choices">
        <p>
          Most browsers let you block or delete cookies through settings. Blocking all cookies may affect Site
          functionality. Where required by law (for example, in the EEA or UK), we will ask for your consent before
          placing non-essential cookies.
        </p>
        <p>
          You can also use industry opt-out tools for certain analytics and advertising cookies, such as those offered by
          your browser manufacturer or digital advertising alliances in your region.
        </p>
      </LegalSection>

      <LegalSection title="Do Not Track">
        <p>
          Some browsers send &quot;Do Not Track&quot; signals. There is no uniform standard for how sites respond. We
          currently do not alter our practices solely in response to DNT signals, but you can manage cookies as
          described above.
        </p>
      </LegalSection>

      <LegalSection title="Updates">
        <p>
          We may update this Cookie Policy to reflect changes in technology or law. The date at the top shows when it
          was last revised. See also our{' '}
          <a href="/privacy" className="text-accent underline-offset-2 hover:underline">
            Privacy Policy
          </a>{' '}
          for how we handle personal information collected through cookies.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Questions about cookies may be sent to{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent underline-offset-2 hover:underline">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  )
}

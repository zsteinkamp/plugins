import Link from "next/link";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <div className="m-auto">
        <div className="flex mb-12 ml-[-2rem] mt-[-2rem] bg-lcdbg p-8 mr-[-2rem] sm:mr-[-4rem]">
          <div className="text-xl mt-2 mr-8"><Link href="/">&lt; Home</Link></div>
          <h1 className="text-5xl text-highlight">
            Privacy Policy
          </h1>
        </div>
      </div>
      <div className="sm:mx-8">
        <div className="lg:flex mb-16">
          <div className="prose lg:prose-2xl prose-invert grow">
            <div>
              <p>
                This website and associated apps do not collect personal data. There is no login, no tracking pixels, no advertising. Downloaded Ableton Livew devices will &quot;phone home&quot; once per session for the purpose of tracking which devices are popular, so that I may invest my time more wisely. The &quot;phone home&quot; packet does not contain any personal data. The IP address of the packet is not retained, only a geo-ip lookup to get the country.
              </p>
              <p>
                Please email zack@steinkamp.us with any questions about this policy.
              </p>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  )
}

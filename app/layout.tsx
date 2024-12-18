import { getSortedPluginData } from "@/lib/dataUtils";
import { PluginMeta } from "@/types";
import type { Metadata } from "next";
import "./globals.css";
import TableOfContents from "@/components/TableOfContents";

export const metadata: Metadata = {
  title: "Zack's Plugins",
  description: "Plugins / Devices for Ableton Live by Zack Steinkamp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pluginData: PluginMeta[] = getSortedPluginData()
  return (
    <html lang='en'>
      <head>
        <link rel='stylesheet' href='https://use.typekit.net/tek5ypq.css' />
      </head>
      <body>
        <div className="flex min-h-screen">
          <div className="flex-1 max-w-5xl p-8">
            {children}
          </div>
          <div className='hidden sm:block min-w-[16rem] ml-8 bg-tilebg p-8 shadow-md'>
            <div className='fixed max-h-[calc(100vh-4rem)] overflow-y-auto'>
              <TableOfContents pluginData={pluginData} className='max-h-screen overflow-y-auto' />
            </div>
          </div>
        </div>
      </body>
    </html >
  );
}

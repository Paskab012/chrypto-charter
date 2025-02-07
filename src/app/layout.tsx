import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Cryprto-charter platform",
  description: "Cryprto-charter platform",
  icons: "/vector-charter.svg"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='bg-black'>{children}</body>
    </html>
  );
}

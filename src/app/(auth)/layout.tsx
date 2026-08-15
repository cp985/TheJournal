import "../globals.css";

import SessionProvider from "@/components/layout/sessionProvider";
import Footer from "@/components/layout/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

 <SessionProvider >
      <div className="min-h-full flex flex-col">
     
          {children}
          <Footer />
      
      </div>
    </SessionProvider>
 
  );
}

import "../globals.css";

import Footer from "@/components/layout/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

 
      <div className="min-h-full flex flex-col">
     
          {children}
          <Footer />
      
      </div>
  
 
  );
}

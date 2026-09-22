import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import React from "react";

const PublicLayout = async ({ children }: { children: React.ReactNode }) => {


  return (
    <div className="flex flex-col min-h-screen">
      <Navbar></Navbar>
      <main className="flex-1">{children}</main>
      <Footer/>
    </div>
  );
};

export default PublicLayout;

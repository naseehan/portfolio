import React from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "404 — Quest Not Found",
};

export default function NotFound() {
  return (
    <div className="portfolio-app-root">
      <Navbar />
      <main id="main-content">
        <div className="notfound-wrapper">
          <div className="notfound-card">
            <div className="notfound-code" aria-hidden="true">
              404
            </div>
            <h1 className="notfound-title">QUEST NOT FOUND</h1>
            <p className="notfound-copy">
              The page or secret zone you are looking for has moved, expired, or does not exist in this realm.
            </p>
            <Link href="/" className="btn btn-primary">
              <span>Return to Safe Zone (Home)</span>
              <span className="btn-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

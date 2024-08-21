"use client";
import { useState, useEffect } from "react";
import Container from "../util/container";
import Button from "../util/button";

const CookieModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem("cookieConsent");
    if (!hasConsented) {
      setIsOpen(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setIsOpen(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "false");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-0 bg-neutral-950 z-10 rounded-lg right-0 m-[5vw] bg-opacity-80 text-neutral-50">
      <Container className="w-fit p-[2vw] md:p-[5vw]">
        <h2 className="text-base">We use cookies</h2>
        <p className="text-sm">
          This website uses cookies to improve your experience. Please accept or
          decline cookies.
        </p>
        <div className="flex mt-2">
          <Button handleClick={handleAccept} name="Accept" size="sm" />
          <Button handleClick={handleDecline} name="Decline" size="sm" />
        </div>
      </Container>
    </div>
  );
};

export default CookieModal;

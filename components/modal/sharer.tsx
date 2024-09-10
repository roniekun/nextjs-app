"use client";
import React, { useState, useRef } from "react";
import { admin } from "../utils/data/admin";

type Props = {
  isShareModalOpen?: boolean;
};

const ShareModal: React.FC<Props> = ({ isShareModalOpen = false }) => {
  const urlInputRef = useRef<HTMLInputElement>(null);

  const handleCopy = async () => {
    if (urlInputRef.current) {
      try {
        // Use the Clipboard API to copy text
        await navigator.clipboard.writeText(urlInputRef.current.value);
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    }
  };

  const shareToSocialMedia = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      admin.url
    )}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      admin.url
    )}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      admin.url
    )}`,
  };

  return (
    <>
      {isShareModalOpen && (
        <div className="flex flex-wrap gap-x-2">
          <div className="gap-1 flex">
            <input readOnly type="url" value={admin.url} ref={urlInputRef} />
            <button onClick={handleCopy}>Copy URL</button>
          </div>
          <button onClick={() => shareToSocialMedia(shareUrls.facebook)}>
            Facebook
          </button>
          <button onClick={() => shareToSocialMedia(shareUrls.twitter)}>
            Twitter
          </button>
          <button onClick={() => shareToSocialMedia(shareUrls.linkedin)}>
            LinkedIn
          </button>
        </div>
      )}
    </>
  );
};

export default ShareModal;

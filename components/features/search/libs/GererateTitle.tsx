import { useState, useEffect } from "react";
import Head from "next/head";
const GenerateTitle = ({ query }: { query: string }) => {
  const [title, setTitle] = useState<string>("Search");

  useEffect(() => {
    const newTitle = `${title}`;
    setTitle(newTitle);
  }, [title]);

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={`Search result`} />
    </Head>
  );
};

export default GenerateTitle;

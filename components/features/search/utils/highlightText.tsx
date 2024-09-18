// import { contentData, IContentData } from "@/data/content-data";
// import { useMemo } from "react";
// //  for highlighting the query in text
// const useTextWithHighlights = (
//   results: IContentData[],
//   query: string | null
// ): JSX.Element => {
//   const highlightText = (text: string, query: string | null) => {
//     if (!query) return text;
//     const parts = text.split(new RegExp(`(${query})`, "gi"));
//     return parts.map((part, index) =>
//       part.toLowerCase() === query.toLowerCase() ? (
//         <mark key={index}>{part}</mark>
//       ) : (
//         part
//       )
//     );
//   };

//   return useMemo(() => {
//     if (results.length === 0) {
//       return (
//         <ul>
//           <h3>No Results found.</h3>
//         </ul>
//       );
//     }

//     return (
//       <ul>
//         {results.map((item) => (
//           <li key={item.id} className="w-full relative">
//             <h1 className="font-medium">{highlightText(item.title, query)}</h1>
//             <p className="text-[--text-color-secondary]">
//               {highlightText(item.content, query)}
//             </p>
//           </li>
//         ))}
//       </ul>
//     );
//   }, [results, query]);
// };

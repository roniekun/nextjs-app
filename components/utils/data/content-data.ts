export interface IContentData {
  id: number;
  title: string;
  content: string;
  link?: string;
}

export const contentData: IContentData[] = [
  {
    id: 1,
    title: "Introduction to React",
    content: "React is a JavaScript library for building user interfaces.",
  },
  {
    id: 2,
    title: "Why Use React?",
    content:
      "React allows you to create reusable components and is efficient for dynamic UIs.",
  },
  {
    id: 3,
    title: "Getting Started with React",
    content:
      "To get started with React, you can use Create React App to scaffold a new project.",
  },
];

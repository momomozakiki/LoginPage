import { useEffect } from "react";

interface DocumentTitleProps {
  title: string;
}

const DocumentTitle: React.FC<DocumentTitleProps> = ({ title }) => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${title} - Your App Name`;

    return () => {
      document.title = previousTitle;
    };
  }, [title]);

  return null;
};

export default DocumentTitle;

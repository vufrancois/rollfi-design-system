import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import docsContent from '../../../design-system.md?raw';
import './Docs.css';

interface DocsProps {
  onExit: () => void;
}

export function Docs({ onExit }: DocsProps) {
  return (
    <div className="rf-docs">
      <header className="rf-docs__header">
        <button type="button" className="rf-docs__back" onClick={onExit} aria-label="Back to library">
          ← Library
        </button>
        <span className="rf-docs__title">design-system.md</span>
      </header>
      <article className="rf-docs__article">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{docsContent}</ReactMarkdown>
      </article>
    </div>
  );
}

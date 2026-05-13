import { useRef, useState, type DragEvent } from 'react';
import { UploadSimple, File as FileIcon, X } from '@phosphor-icons/react';
import './FileUpload.css';

interface FileUploadProps {
  value?: File | null;
  onChange: (file: File | null) => void;
  accept?: string;
  maxSize?: number; // bytes
  hint?: string;
  label?: string;
  error?: string;
}

function fmtSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function FileUpload({ value, onChange, accept, maxSize, hint, label, error }: FileUploadProps) {
  const [drag, setDrag] = useState(false);
  const [localErr, setLocalErr] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const acceptFile = (file: File) => {
    if (maxSize && file.size > maxSize) {
      setLocalErr(`File exceeds ${fmtSize(maxSize)}`);
      return;
    }
    setLocalErr(null);
    onChange(file);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(false);
    const file = e.dataTransfer.files[0];
    if (file) acceptFile(file);
  };

  const displayError = error || localErr;

  return (
    <div className="rf-file-upload-wrap">
      {label && <label className="rf-file-upload__label">{label}</label>}
      {value ? (
        <div className="rf-file-upload__preview">
          <span className="rf-file-upload__icon"><FileIcon size={20} /></span>
          <div className="rf-file-upload__meta">
            <span className="rf-file-upload__name">{value.name}</span>
            <span className="rf-file-upload__size">{fmtSize(value.size)}</span>
          </div>
          <button type="button" className="rf-file-upload__remove" onClick={() => onChange(null)} aria-label="Remove file">
            <X size={14} />
          </button>
        </div>
      ) : (
        <div
          className={`rf-file-upload ${drag ? 'rf-file-upload--drag' : ''} ${displayError ? 'rf-file-upload--error' : ''}`}
          onClick={() => inputRef.current?.click()}
          onDragEnter={e => { e.preventDefault(); setDrag(true); }}
          onDragOver={e => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={onDrop}
          role="button"
          tabIndex={0}
        >
          <UploadSimple size={22} className="rf-file-upload__hint-icon" />
          <span className="rf-file-upload__primary">Drop a file here, or click to browse</span>
          <span className="rf-file-upload__secondary">
            {[accept && `Accepted: ${accept}`, maxSize && `Max ${fmtSize(maxSize)}`].filter(Boolean).join(' · ')}
          </span>
          <input
            ref={inputRef}
            type="file"
            className="rf-file-upload__input"
            accept={accept}
            onChange={e => e.target.files?.[0] && acceptFile(e.target.files[0])}
          />
        </div>
      )}
      {displayError ? <span className="rf-file-upload__error">{displayError}</span> :
       hint ? <span className="rf-file-upload__hintText">{hint}</span> : null}
    </div>
  );
}

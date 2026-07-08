import { type ReactNode } from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../Accordion/Accordion';
import './PaystubBreakdown.css';

export interface PaystubLine {
  label: string;
  /**
   * Number: auto-formats as USD with 2 decimals, negatives render in danger color.
   * String: renders verbatim, no color logic (use when the "value" is a token like "Direct Deposit").
   */
  value: number | string;
}

export interface PaystubSection {
  id: string;
  label: string;
  /** Section header value. Same number vs string rules as `PaystubLine.value`. */
  value: number | string;
  /** Line items shown when the section is expanded. Omit to render a non-expandable row. */
  lines?: PaystubLine[];
}

interface PaystubBreakdownProps {
  sections: PaystubSection[];
  /**
   * Which section ids start expanded. Also used for controlled mode via Accordion's
   * defaultValue. Multi-open is on by default so users can compare sections.
   */
  defaultOpen?: string[];
  /** Bottom-anchored slot (typically a full-width `Button` — e.g. "Download Paystub"). */
  action?: ReactNode;
  /** Currency format helper. Default: en-US, USD, 2 decimals. */
  format?: (value: number) => string;
  className?: string;
}

const DEFAULT_FMT = (v: number) =>
  `${v < 0 ? '-' : ''}$${Math.abs(v).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

function ValueDisplay({ value, format, kind }: { value: number | string; format: (n: number) => string; kind: 'header' | 'line' }) {
  if (typeof value === 'string') {
    return <span className={`rf-paystub__value rf-paystub__value--${kind}`}>{value}</span>;
  }
  const negative = value < 0;
  return (
    <span
      className={`rf-paystub__value rf-paystub__value--${kind} ${negative ? 'rf-paystub__value--negative' : ''}`}
    >
      {format(value)}
    </span>
  );
}

export function PaystubBreakdown({
  sections,
  defaultOpen,
  action,
  format = DEFAULT_FMT,
  className = '',
}: PaystubBreakdownProps) {
  return (
    <div className={`rf-paystub ${className}`}>
      <Accordion type="multiple" defaultValue={defaultOpen}>
        {sections.map(section => {
          const expandable = !!section.lines && section.lines.length > 0;
          return (
            <AccordionItem key={section.id} value={section.id}>
              {expandable ? (
                <>
                  <AccordionTrigger trailing={<ValueDisplay value={section.value} format={format} kind="header" />}>
                    {section.label}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="rf-paystub__lines">
                      {section.lines!.map((line, i) => (
                        <div key={`${section.id}-${i}`} className="rf-paystub__line">
                          <span className="rf-paystub__line-label">{line.label}</span>
                          <ValueDisplay value={line.value} format={format} kind="line" />
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </>
              ) : (
                <div className="rf-paystub__static-row">
                  <span className="rf-paystub__static-label">{section.label}</span>
                  <ValueDisplay value={section.value} format={format} kind="header" />
                </div>
              )}
            </AccordionItem>
          );
        })}
      </Accordion>
      {action && <div className="rf-paystub__action">{action}</div>}
    </div>
  );
}

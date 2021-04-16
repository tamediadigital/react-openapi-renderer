import React from "react";
import { v4 as uuidv4 } from "uuid";

type AccordionProps = {
  items: {
    heading: any;
    content: any;
  }[];
};

export default function Accordion({ items }: AccordionProps) {
  return (
    <div className='accordion' id='accordion'>
      {items.map(({ heading, content }) => {
        const id = uuidv4();
        return (
          <div className='accordion-item' key={id}>
            <h2 className='accordion-header' id={id}>
              <button
                className='accordion-button collapsed'
                type='button'
                data-bs-toggle='collapse'
                data-bs-target={`#collapse${id}`}
                aria-expanded='true'
                aria-controls={`collapse${id}`}
              >
                {heading}
              </button>
            </h2>
            <div
              id={`collapse${id}`}
              className='accordion-collapse collapse'
              aria-labelledby={`heading${id}`}
              data-bs-parent='#accordion'
            >
              <div className='accordion-body'>{content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

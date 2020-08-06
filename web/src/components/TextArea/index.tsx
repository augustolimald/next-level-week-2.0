import React, { TextareaHTMLAttributes } from 'react';

import './styles.css';

interface ITextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
}

const TextArea: React.FC<ITextAreaProps> = ({ label, name, ...rest }) => {
  return (
    <div className="textarea-block">
      <label htmlFor={ name }>{ label }</label>
      <textarea id={ name } { ...rest }></textarea>
    </div>
  );
}

export default TextArea;

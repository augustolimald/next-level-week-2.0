import React from 'react';
import { Link } from 'react-router-dom';

import logoImage from '../../assets/images/logo.svg';
import backImage from '../../assets/images/icons/back.svg';
import './styles.css';

interface IPageHeaderProps {
  title: string;
  description?: string;
}

const PageHeader: React.FC<IPageHeaderProps> = (props) => {
  return (
    <header className="page-header">
      <div className="top-bar-container">
        <Link to="/">
          <img src={ backImage } alt="Voltar"/>
        </Link>
        <img src={ logoImage } alt="Proffy"/>
      </div>

      <div className="header-content">
        <strong>{ props.title }</strong>

        { props.description && <p>{ props.description }</p> }

        { props.children }
      </div>
      
    </header>
  );
}

export default PageHeader;
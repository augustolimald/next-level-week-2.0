import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import logoImage from '../../assets/images/logo.svg';
import studyIcon from '../../assets/images/icons/study.svg';
import landingImage from '../../assets/images/landing.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

import "./styles.css";

function Landing() {
  const [connections, setConnections] = useState(0);

  useEffect(() => {
    api.get('/connections').then(response => {
      setConnections(response.data.total_connections);
    });
  }, []);

  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <img src={logoImage} alt="Logo"/>
          <h2>Sua Plataforma de Estudos Online</h2>
        </div>

        <img 
          src={landingImage}
          alt="Plataforma de Estudos"
          className="hero-image"
        />

        <div className="buttons-container">
          <Link to="/study" className="study">
            <img src={studyIcon} alt="Estudar"/>
            Estudar
          </Link>

          <Link to="/give-classes" className="give-classes">
            <img src={giveClassesIcon} alt="Dar Aulas"/>
            Dar Aulas
          </Link>
        </div>

        <span className="total-connections">
          Total de { connections } conexões já realizadas <img src={purpleHeartIcon} alt="Coração roxo"/>
        </span>
      </div>
    </div>
  );
}

export default Landing;
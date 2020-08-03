import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import './styles.css';

function TeacherItem() {
  return (
    <article className="teacher-item">
      <header>
        <img
          src="https://avatars1.githubusercontent.com/u/31486585?s=460&u=315d5672f1ac480fbd13f24d034c90323895d082&v=4"
          alt="Augusto Lima">
        </img>
        <div>
          <strong>Augusto Lima</strong>
          <span>Introdução a Banco de Dados</span>
        </div>
      </header>

      <p>
      jasdjaskdjaskjdkasjkdjaksjdkasjkdjaskdjkasjdka
      bdasjdhasdjkasjdkjaskdjkasjdkasjdkjaskdjkasjdk  
      </p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ 100,00</strong>
        </p>
        <button>
          <img src={whatsappIcon} alt="Whatsapp"></img>
          Entrar em Contato
        </button>
      </footer>
    </article>
  );
}

export default TeacherItem;
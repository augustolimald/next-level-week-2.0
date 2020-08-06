import React from 'react';

import api from '../../services/api';
import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

export interface ITeacher {
  id: number;
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
  subject: string;
  cost: number;
}

interface ITeacherItemProps {
  data: ITeacher;
}

const TeacherItem: React.FC<ITeacherItemProps> = (props) => {
  function createNewConnection() {
    api.post('/connections', { user_id: props.data.id });
  }

  return (
    <article className="teacher-item">
      <header>
        <img src={props.data.avatar} alt={props.data.name} />
        <div>
          <strong>{props.data.name}</strong>
          <span>{props.data.subject}</span>
        </div>
      </header>

      <p>{ props.data.bio }</p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ {props.data.cost}</strong>
        </p>
        <a 
          target="_blank"
          onClick={createNewConnection}
          href={`https://wa.me?${props.data.whatsapp}`}
        >
          <img src={whatsappIcon} alt="Whatsapp"></img>
          Entrar em Contato
        </a>
      </footer>
    </article>
  );
}

export default TeacherItem;
import { useHistory } from 'react-router-dom';
import React, { useState, FormEvent } from 'react';

import api from '../../services/api';
import Input from '../../components/Input';
import Select from '../../components/Select';
import TextArea from '../../components/TextArea';
import PageHeader from '../../components/PageHeader';
import warningIcon from '../../assets/images/icons/warning.svg';

import "./styles.css";

function TeacherForm() {
  const history = useHistory();

  /**
   * Data State
   */
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');
  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');
  
  /**
   * Schedule Item Handler
   */
  const [scheduleItems, setScheduleItems] = useState([{ weekday: 0, from: '', to: '' }]);
  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      { weekday: 0, from: '', to: '' }
    ]);
  }

  function setScheduleItemValue(position: number, field: string, value: string) {
    setScheduleItems(scheduleItems.map((item, index) => {
      if (index === position) {
        return { ...item, [field]: value };
      }
      return item;
    }))
  }

  /**
   * Integration to API
   */
  function handleCreateClass(e: FormEvent) {
    e.preventDefault();
    api.post('/classes', {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule: scheduleItems,
    }).then(() => {
      alert('Cadastro realizado com sucesso');
      history.push('/');
    }).catch(() => {
      alert('Ocorreu um erro no banco de dados');
    });
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader 
        title="Que incrível que você quer dar aulas"
        description="O primeiro passo é preencher esse formulário de inscrição"  
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus Dados</legend>
            <Input 
              name="name"
              label="Nome Completo"
              value={name} 
              onChange={e => {setName(e.target.value)}}
            />
            <Input
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={e => {setAvatar(e.target.value)}}
            />
            <Input
              name="whatsapp"
              label="Whatsapp"
              value={whatsapp}
              onChange={e => {setWhatsapp(e.target.value)}}
            />
            <TextArea
              name="bio"
              label="Biografia"
              value={bio} 
              onChange={e => {setBio(e.target.value)}}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a Aula</legend>
            <Select
              name="subject"
              label="Matéria"
              value={ subject }
              onChange={e => setSubject(e.target.value)}
              options={[
                { value: 'Artes', label: 'Artes' },
                { value: 'Biologia', label: 'Biologia' },
                { value: 'Ciências', label: 'Ciências' },
                { value: 'Educação Física', label: 'Educação Física' },
                { value: 'Química', label: 'Química' },
                { value: 'Português', label: 'Português' },
                { value: 'Matemática', label: 'Matemática' },
              ]}
            />
            <Input
              name="cost"
              label="Custo da sua hora por aula" 
              value={ cost }
              onChange={e => setCost(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários Disponíveis
              <button type="button" onClick={ addNewScheduleItem }>+ Novo Horário</button>
            </legend>
            
            { scheduleItems.map((item, index) => {
              return (
                <div key={ item.weekday } className="schedule-item">
                  <Select
                    name="weekday"
                    label="Dia da Semana"
                    value={scheduleItems[index].weekday}
                    onChange={e => setScheduleItemValue(index, 'weekday', e.target.value)}
                    options={[
                      { value: '0', label: 'Domingo' },
                      { value: '1', label: 'Segunda-feira' },
                      { value: '2', label: 'Terça-feira' },
                      { value: '3', label: 'Quarta-feira' },
                      { value: '4', label: 'Quinta-feira' },
                      { value: '5', label: 'Sexta-feira' },
                      { value: '6', label: 'Sábado' },
                    ]}
                  />
                  <Input
                    type="time"
                    name="from"
                    label="Das"
                    value={scheduleItems[index].from}
                    onChange={e => setScheduleItemValue(index, 'from', e.target.value)} 
                  />
                  <Input
                    type="time"
                    name="to"
                    label="Até"
                    value={scheduleItems[index].to}
                    onChange={e => setScheduleItemValue(index, 'to', e.target.value)} 
                  />
                </div>
              )
            }) }
          </fieldset>
          
          <footer>
            <p>
              <img src={ warningIcon } alt="Aviso importante" />
              Importante<br />
              Preencha todos os dados
            </p>

            <button type="submit">Salvar Cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default TeacherForm;
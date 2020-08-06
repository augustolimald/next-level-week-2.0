import React, { useState, FormEvent } from 'react';

import api from '../../services/api';
import Input from '../../components/Input';
import Select from '../../components/Select';
import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import { ITeacher } from '../../components/TeacherItem';

import "./styles.css";

function TeacherList() {
  const [subject, setSubject] = useState('');
  const [weekday, setWeekday] = useState('');
  const [time, setTime] = useState('');
  const [teachers, setTeachers] = useState([]);

  function searchTeachers(e: FormEvent) {
    e.preventDefault();

    api
      .get('/classes', { params: { subject, weekday, time }})
      .then(response => { setTeachers(response.data) });
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Esses são os proffys disponíveis">
        <form id="search-teachers" onSubmit={searchTeachers}>
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
          <Select
            name="weekday"
            label="Dia da Semana"
            value={ weekday }
            onChange={e => setWeekday(e.target.value)}
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
            name="time"
            label="Hora"
            value={ time }
            onChange={e => setTime(e.target.value)}
          />

          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <main>
        { 
          teachers.map((teacher: ITeacher) => <TeacherItem key={teacher.id} data={ teacher } />) 
        }
      </main>
    </div>
  );
}

export default TeacherList;
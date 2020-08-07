import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Text, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { ScrollView, BorderlessButton, RectButton } from 'react-native-gesture-handler';

import styles from './styles';
import api from '../../services/api';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { ITeacher } from '../../components/TeacherItem';

function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [filtersVisible, setFiltersVisible] = useState(false);
  
  const [subject, setSubject] = useState('');
  const [weekday, setWeekday] = useState('');
  const [time, setTime] = useState('');

  async function loadFavorites() {
    return AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        setFavorites(JSON.parse(response).map((teacher: ITeacher) => teacher.id));
      }
    })
  }

  function changeFilterVisibility() {
    setFiltersVisible(!filtersVisible);
  }

  function handleSeachTeachers() {
    loadFavorites()
      .then(() => 
        api
          .get('/classes', { params: { subject, weekday, time }})
          .then(response => { setTeachers(response.data) })
      );
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys disponíveis"
        headerRight={(
          <BorderlessButton onPress={changeFilterVisibility}>
            <Feather name="filter" size={20} color="#FFF" />
          </BorderlessButton>
        )}
      >
        { filtersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              style={styles.input}
              placeholder="Qual a matéria?"
              placeholderTextColor="#c1bccc"
              value={subject}
              onChangeText={setSubject}
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Qual a dia?"
                  placeholderTextColor="#c1bccc"
                  value={weekday}
                  onChangeText={setWeekday}
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Qual o horário?"
                  placeholderTextColor="#c1bccc"
                  value={time}
                  onChangeText={setTime}
                />
              </View>
            </View>

            <RectButton style={styles.submitButton} onPress={handleSeachTeachers}>
              <Text style={styles.submitButtonText}>Pesquisar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
      >
        { 
          teachers.map((teacher: ITeacher) => 
            <TeacherItem 
              key={teacher.id}
              data={teacher}
              favorited={favorites.includes(teacher.id)}
            />
          )
        }
      </ScrollView>
    </View>
  );
}

export default TeacherList;
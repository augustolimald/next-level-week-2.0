import React, { useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { ITeacher } from '../../components/TeacherItem';

function Favorites() {
  const [teachers, setTeachers] = useState<ITeacher[]>([]);

  useFocusEffect(() => {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        setTeachers(JSON.parse(response));
      }
    })
  });

  return (
    <View style={styles.container}>
      <PageHeader title="Meus proffys favoritos"></PageHeader>
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
      >
        { 
          teachers.map((teacher: ITeacher) => 
            <TeacherItem 
              key={teacher.id}
              data={teacher}
              favorited={true}
            />
          )
        }
      </ScrollView>
    </View>
  );
}

export default Favorites;
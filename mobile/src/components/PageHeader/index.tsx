import React, { ReactNode } from 'react';
import { View, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BorderlessButton } from 'react-native-gesture-handler';

import logoImg from '../../assets/images/logo.png';
import backIcon from '../../assets/images/icons/back.png';

import styles from './styles';

interface IPageHeaderProps {
  title: string;
  headerRight?: ReactNode;
}

const PageHeader: React.FC<IPageHeaderProps> = (props) => {
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.navigate('Landing');
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <BorderlessButton onPress={handleGoBack}>
          <Image source={backIcon} resizeMode="contain"/>
        </BorderlessButton>

        <Image source={logoImg} resizeMode="contain"/>
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>{props.title}</Text>
        {props.headerRight}
      </View>

      {props.children}
    </View>
  );
}

export default PageHeader;
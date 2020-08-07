import React, { useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import heartIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import styles from './styles';
import api from '../../services/api';

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
  favorited: boolean;
}

const TeacherItem: React.FC<ITeacherItemProps> = ({ data, favorited }) => {
  const [isFavorited, setIsFavorited] = useState(favorited);
  
  function linkToWhatsapp() {
    api.post('/connections', { user_id: data.id });
    Linking.openURL(`whatsapp://send?phone=${data.whatsapp}`);
  }

  async function handleToggleFavorite() {
    const favorites = [];

    const savedFavorites = await AsyncStorage.getItem('favorites');
    if (savedFavorites) {
      favorites.push(...JSON.parse(savedFavorites));
    }
    
    if (isFavorited) {
      const favoriteIndex = favorites.findIndex(fav => fav.id === data.id);
      if (favoriteIndex !== -1) {  
        favorites.splice(favoriteIndex, 1);
        await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
      }

      setIsFavorited(false);
    } else {
      favorites.push(data);
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
      
      setIsFavorited(true);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          style={styles.avatar}
          source={{ uri: data.avatar }}
        />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.subject}>{data.subject}</Text>
        </View>
      </View>

      <Text style={styles.bio}>
        {data.bio}
      </Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora {'  '}
          <Text style={styles.priceValue}>R$ {data.cost}</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton
            style={[
              styles.favoriteButton, 
              isFavorited ? styles.favorited : {}
            ]} 
            onPress={handleToggleFavorite}
          >
            { favorited
              ? <Image source = {unfavoriteIcon} />
              : <Image source = {heartIcon} />
            }
          </RectButton>

          <RectButton style={styles.contactButton} onPress={linkToWhatsapp}>
            <Image source = {whatsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em Contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
}

export default TeacherItem;

import React, {useState} from 'react';
import styled from 'styled-components/native';
import {ActivityIndicator, FlatList} from 'react-native';
import PostCard from '../../components/PostCard';
import {StackNavigationProp} from '@react-navigation/stack';
import {HomeParamsList} from '../../navigations/Types';
//HTTP
import {useQuery} from 'react-query';
import {Article} from '../../apis/model/data';
import apiClient from '../../apis/service/client';
// import {getArticles} from '../../apis/service/client';

const SafeContainer = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.color.bg};
`;

export interface HomeProps {
  navigation: StackNavigationProp<HomeParamsList, 'HomeView'>;
}

export const getArticles = async () => {
  const response = await apiClient.get<Article[]>('/articles');
  return response.data;
};

const HomeView: React.FC<HomeProps> = () => {
  const {data, isLoading} = useQuery('articles', getArticles);
  const [refresh, setRefresh] = useState<boolean>(false);

  console.log({data, isLoading});

  if (!data) {
    return <ActivityIndicator size="large" style={{flex: 1}} />;
  }

  const wait = (timeout: number) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const refreshing = () => {
    setRefresh(true);
    wait(1400).then(() => setRefresh(false));
    getArticles();
  };

  return (
    <SafeContainer>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <PostCard
            id={item.id}
            name={item.name}
            title={item.title}
            postTime={item.postTime}
            url={item.url}
            thumbnailUrl={item.thumbnailUrl}
            // navigation={navigation}
          />
        )}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        onRefresh={() => refreshing()}
        refreshing={refresh}
      />
    </SafeContainer>
  );
};

export default HomeView;


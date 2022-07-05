import * as React from 'react';
import styled from 'styled-components';

import { H1, Pre, Style, ListChannels, Container } from '@components';
import { gankListStore, useStore } from '@stores';
import { Channel } from '@utils';

const users = 'Taltera, KAAIM, akalimara, Taltera, BauruGG, edz_jujuba, IsaFoxys, tiaguerafps, dzn011, cozacz, tehz1nha, tauevc, portugamax, marcol0pes, majindjx, Mavizinha_s2, ViniOMochilinha, ThaayMarqs, haruxit, sdSuhh, jenninhachan, lueartesanato, cristinaaw, Stagee_, AntonioJogaOficial, FifaTeca66, tiemiau, leonardofz_, camiscardoso, joel0ko, zard0_, Girovanni, DVKing_, beatrizbottino, vitorcaffe, mouusi, itgoldfish, truematu, leitedomsn, mayp19, se_aysha, wmj10, toddyhs';

type HomePageType = React.FC & {
  Main: React.FC;
};

const Button = styled.button`
  background-color: #323234;
  border: none;
  color: #efeff1;
  font-family: Inter, Roobert, "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  font-weight: 600;
  border-radius: 4px;
  margin: auto;
  line-height: 19.5px;
  padding: 5px 8px;
  display: block;

  &:hover {
    background-color: #3e3e40;
  }
`;

export const HomePage: HomePageType = () => {
  useStore(gankListStore);

  const refresh = React.useCallback(() => {
    gankListStore.setChannels(users.split(',').map(user => user.trim()));
  }, []);
  React.useEffect(() => {
    refresh();
  }, []);

  return (
    <HomePage.Main>
      <Container>
        <H1>Gank list</H1>
        <Button onClick={refresh} disabled={gankListStore.state.loading}>
          Refresh
        </Button>
        {!gankListStore.state.loading && (
          <>
            <ListChannels channels={gankListStore.getOnlineChannels()} />
            <ListChannels channels={gankListStore.getOfflineChannels()} />
          </>
        )}
      </Container>
    </HomePage.Main>
  );
}

HomePage.Main = styled.main`
  background-color: ${() => Style.color.body.background};
  overflow: hidden;
`;

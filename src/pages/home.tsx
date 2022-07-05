import * as React from 'react';
import styled from 'styled-components';

import { H1, Style, ListChannels, Container, Button } from '@components';
import { gankListStore, useStore } from '@stores';

const users = 'Gaules, Taltera, KAAIM, akalimara, Taltera, BauruGG, edz_jujuba, IsaFoxys, tiaguerafps, dzn011, cozacz, tehz1nha, tauevc, portugamax, marcol0pes, majindjx, Mavizinha_s2, ViniOMochilinha, ThaayMarqs, haruxit, sdSuhh, jenninhachan, lueartesanato, cristinaaw, Stagee_, AntonioJogaOficial, FifaTeca66, tiemiau, leonardofz_, camiscardoso, joel0ko, zard0_, Girovanni, DVKing_, beatrizbottino, vitorcaffe, mouusi, itgoldfish, truematu, leitedomsn, mayp19, se_aysha, wmj10, toddyhs';

const Main = styled.main`
  background-color: ${() => Style.color.body.background};
  overflow: hidden;
  height: 100%;
`;

export const HomePage: React.FC = () => {
  useStore(gankListStore);

  const refresh = React.useCallback(() => {
    gankListStore.setChannels(users.split(',').map(user => user.trim()));
  }, []);
  React.useEffect(() => {
    refresh();
  }, []);

  return (
    <Main>
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
    </Main>
  );
}

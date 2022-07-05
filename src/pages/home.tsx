import * as React from 'react';

import { H1, Style, ListChannels, Container, Button, HSpace, VSpace } from '@components';
import { gankListStore, useStore } from '@stores';
import styled from 'styled-components';

const users = 'Gaules, Taltera, KAAIM, akalimara, Taltera, BauruGG, edz_jujuba, IsaFoxys, tiaguerafps, dzn011, cozacz, tehz1nha, tauevc, portugamax, marcol0pes, majindjx, Mavizinha_s2, ViniOMochilinha, ThaayMarqs, haruxit, sdSuhh, jenninhachan, lueartesanato, cristinaaw, Stagee_, AntonioJogaOficial, FifaTeca66, tiemiau, leonardofz_, camiscardoso, joel0ko, zard0_, Girovanni, DVKing_, beatrizbottino, vitorcaffe, mouusi, itgoldfish, truematu, leitedomsn, mayp19, se_aysha, wmj10, toddyhs';

const ActionsContainer = styled.div`
  display: flex;
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
    <main>
      <Container>
        <H1>Gank list</H1>
        <VSpace />
        <ActionsContainer>
          <HSpace />
          <Button onClick={refresh} disabled={gankListStore.state.loading}>
            Refresh
          </Button>
          <HSpace />
          <Button disabled={gankListStore.state.loading}>
            Save
          </Button>
          <HSpace />
        </ActionsContainer>
        <VSpace />
        {!gankListStore.state.loading && (
          <>
            <ListChannels channels={gankListStore.getNotFoundChannels()} />
            <ListChannels channels={gankListStore.getOnlineChannels()} />
            <ListChannels channels={gankListStore.getOfflineChannels()} />
          </>
        )}
      </Container>
    </main>
  );
}

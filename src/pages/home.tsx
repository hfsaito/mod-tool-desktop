import * as React from 'react';
import styled from 'styled-components';

import { twitch } from 'apis';
import { H1, Pre, Style, TwitchListChannels } from 'components';
import { TwitchChannel } from 'utils/twitch-types';

const gankList = 'Taltera, KAAIM, akalimara, Taltera, BauruGG, edz_jujuba, IsaFoxys, tiaguerafps, dzn011, cozacz, tehz1nha, tauevc, portugamax, marcol0pes, majindjx, Mavizinha_s2, ViniOMochilinha, ThaayMarqs, haruxit, sdSuhh, jenninhachan, lueartesanato, cristinaaw, Stagee_, AntonioJogaOficial, FifaTeca66, tiemiau, leonardofz_, camiscardoso, joel0ko, zard0_, Girovanni, DVKing_, beatrizbottino, vitorcaffe, mouusi, itgoldfish, truematu, leitedomsn, mayp19, se_aysha, wmj10, toddyhs';

type HomePageType = React.FC & {
  Main: React.FC;
};

export const HomePage: HomePageType = () => {
  const [channels, setChannels] = React.useState<TwitchChannel[]>([]);

  React.useEffect(() => {
    (async () => {
      const responses = await Promise.all(
        gankList
          .split(',')
          .map(user => user.trim())
          .map(user => twitch.search.channels({ query: user, first: 1 }))
      );
      const _channelStatus = responses.map(response => ({ channel: response.data[0].display_name, isLive: response.data[0].is_live }));
      setChannels([]);
    })();
  }, []);

  return (
    <HomePage.Main>
      <H1>Gank list</H1>
      <TwitchListChannels channels={channels} />
    </HomePage.Main>
  );
}

HomePage.Main = styled.main`
  background-color: ${() => Style.color.body.background};
  overflow: hidden;
`;

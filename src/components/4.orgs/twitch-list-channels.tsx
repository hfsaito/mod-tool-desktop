import * as React from "react";
import styled from "styled-components";

import { TwitchListChannelItem } from "components/3.compounds";
import { TwitchChannel } from "utils/twitch-types";

type TwitchListChannelsProps = { channels: TwitchChannel[] };

type TwitchListChannelsType = React.FC<TwitchListChannelsProps> & {
  Container: React.FC;
};

export const TwitchListChannels: TwitchListChannelsType = ({ channels }) => (
  <>
    {channels.map(channel => <TwitchListChannelItem channel={channel}/> )}
  </>
);

TwitchListChannels.Container = styled.div`
`;

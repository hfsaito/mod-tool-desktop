import * as React from "react";
import styled from "styled-components";

import { ListChannelItem } from "../../components/3.compounds";
import { Channel } from "../../utils";

type ListChannelsProps = { channels: Channel[] };

type ListChannelsType = React.FC<ListChannelsProps> & {
  Container: React.FC;
};

export const ListChannels: ListChannelsType = ({ channels }) => {
  console.log('Render ListChannels');
  
  return (
    <>
      {channels.map(channel => <ListChannelItem key={channel.name} channel={channel}/> )}
    </>
  );
};

ListChannels.Container = styled.div`
`;

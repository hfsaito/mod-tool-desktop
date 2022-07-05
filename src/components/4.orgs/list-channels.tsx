import * as React from "react";
import styled from "styled-components";

import { ListChannelItem } from "@components/3.compounds";
import { Channel } from "@utils";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

type ListChannelsProps = { channels: Channel[] };

export const ListChannels: React.FC<ListChannelsProps> = ({ channels }) => {
  return (
    <Container>
      {channels.map((channel, index) => <ListChannelItem key={index} channel={channel} index={index} /> )}
    </Container>
  );
};


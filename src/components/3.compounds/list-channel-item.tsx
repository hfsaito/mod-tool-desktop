import * as React from "react";
import styled, { css } from "styled-components";

import { Button, HSpace } from "@components/2.mols";
import { Channel, displayNumber } from "@utils";
import { gankListStore, useStore } from "@stores";


const Container = styled.div<{status: Channel['status']}>`
  display: flex;
  order: ${({ status }) => ({
    'not-found': 1,
    online: 2,
    offline: 3
  }[status])};
`;
const ContainerChannel = styled.a`
  display: flex;
  padding: 5px 10px;
  width: 240px;
  box-sizing: border-box;
  text-decoration: none;
  &:link {
    text-decoration: none;
  }
  &:visited {
    text-decoration: none;
  }
  &:hover {
    text-decoration: none;
    background-color: #26262c;
  }
  &:active {
    text-decoration: none;
  }
`;
const ContainerChannelInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: calc(100% - 30px);
`;
const ContainerChannelNameGame = styled.div`
  margin-left: 10px;
  overflow: hidden;
`;
const ContainerDetails = styled.div`
  display: flex;
  align-items: center;
`;
const ContainerActions = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.img<{status: Channel['status']}>`
  width: 30px;
  height: 30px;
  border-radius: 9999px;
  ${({ status }) => status !== 'online' && css`
    filter: grayscale(100%) contrast(85%);
    opacity: .8;
  `}
`;
const Name = styled.p`
  font-family: Inter, Roobert, "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #dedee3;
  line-height: 1.2;
  margin: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
const Game = styled.p`
  font-family: Inter, Roobert, "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  font-weight: 400;
  color: #adadb8;
  line-height: 1.2;
  margin: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
const Status = styled.div`
  background-color: #eb0400;
  border-radius: 9999px;
  width: 8px;
  height: 8px;
  display: inline-block;
  position: relative;
`;
const Detail = styled.p`
  font-family: Inter, Roobert, "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  font-weight: 400;
  color: #dedee3;
  line-height: 19.5px;
  margin: 0;
  margin-left: 5px;
`;


interface ListChannelItemProps {
  channel: Channel;
  index: number;
}

export const ListChannelItem: React.FC<ListChannelItemProps> = ({ channel, index }) => {
  useStore(gankListStore);

  const detail = {
    'not-found': 'Not found',
    offline: 'Offline',
    online: displayNumber(channel.viewCount ?? 0)
  }[channel.status];
  
  const remove = React.useCallback(() => gankListStore.removeChannel(index), [index]);

  return (
    <Container status={channel.status}>
      <ContainerChannel href={`https://twitch.tv/${channel.name}`} target='_blank'>
        <Avatar src={channel.avatar} status={channel.status} />
        <ContainerChannelInfo>
          <ContainerChannelNameGame>
            <Name>
              {channel.name}
            </Name>
            <Game>
              {channel.game}
            </Game>
          </ContainerChannelNameGame>
          <div>
            <ContainerDetails>
              {channel.status === 'online' && <Status />}
              <Detail>{detail}</Detail>
            </ContainerDetails>
          </div>
        </ContainerChannelInfo>
      </ContainerChannel>
      <ContainerActions>
        <HSpace />
        <Button onClick={remove}>
          Remove
        </Button>
        <HSpace />
        {channel.status === 'online' && (
          <>
            <Button color='primary'>
              Copy "/raid {channel.name}"
            </Button>
            <HSpace />
          </>
        )}
      </ContainerActions>
    </Container>
  );
}

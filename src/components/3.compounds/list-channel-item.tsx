import * as React from "react";

import { P } from "../2.mols";
import { Channel } from "../../utils";
import styled, { css } from "styled-components";

interface ListChannelItemProps {
  channel: Channel;
}

const Container = styled.a`
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
const Container2 = styled.div`
  display: flex;
  width: 100%;
`;
const Container3 = styled.div`
  margin-left: 10px;
  overflow: hidden;
  width: 100%;
`;
const Container4 = styled.div``;
const Container5 = styled.div`
  display: flex;
  align-items: center;
`;
const Avatar = styled.img<{isLive: boolean}>`
  width: 30px;
  height: 30px;
  border-radius: 9999px;
  ${({ isLive }) => !isLive && css`
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
`;
const Game = styled.p`
  font-family: Inter, Roobert, "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  font-weight: 400;
  color: #adadb8;
  line-height: 1.2;
  margin: 0;
`;
const Status = styled.div`
  background-color: #eb0400;
  border-radius: 9999px;
  width: 8px;
  height: 8px;
  display: inline-block;
  position: relative;
`;
const ViewCount = styled.p`
  font-family: Inter, Roobert, "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  font-weight: 400;
  color: #dedee3;
  line-height: 19.5px;
  margin: 0;
  margin-left: 5px;
`;
const Offline = styled.p`
  font-family: Inter, Roobert, "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  font-weight: 400;
  color: #dedee3;
  line-height: 19.5px;
  margin: 0;
  margin-left: 5px;
`;
const Container6 = styled.div`
  display: flex;
`;

const Button = styled.button`
  background-color: #323234;
  border: none;
  color: #efeff1;
  font-family: Inter, Roobert, "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  font-weight: 600;
  border-radius: 4px;
  margin: auto 0;
  margin-left: auto;
  line-height: 19.5px;
  padding: 5px 8px;

  &:hover {
    background-color: #3e3e40;
  }
`;

export const ListChannelItem: React.FC<ListChannelItemProps> = ({ channel }) => {
  return (
    <Container6>
      <Container href={`https://twitch.tv/${channel.name}`} target='_blank'>
        <Avatar src={channel.avatar} isLive={channel.isLive} />
        <Container2>
          <Container3>
            <Name>
              {channel.name}
            </Name>
            <Game>
              {channel.game}
            </Game>
          </Container3>
          <Container4>
            <Container5>
              {channel.isLive ? (
                <>
                  <Status />
                  <ViewCount>
                    {channel.viewCount}
                  </ViewCount>
                </>
              ) : (
                <Offline>
                  Offilne
                </Offline>
              )}
            </Container5>
          </Container4>
        </Container2>
      </Container>
      {channel.isLive && (
        <Button>
          Raid
        </Button>
      )}
    </Container6>
  );
}
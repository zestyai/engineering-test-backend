import React from 'react';
import styled, { css } from 'styled-components';
import { PropertyDisplayItem } from '../../models/Property';
import { RiskLevel } from '../../models/Risk';

const Container = styled.div`
  display: flex;
  margin: 35px 0;
`;

const ImageWrapper = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #eee;
`;

const Image = styled.img`
  display: block;
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

const Content = styled.div`
  display: flex;
  height: 100px;
  padding: 18px 0;
  box-sizing: border-box;
`;

const LeftColumn = styled.div`
  padding-left: 40px;
  width: 280px;
`;

const NameLabel = styled.div`
  font-size: 22px;
  margin-bottom: 7px;
`;

const Label = styled.div`
  font-family: 'Futura LT', sans-serif;
  text-transform: uppercase;
  font-size: 11px;
  letter-spacing: 0.5px;
`;

const CoordinatesLabel = styled(Label)`
  line-height: 17px;
  color: #ea5a46;
`;

const RiskLevelContainer = styled.div`
  width: 150px;
  padding: 0 30px;
  text-align: center;
`;

const RiskLevelLabel = styled(Label)`
  margin-top: 2px;
`;

const RiskLevelValue = styled(Label)`
  color: #ea5a46;
  line-height: 25px;
`;

const RiskLevelIcons = styled.div`
  margin-top: -4px;
  text-align: center;
  font-size: 20px;
`;

const FavoriteContainer = styled.div<{ isFavorite: boolean }>`
  padding: 3px 0;
  cursor: pointer;
  transition: filter 200ms;

  ${(props) =>
    !props.isFavorite &&
    css`
      filter: grayscale(1) opacity(0.3);

      &:hover {
        filter: grayscale(0) opacity(1);
      }
    `}
`;

const FavoriteIcon = styled.div`
  display: inline-block;
  width: 100%;
  margin-left: -1px;
  height: 43px;
  text-align: center;
  font-size: 32px;
`;

const FavoriteLabel = styled(Label)``;

type Props = {
  property: PropertyDisplayItem;
};

export const PropertiesListItem = (props: Props) => {
  const { name, latitude, longitude, overlayImageUrl, riskLevel, isFavorite } = props.property;
  return (
    <Container>
      <ImageWrapper>
        <Image src={overlayImageUrl} alt='Property' />
      </ImageWrapper>
      <Content>
        <LeftColumn>
          <NameLabel>{name}</NameLabel>
          <CoordinatesLabel>{`Latitude: ${latitude}°`}</CoordinatesLabel>
          <CoordinatesLabel>{`Longitude: ${longitude}°`}</CoordinatesLabel>
        </LeftColumn>
        <RiskLevelContainer>
          <RiskLevelLabel>Risk level</RiskLevelLabel>
          <RiskLevelValue>{riskLevel}</RiskLevelValue>
          <RiskLevelIcons>{riskLevelEmojis(riskLevel)}</RiskLevelIcons>
        </RiskLevelContainer>
        <FavoriteContainer isFavorite={isFavorite}>
          <FavoriteIcon>
            <span role='img' aria-label='Favorite'>
              ⭐
            </span>
          </FavoriteIcon>
          <FavoriteLabel>Favorite</FavoriteLabel>
        </FavoriteContainer>
      </Content>
    </Container>
  );
};

export function riskLevelEmojis(riskLevel: RiskLevel): string {
  switch (riskLevel) {
    case RiskLevel.mild:
      return '🌶';
    case RiskLevel.spicy:
      return '🌶 🌶';
    case RiskLevel.hot:
      return '🌶 🌶 🌶';
  }
}

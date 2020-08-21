import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: inline-block;
  width: 130px;
  margin: 0 15px;

  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
`;

const Label = styled.label`
  display: block;
  width: 100%;
  text-align: center;
  margin-bottom: 10px;
  font-size: 14px;
`;

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  border: 2px solid black;
  outline: none;
  display: inline-block;
  vertical-align: middle;
  background: none;
  appearance: none;
  border-radius: 7px;
  padding: 10px;
  margin: 0;
  font-family: 'Circular Std', sans-serif;
  text-align: center;
`;

export enum FieldType {
  coordinate = 'coordinate',
  distance = 'distance',
}

type Props = {
  id: string;
  fieldType: FieldType;
  label: string;
  value: number;
  onChange: (value: number) => void;
};

export const Field = (props: Props) => {
  const { id, fieldType, label, value, onChange } = props;
  return (
    <Container>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type='number'
        value={value}
        min={fieldType === FieldType.coordinate ? -180 : 0}
        max={fieldType === FieldType.coordinate ? 180 : 1000000}
        step={fieldType === FieldType.coordinate ? 0.0001 : 1000}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(parseFloat(event.target.value))}
      />
    </Container>
  );
};

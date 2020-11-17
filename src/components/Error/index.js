import React from 'react';
import { IslandWrapper } from '../shared/IslandWrapper';

export default function Error({ statusCode }) {
  return (
    <IslandWrapper>
      <h1>에러 {statusCode}</h1>
    </IslandWrapper>
  );
}

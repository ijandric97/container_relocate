import React from 'react';
import { useGlobalState } from '../../../state/GlobalState';

import Container from '../Container/Container';

import './ContainerGrid.css';

const ContainerGrid: React.FC<any> = () => {
  const {
    state: { problem }
  } = useGlobalState();

  console.log(problem);

  return (
    <div className="containers">
      <Container />
    </div>
  );
};

export default ContainerGrid;

import styled from '@emotion/styled';

import TopNavigation from './top-navigation';

export default function Header() {

  return (
    <Wrapper>
      <TopNavigation />
    </Wrapper>
  );
}

const Wrapper = styled.header`
  height: 109px;
  background-color: #FFFFFF;
  border-bottom: 1px solid #E5E5E5;
`;

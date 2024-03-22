import styled from '@emotion/styled';
import { Outlet, useLoaderData } from '@remix-run/react';
import { RecoilRoot } from 'recoil';

import Header from './header';
import type { loader } from './server';
import SideNavigation from './side-navigation';

export { loader } from './server';
export {  shouldRevalidate } from './server';

export default function Default() {
  const {  pathSegment } = useLoaderData<typeof loader>();

  return (
    <RecoilRoot
      initializeState={({ set }) => {

      }}
    >
      <Wrapper>
        <SideNavigationWrapper>
          <SideNavigation pathSegment={pathSegment} />
        </SideNavigationWrapper>
        <MainWrapper>
          <Header />
          <Main className="main">
            <Outlet />
          </Main>
        </MainWrapper>
      </Wrapper>
    </RecoilRoot>
  );
}

const Wrapper = styled.div`
  display: flex;
`;

const MainWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
`;

const Main = styled.main`
  min-height: 100vh;
  background-color: white;
`;

const SideNavigationWrapper = styled.div`
  display: flex;
  flex: 0 0 auto;
  min-height: 100%;
  width: 256px;
  border-right: 1px solid #E5E5E5;
`;

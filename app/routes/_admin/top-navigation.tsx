import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useLocation } from '@remix-run/react';

export default function TopNavigation() {
  const location = useLocation();

  let title;

  switch (location.pathname) {
    case '/':
      title = 'Main';
      break;
    case '/user-status':
      title = '유저 관리 / 유저 현황';
      break;
    case '/user-search':
      title = '유저 관리 / 유저 검색';
      break;
    case '/user-withdraw':
      title = '유저 관리 / 탈퇴 유저';
      break;

    default:
      title = 'Main';
  }
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Box display="flex">
        {/* {
          user === undefined
            ? (
              <Link to="/login">
                <Button colorScheme="blue">로그인</Button>
              </Link>
            )
            : (
              <Menu>
                <MenuButton
                  as={Button}
                >
                  {user.name}
                  님
                </MenuButton>
                <MenuList>
                  <Link to="/password-change">
                    <MenuItem>비밀번호 변경</MenuItem>
                  </Link>
                  <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
                </MenuList>
              </Menu>
            )
        } */}
        {/* <Link to="/regist">
          <Button colorScheme="blue">회원가입</Button>
        </Link> */}
      </Box>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 1rem 1rem 1rem 0;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  font-family: Inter;
  font-size: 24px;
  font-weight: 700;
  margin-left: 1rem;
  color: #21272A;
`;

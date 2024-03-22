import {
  Box, Flex, Image,
  Link as ChakraLink, Text, VStack,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Link  } from '@remix-run/react';
import {  useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { expandedSectionsState, selectedMenuState } from '~/recoil/atoms';

export default function SideNavigation({ pathSegment } : any) {
  const [selectedMenu, setSelectedMenu] = useRecoilState<string>(selectedMenuState);

  const [expandedSections, setExpandedSections] = useRecoilState<any>(expandedSectionsState);

  // 사이드 네비게이션 메뉴 클릭 시
  const handleMenuClick = (menuName: string, isSubMenu: boolean = false) => {
    if (!expandedSections) {
      setSelectedMenu(menuName);
    }

    // 상위 메뉴 클릭 시에만 확장/축소 상태를 변경
    if (!isSubMenu) {
      setExpandedSections((prevSections: any[]) => {
        if (prevSections.includes(menuName)) {
          return prevSections.filter(section => section !== menuName);
        } else {
          return [...prevSections, menuName];
        }
      });
    }
  };

  // 사이드 네비게이션 메뉴
  const menuItems = [
    {
      name: '유저 관리',
      icon: '',
      isToggleable: true,
      subMenu: [
        { name: 'UserStatus', title: '유저 현황', path: '/user-status' },
        { name: 'UserSearch', title: '유저 검색', path: '/user-search' },
        { name: 'UserWithdraw', title: '탈퇴 유저', path: '/user-withdraw' },
      ],
    },
  ];

  // 현재 페이지에 맞는 사이드 네비게이션 메뉴 활성화
  useEffect(() => {
    const currentMenu = menuItems.find(item => item.name && pathSegment.includes(item.name));

    const currentSubMenu = menuItems.find(item =>
      item.subMenu && item.subMenu.find(subItem => pathSegment.includes(subItem.path)),
    );

    if (currentMenu) {
      setExpandedSections([currentMenu.name]);
      setSelectedMenu(currentMenu.name);
    } else if (currentSubMenu) {
      const parentMenu = menuItems.find(item => item.subMenu && item.subMenu.some(subItem => pathSegment.includes(subItem.path)));

      if (parentMenu) {
        setExpandedSections([parentMenu.name]);
      }
      const matchedSubItem = currentSubMenu.subMenu.find(subItem => pathSegment.includes(subItem.path));

      if (matchedSubItem) {
        setSelectedMenu(matchedSubItem.name);
      }
    }
  }, [pathSegment]);

  return (
    <Flex
      direction="column"
      width="100%"
      height="100%"

    >
      <Box
        alignItems="center"
        justifyContent="center"
        display="flex"
        height="108px"
        bg="black"
      >
        <ChakraLink
          as={Link}
          to="/"
        >
          <Image
            src="/images/test.png"
            alt="Logo"
            width="240px"
          />
        </ChakraLink>
      </Box>
      <VStack align="stretch">
        {menuItems.map(item => (
          <Box key={item.name}>
            <MenuList
              selected={selectedMenu === item.name || expandedSections.includes(item.name)}
              onClick={() => handleMenuClick(item.name)}
            >
              <Text ml="16px">{item.name}</Text>
            </MenuList>
            {item.subMenu && expandedSections.includes(item.name) && (
              <ToggleList expanded={expandedSections.includes(item.name)}>
                {item.subMenu.map(subItem => (
                  <ChakraLink
                    as={Link}
                    to={subItem.path}
                    key={subItem.name}
                  >
                    <MenuList
                      key={subItem.name}
                      onClick={() => handleMenuClick(subItem.name, true)}
                      selected={selectedMenu === subItem.name}
                    >
                      <Box ml="36px">
                        {subItem.title}
                      </Box>
                    </MenuList>
                  </ChakraLink>
                ))}
              </ToggleList>
            )}
          </Box>
        ))}
      </VStack>
    </Flex>
  );
}

const MenuList = styled(Flex)<{ selected: boolean }>`
  align-items: center;
  height: 48px;
  padding: 0 16px;
  background-color:  ${props => props.selected ? '#F2F4F8' : '#FFFFFF'};
  cursor: pointer;
`;

const ToggleList = styled(Text)<{ expanded: boolean }>`
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
  ${props => props.expanded && `
    max-height: 300px;
  `}
`;

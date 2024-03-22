# kdmp_admin_client
대리기사 앱 관리자 클라이언트

## 설치
로컬에 기본적으로 16버전 이상의 node.js가 설치되어 있어야합니다.
패키지 매니저로는 yarn 사용을 권장합니다.

yarn이 없는 경우 아래 커맨드로 전역 패키지로 설치
```bash
npm i -g yarn
```

패키지 설치하기
```bash
yarn
```

환경 변수를 설정합니다. 아래 커맨드로 .env.example을 복사하여 .env 파일을 복사하여 만들어 줍니다.
```bash
cp .env.example .env
```

.env를 개발 환경에 맞게 수정해줍니다.

## 실행 및 배포
### 개발 환경 실행
```bash
yarn dev
```


### 배포 전 빌드
```bash
yarn build
```

### 배포 앱 실행
참고: 배포(production) 환경에서 .env 파일의 환경 변수는 더 이상 불러오지 않으므로 환경 변수를 직접 생성해주어야 합니다.  

```bash
yarn start
```

## 프로젝트 구조
> 본 프로젝트는 react.js 기반의 remix 프레임워크를 사용합니다. 따라서 remix에서 사용되는 프레임워크 구조를 가지고 있습니다. 자세한 내용은 [remix](https://remix.run/docs/en/1.19.3) 문서를 참고하세요.

```
├── app                             | app 디렉토리
│   ├── common                      | 공통 모듈 디렉토리
│   │   ├── constants.ts            | 전역 상수
│   │   └── global.d.ts             | 전역 타입
│   ├── components                  | 컴포넌트 디렉토리
│   ├── entry.client.tsx            | 클라이언트 랜더링 모듈
│   ├── entry.server.tsx            | 서버 랜더링 모듈
│   ├── hooks                       | 커스텀 훅
│   ├── recoil                      | recoil 전역 상태관리
│   ├── root.tsx                    | 앱 루트 컴포넌트
│   ├── routes                      | 페이지별 라우트 컴포넌트
│   ├── services                    | 서버사이드 전용 서비스 로직
│   ├── styles                      | SCSS로 작성된 스타일은 자동 컴파일되어 이 곳에 CSS파일로 생성 됨
│   └── utils                       | 공통 유틸리티 로직(클라이언트 사이드, 서버 사이드 모두 사용)
├── public                          | public 디렉토리
│   ├── build                       | 빌드된 파일은 이곳에 생성 됨
│   └── favicon.ico                 | 파비콘
├── styles                          | .scss로 스타일 파일을 이곳에 작성
│   └── global.scss                 | 글로벌 스타일
├── .env.example                    | 환경변수 예제 파일
├── .eslintrc.cjs                   | eslint 설정 파일
├── .gitignore                      | git 커밋 무시 설정
├── package.json                    | package.json
├── postcss.config.js               | postcss 설정 파일
├── README.md
├── remix.config.js                 | remix 프레임워크 설정 파일
├── remix.env.d.ts
├── tsconfig.json                   | 타입스크립트 설정 파일
└── yarn.lock
```

## 개발 규칙
### CSS
전역으로 사용할 CSS는 ./styles 위치에 .scss 파일로 작성하여 추가합니다.
```scss
/* ./styles/styles.scss */
$font-stack: Pretendard Variable, sans-serif;
:root {
  font-family: $font-stack;
}
```

이후 scss 파일은 컴파일되어 ./app/styles/ 경로에 CSS 파일로 저장됩니다. 사용할 때는 이 CSS 파일을 [links](https://remix.run/docs/en/1.19.3/route/links)에 추가합니다.
```tsx
import styles from '~/styles/styles.css';

export const links: LinksFunction = () => [
  /* ... */
  { rel: 'stylesheet', href: styles },
  /* ... */
];
```

#### 사이즈 단위
디자인 시안에서 사이즈를 rem 단위를 확인할 수 있다면 rem 단위를 기본적으로 사용합니다. px을 사용할 수 밖에 없는 상황일 때는 px 단위를 사용합니다.

#### 동적 클래스 적용
2개 이상의 클래스나 동적으로 클래스를 적용하는 경우 [clsx](https://www.npmjs.com/package/clsx)를 활용하여 적용합니다.

#### 컴포넌트 스타일
리액트에서 화면을 개발하는 대부분의 경우, 컴포넌트를 기반으로 개발하게 되고 이 때 스타일 코드는 CSS in JS 형태의 [emotion](https://emotion.sh/docs/introduction)로 구현합니다.

다크 및 라이트 등의 테마를 적용하는 경우, color 및 background-color와 같은 컬러 값만 따로 클래스로 구현하여 적용합니다.

jsx 파일에서 emotion으로 작성된 코드가 리액트 컴포넌트보다 먼저 오지 않도록 합니다. 항상 리액트 컴포넌트 아래에 emotion으로 구현한 컴포넌트가 존재해야 합니다.

모든 컴포넌트 파일은 ./app/components 디렉토리 아래에 존재해야 합니다.

```tsx
const Component = () => <Wrapper className="component">content</Wrapper>;

const Wrapper = styled.div`
  display: flex;
`;
```

### form 양식과 useFetcher의 사용
웹 표준을 지향하는 remix 프레임워크는 최근 form 양식 처리에 사용되는 Ajax 통신과 application/json 포멧을 사용한 원격 데이터 처리 방식을 권장하지 않습니다. Ajax를 사용한 비동기 양식 처리는 SSR 구조의 방향과 어울리지 않습니다.

대신 원래 웹에서 사용되던 브라우저 고유의 form 태그와 submit 기능을 사용하는게 권장되며 데이터 포멧은 application/x-www-form-urlencoded를 기본 값으로 사용합니다. 본 프로젝트에서는 form 태그를 그대로 사용하지 않고 remix 프레임워크의 Form 컴포넌트를 사용합니다.

페이징 처리를 하지 않는 현재 페이지에서의 비동기 통신 처리를 하는 경우에는 fetch() 함수를 사용하는 것보다 remix의 [useFetcher](https://remix.run/docs/en/1.19.3/hooks/use-fetcher) 훅을 사용합니다. useFetcher로 API 사양에 따라 json 데이터 포멧으로 POST 요청하는 것도 가능합니다. 필수 사양은 아니므로 fetch()로 간단하게 처리하는게 효율적인 부분(예: [Optimistic UI 처리](https://tibetsandfox.tistory.com/35)와 같은 경우)은 fetch()를 사용하는 것도 허용합니다. loader와 action과 같은 서버사이드에서는 useFetcher 훅 사용을 할 수 없으므로 마찬가지로 fetch() 함수를 처리합니다.

remix에서의 form 양식 우효성 검증을 위해 [remix-validated-form](https://www.remix-validated-form.io/) 라이브러리의 form을 사용하는 것이 기본 원칙이고 유효성 검증식은 [yup](https://github.com/jquense/yup)을 사용하여 클라이언트 사이드와 서버 사이드 모두 같은 schema로 검증하도록 합니다.

### meta, loader, action
#### meta
[meta](https://remix.run/docs/en/1.19.3/route/meta-v2)의 경우 SEO가 중요한 경우가 아니라면 title을 제외하고는 크게 신경쓰지 않아도 됩니다. title의 경우 <라우트 이름> | <앱 이름>과 같은 형태로 작성해줍니다. 라우트 경로가 루트인 경우 앱 이름만 title에 표기합니다. meta는 레이아웃에서는 정의하지 않고 해당 페이지의 route 파일에서만 정의하도록 합니다.
```ts
// 루트 페이지
export const meta: V2_MetaFunction = () => {
  return [
    { title: 'Driver Admin' },
    {
      property: 'og:title',
      content: 'Driver Admin',
    },
    { name: 'description', content: 'Welcome to Driver Admin!' },
  ];
};

// 로그인 페이지
export const meta: V2_MetaFunction = () => {
  return [
    { title: 'Login | Driver Admin' },
    {
      property: 'og:title',
      content: 'Login | Driver Admin',
    },
    { name: 'description', content: 'Welcome to Driver Admin!' },
  ];
};
```

#### loader
초기 랜더링시, 랜더링 이후 데이터를 가져오면서 화면 깜빡임이나 계단식 랜더링 현상이 발생하는 것을 것을 방지하기 위해 화면 랜더링에 필요한 초기 데이터는 [loader](https://remix.run/docs/en/1.19.3/route/loader)에서 조회하여 가져오도록 합니다. 초기 랜더링때에 useEffect(() => ... ,[])과 같은 방법으로 마운트 되었을 때 API 호출하여 데이터를 받아오는 식은 지양하도록 합니다.
```tsx
export const loader = async ({ request }: LoaderArgs) => {
  const list = await getList(request);

  return json({
    list,
  });
};

export default function Component() {
  const { list } = useLoaderData<typeof loader>();

  return list.map((item) => <div>{item}</div>);
}
```

#### action

### 라우팅과 레이아웃
본 프로젝트에서는 [remix V2 컨벤션](https://remix.run/docs/en/1.19.3/pages/v2)을 모두 사용합니다.
```js
// remix.config.js
  future: {
    v2_dev: true,
    v2_errorBoundary: true,
    v2_headers: true,
    v2_meta: true,
    v2_normalizeFormMethod: true,
    v2_routeConvention: true,
  },
```

### 전역 상태(recoil)
[recoil](https://recoiljs.org/ko/) 전역 상태관리 파일은 ./app/recoil 디렉토리 아래에 생성합니다. state마다 파일 하나씩을 생성하기 보다는 연관된 state들을 하나의 파일에 export 하는 식으로 정리합니다.
```ts
export const userState = atom({
  key: 'userState',
  default: null,
});

export const userLevelState = atom({
  key: 'userLevelState',
  default: 0,
});
```

레이아웃마다 필요한 recoil 상태가 각각 다르기 때문에, <RecoilRoot>는 레이아웃별로 따로 선언해서 관리합니다.

### 날짜 포멧
day.js 사용

### ESLint

### Git 형상관리
Git 커밋 메세지는 기본적으로 [Angular Commit Conventions](https://gist.github.com/stephenparish/9941e89d80e2bc58a153)을 따릅니다.

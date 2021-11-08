# 📝 구깃

- (`구`글독스) 실시간 문서 공유 웹애플리케이션입니다.
- (`깃`) 버전 관리가 가능합니다.

### 🎬 시연 GIF

![preview](/README.assets/preview.gif)

### 🗂 깃헙 저장소

- [https://github.com/Googit-cloud/Client](https://github.com/Googit-cloud/Client)
- [https://github.com/Googit-cloud/Server](https://github.com/Googit-cloud/Server)

### 🔗 배포 주소

- [https://www.googit.cloud/](https://www.googit.cloud/)

### 🙋‍♂️ 팀 구성원

- 류명한 ([https://github.com/hanhan-script](https://github.com/hanhan-script))
- 임재후 ([https://github.com/Jaehoo-dev](https://github.com/Jaehoo-dev))

### 📅 개발 기간

- 2020년 11월 9일 ~ 2020년 11월 27일
  - 기획 및 구조 설계: 11월 9일 ~ 11월 13일 (1주)
  - 개발: 11월 16일 ~ 11월 27일 (2주)

### 🕹 실행 방법

- 프론트엔드

  - Git을 이용해 프로젝트를 클론합니다.

    ```jsx
    git clone https://github.com/Googit-cloud/Client.git
    cd Client
    npm install
    ```

  - root 디렉토리에 .env 파일을 만들고 환경변수를 설정합니다.

    ```jsx
    npm i -D dotenv
    REACT_APP_API_KEY=<firebase api key>
    REACT_APP_AUTH_DOMAIN=<firebase auth domain>
    REACT_APP_PROJECT_ID=<firebase project id>
    REACT_APP_APP_ID=<firebase app id>
    REACT_APP_SERVER_URL=<server url>
    ```

  - 애플리케이션을 실행합니다.

    ```jsx
    npm start
    ```

- 백엔드

  - Git을 이용해 프로젝트를 클론합니다.

    ```jsx
    git clone https://github.com/Googit-cloud/Server.git
    cd Server
    npm install
    ```

  - root 디렉토리에 .env 파일을 만들고 환경변수를 설정합니다.

    ```jsx
    npm i -D dotenv
    DB_URL=<mongoDB URL>
    JWT_SECRET_KEY=<some-temporary-random-long-string-for-jwt-use>
    ORIGIN_URL=<client url>
    ```

  - 서버를 실행합니다.

    ```jsx
    npm i -D nodemon
    npm run dev
    ```

---

## 💡 프로젝트 동기

- 애플 메모장을 공유용도로 쓰다가 불편함을 느꼈습니다. 누군가가 문서를 수정했다고만 알려주지 어디를 고쳤는지는 알려주지 않기 때문입니다. 그래서 애플 메모장의 공유 기능에 Git의 버전관리 기능을 더해보자고 생각을 했습니다.

---

## 🔎 프로젝트 설명

### 🛠 기술 스택

- 프론트엔드
  - ECMAScript2015+
  - React
  - Redux
  - React-redux
  - Styled Components
  - Slate.js
- 백엔드
  - Node.js
  - Express
  - MongoDB Atlas
  - Mongoose
  - Socket.io
  - AWS Elastic Beanstalk

### 🕹 핵심 기능 (페이지 기준)

1. 회원가입 및 로그인
   - 로그인을 하지 않으면 앱에 접근하지 못하도록 막았습니다.
   - Firebase을 이용해 구글 소셜 로그인을 적용했습니다.
   - Firebase에서 받은 정보를 서버에 보내면 서버는 이용자 정보를 확인하고 JsonWebToken을 발급합니다. 브라우저는 토큰을 받아 local storage에 담습니다.
   - 앱이 처음 마운트 될 때 local storage에 토큰이 있으면 서버에 보냅니다. 서버에서 인증절차를 거쳐 이용자 정보 등 결과를 보내면 클라이언트는 자동으로 로그인 처리를 합니다.
2. 메인 페이지
   - 무한 스크롤 방식을 이용해 updated_at이 최신인 순서로 쪽지를 10개씩 띄웁니다.
   - 쪽지는 이용자가 작성한 쪽지와 공유받은 쪽지로 나뉩니다.
   - 기본적으로 직접 쓴 쪽지와 공유받은 쪽지가 모두 나타나도록 설계했습니다. 사용자가 작성한 쪽지 목록과 공유받은 쪽지 목록을 서버에서 합친 뒤 클라이언트로 보냅니다.
   - 토글 버튼을 이용해 공유하지 않은 쪽지만 볼 수도 있습니다.
   - 검색 기능을 제공합니다. 정규 표현식을 이용해 사용자가 입력한 검색어를 포함하는 쪽지만 찾도록 쿼리문을 작성했습니다.
3. 에디터 페이지
   - 메인페이지에서 새 쪽지 만들기 버튼을 누르면 새 쪽지를 만드는 에디터 페이지로, 특정 쪽지를 누르면 해당 쪽지 에디터 페이지로 이동합니다..
   - 글을 쓰기 시작하면 저장 버튼이 나타나며 글을 드래그하면 해당 위치에 hovering toolkit이 생깁니다. 굵게, 이탤릭체, 밑줄, 최소선, 강조, 글씨 크게 등을 지원합니다.
   - 저장을 누르면 해당 버전을 데이터베이스에 저장하고 저장버튼이 사라집니다. 신규 쪽지일 때는 새 브랜치를 만들고 쪽지를 담으며, 기존 쪽지의 새 버전일 때는 기존 브랜치에 새로운 쪽지를 담습니다. 데이터베이스 모델링은 아래에서 더 자세하게 다루겠습니다.
   - 쪽지의 이전 버전과 다음 버전 유무에 따라 이전 버전 보기 버튼, 다음 버전 보기 버튼을 활성화합니다.
   - 이전 버전이 있을 땐 '수정사항 보기' 버튼이 나타납니다. 이 토글 버튼을 누르면 현재 쪽지와 이전 버전을 비교해서 달라진 부분을 보여 줍니다. Github이나 Gitlab처럼 변동사항을 초록색과 빨간색으로 표시합니다. 비교 알고리즘은 아래에서 자세하게 설명하겠습니다.
   - 쪽지를 작성하면 '공유' 버튼이 나타납니다.
   - 공유 버튼을 누르면 상대방의 이메일과 상대방에게 부여하고자하는 권한을 입력하는 모달창이 나타납니다. 권한은 '읽기 전용'과 '쓰기'로 나눴습니다. 이 모달창은 현재 쪽지를 공유한 이용자들과 각가의 권한도 보여줍니다.
   - 현재 이용자와 쪽지 작성자가 일치하면 화면에 '삭제' 버튼이 보입니다. 쪽지를 삭제하면 해당 쪽지의 모든 버전, 브랜치, 공유 관계를 모두 삭제합니다.
   - 웹소켓을 이용해 쪽지를 공유한 이용자가 작성하는 내용을 실시간으로 볼 수 있습니다.

### 🗂 데이터베이스 모델

1. User
   - User 스키마는 email, username, profile_img_url, my_branches, shared_branches_infos로 구성했습니다.
   - my_branches는 해당 이용자가 생성한 Branch의 ObjectId들을 담은 배열입니다. 처음 회원가입을 하면 my_branches를 빈 배열로 생성합니다.
   - shared_branches_infos는 공유 관계들을 담은 배열입니다. BranchSharingInfo ObjectId들로 이뤄졌습니다.
2. BranchSharingInfo
   - BranchSharingInfo는 실제 Branch와 공유받은 User 사이의 중간 다리 역할을 합니다.
   - User와 Branch 스키마가 들고 있어야 할 정보를 줄여 줍니다. 쪽지를 새로 공유하거나 공유 권한을 수정, 삭제할 때, 브랜치를 삭제할 때 등 공유받은 User까지 찾아가지 않고 공유 관계를 바꿀 수 있도록 해줍니다.
   - user_id와 branch_id를 참조하며 has_writing_permission으로 공유받은 이용자의 권한을 관리합니다.
3. Branch
   - Branch는 쪽지 버전과 공유 관계를 용이하게 관리하려 고안했습니다. 처음엔 Branch 없이 Note들을 linked list로 엮으려 했지만 Note 모델이 들고 있어야 할 중복 정보를 줄이려 Branch를 도입했습니다.
   - Branch는 created_by와 notes_history, sharing_infos, latest_note, timestamps를 저장합니다.
   - created_by는 작성자의 ObjectId입니다. 주로 삭제 권한이 있는지를 판단할 때 사용합니다.
   - 쪽지의 버전들은 notes_history라는 배열(Stack)로 관리합니다. 다만 가장 최신 쪽지는 따로 빼서 latest_note로 저장합니다. 메인페이지에서 쪽지를 눌렀을 때 어느 버전을 보여줄지 간편하게 알 수 있습니다.
   - 새로운 버전이 생기면 기존 latest_note를 notes_history에 push 하고 새 쪽지를 latest_note로 지정합니다.
   - sharing_infos는 BranchSharingInfo ObjectId들을 배열로 저장합니다.
   - Branch는 공유 이용자들이 같은 쪽지를 동시에 수정하고 저장할 때 충돌이 나지 않도록 해 줍니다. Branch 없이 Note들을 관리했다면 사용자가 저장하는 순간 현재 보고 있는 쪽지가 최신 버전인지 확인을 해야 하는데 Branch로 관리하면 이런 과정을 생략한 채 Branch 마지막에 밀어넣으면 됩니다.
   - 또 Branch의 id는 소켓 room으로 쓰기도 합니다. Branch가 없었다면 실시간 공유 기능을 만들어내기 까다로웠을 수 있습니다.
4. Note
   - Note 모델은 created_by, parent, blocks, previous_version, next_version, timestamps로 이뤄졌습니다.
   - parent는 해당 쪽지를 담고 있는 Branch를 가리킵니다.
   - previous_version과 next_version은 각각 이전 버전과 다음 버전 쪽지의 ObjectId를 담고 있습니다. Doubly linked list 형태를 띱니다.
   - blocks에 실제 쪽지 내용을 저장합니다. 쪽지 한 줄 한 줄을 block 한 개로 관리합니다. block은 텍스트와 스타일 정보들을 key value pair로 담고 있습니다.
5. 비고
   - 기획 단계에서 데이터베이스 모델을 짜는 데 시간을 가장 많이 쏟아부었습니다. 그런데도 지금 와서 보니 데이터베이스를 더 효율적으로 설계할 수 있는 방안들이 보입니다.
   - 가령 Branch와 Note 모델 모두 동일한 created_by를 참조합니다. 쿼리할 땐 편하겠지만 공간을 낭비한다는 생각도 듭니다.
   - Note를 관리하는 방식도 혼란스럽습니다. Branch에 배열로 담았으면서 Note들끼리도 linked list 형태로 서로 가리키고 있습니다. Linked list 자료 구조 덕분에 버전 사이에 이동을 할 때 편리했지만 역시 공간을 낭비했다고 볼 수 있겠습니다.
   - 가교 역할을 하는 BranchSharingInfo를 만들어서 이점이 생기긴 했지만 반대로 쿼리를 할 때 한 단계 더 깊이 들어가야 해 불편하기도 했습니다.
   - 브랜치를 삭제하거나 공유 관계를 수정할 때, 신규 브랜치를 만들고 새 쪽지를 담을 때 등 여러 작업이 연쇄적으로 일어날 때 오류를 어떻게 처리할지 난감했습니다. 새 브랜치를 만들어 두고 새 쪽지를 만들다가 오류가 났을 때 만들었던 브랜치를 다시 지워야 하는지 등이 어려웠습니다. SQL의 트랜젝션 개념이 지니는 장단점을 배울 수 있는 기회였습니다.

### 🗂 버전 비교 알고리즘

1. 문제 정의 및 고민 사항 정리
   - 문서에서 바뀐 부분을 찾아야 함.
   - 문서를 순회하다가 기존 버전과 다른 부분이 나오면 바뀌었다고 취급하려고 함. 그러나 기존 내용이 어디에서 다시 시작하는지 파악하기가 어려움. 지금 보고 있는 'A'가 새로 생긴 'A'인지 원래 있던 'A'인지 알기가 어렵기 때문.
   - 구글의 diff-match-patch와 같은 라이브러리를 쓰는 방법도 생각했으나 알고리즘을 직접 짜보고 싶었음. 또한 이런 라이브러리는 텍스트가 바뀌었는지만 파악할 수 있고 굵게, 밑줄 등 스타일 처리는 변화를 감지하지 못하는 문제도 존재.
   - HTML을 통째로 저장했다가 출력할 때 HTML 스트링을 순회하면서 태그를 잘라내고 텍스트와 속성값을 비교하는 방식도 고민. 그러나 이용자가 HTML 형식으로 문서를 입력했을 때를 걸러내야 하는 등 조건 설정이 과도하게 복잡해짐. 보안이 취약해서 dompurifier와 같은 라이브러리를 추가로 이용해야 함.
   - 결국 배열 두 개를 비교하는 접근 방식 선택. 다만 각 배열의 요소들이 고유해야 하는 조건을 충족해야 함. 요소가 중복적으로 나타나면 특정 요소가 기존에 있던 건지 새로 생긴 건지 알 수가 없기 때문.
   - 에디터를 만드는 데 사용한 Slate.js가 블럭(한 줄의 단위, Enter를 치면 새로운 블럭이 생김) 단위로 id를 부여함. 하지만 블럭 중간에서 Enter를 치면 쪼개진 블럭 두 개에 같은 id가 붙음. 외부 프레임워크를 사용하는 탓에 이런 현상을 통제하기 어려움.
2. 해결 방법

   - 저장단계
     - 우선 블럭들 사이에 id가 중복되는 문제를 처리하기 위해 id를 idLookingBackwards(이하 'idB')와 idLookingForwards(이하 'idF')로 나눴습니다. (아래에서 설명하겠지만 서로 바라보고 있는 id끼리 비교해 쪽지에서 바뀐 부분을 찾기 때문에 id 이름을 이렇게 지었습니다.)
     - 이용자가 쪽지를 쓰는 동안 idF가 영향을 받습니다. 즉 이용자가 쪽지를 쓸 때 Enter를 치면 idF가 같은 블럭이 여럿 생길 수 있습니다.
     - 이용자가 '저장'을 누르면 비로소 id들을 가공합니다. 블럭 데이터를 서버에 보내기 직전에 아래와 같은 작업을 거칩니다.
       - [ ] 각 블럭의 idB에 idF를 옮겨 담습니다.
       - [ ] 각 블럭의 idF는 uuid를 사용해 고유하게 다시 부여합니다.
     - 즉 idB는 중복될 수 있지만 idF는 겹치지 않습니다.
     - 같은 idB가 존재한다는 것은 기존에 idB였던 블럭이 쪼개졌다는 뜻입니다. 따라서 해당 블럭은 바뀌었다고 확신할 수 있기 때문에 idB는 중복적으로 나타나도 괜찮습니다.
   - 비교 및 표시 단계

     - 기본적으로 이전 버전(previousBlocks, 배열)의 idLookingForwards(idF)와 현재 버전(currentBlocks, 배열)의 idLookingBackwards(idB)를 비교해 지워진 블럭, 수정된 블럭, 바뀌지 않은 블럭, 새로 생긴 블럭을 판단합니다.
     - Hash table을 우선 두 개 만듭니다. 하나는 이전 버전 블럭들의 정보를, 나머지 하나는 현재 버전 블럭들의 정보를 담을 것입니다.
       - [ ] previousBlocksTable
       - [ ] currentBlocksTable
     - Hash table의 key는 블럭들의 id입니다. 이전 버전은 idF를, 현재 버전은 idB를 씁니다.
     - Hash table의 value는 객체를 담은 배열입니다. 각 객체는 id가 key 값인 블럭의 인덱스와 블럭 자체를 담고 있습니다.

       { index: blockIndex, block: block }

     - 빈 배열을 다섯 개 준비합니다. 버전이 어떻게 바뀌었는지 보여준다는 것은 이전 버전과 현재 버전을 모두 보여줘야 한다는 셈이기 때문에 마지막 단계에서 배열 다섯 개를 하나로 합칩니다.
       - [ ] erasedBlocks
       - [ ] modifiedBlocksBefore
       - [ ] unModifiedBlocks
       - [ ] modifiedBlocksAfter
       - [ ] newBlocks
     - 이전 버전 블럭들을 먼저 순회합니다.
       - [ ] 블럭의 idF가 currentBlocksTable의 key로 존재하지 않으면 해당 블럭이 지워졌다는 뜻입니다. erasedBlocks에 push 합니다.
       - [ ] 블럭의 idF가 currentBlocksTable에 있으면서 동시에 블럭 객체의 내부 내용이 같으면 해당 블럭은 바뀌지 않았다는 뜻입니다. unModifiedBlocks에 push 합니다.
       - [ ] 이외는 블럭이 바뀌었다는 뜻이므로 modifiedBlocksBefore에 push 합니다.
     - 현재 버전 블럭들을 순회합니다.
       - [ ] 블럭의 idB이 previousBlocksTable의 key로 존재하지 않으면 해당 블럭이 새로 생겼다는 뜻입니다. newBlocks에 넣습니다..
       - [ ] 블럭의 idB가 previousBlocksTable에 있는데 블럭 객체의 내부 내용이 다르면 블럭이 바뀌었다는 뜻입니다. modifiedBlocksAfter에 넣습니다.
     - 이렇게 해서 채운 배열 다섯 개를 차례 차례 합쳐서 큰 배열 하나를 만듭니다. Merge sort를 이용했습니다. 이미 정렬이 된 배열들을 합치는 셈이므로 효율성이 높을 것이라고 생각했습니다.
     - 이용자가 '수정사항 보기' 버튼을 껐다 켰다 할 때마다 매번 이렇게 비교를 하지 않아도 되도록 마지막에 도출하는 배열을 local storage에 저장합니다.

---

## 🧶 어려움 극복 및 배운 점

### 📜 '줄을 자주 바꿔주세요'

- 에디터 placeholder에 적은 문구로 데이터를 블럭(한 줄) 단위로 관리하기 때문에 넣었습니다.
- 이용자가 줄바꿈(Enter)을 하지 않고 쪽지를 계속 작성하면 버전 비교를 하기가 어려워집니다.
- 블럭이 커질 수록 바뀌었다고 표시되는 부분도 커져 어디를 수정했는지 상세하게 알기 힘들어지기 때문입니다.

### ✏ Slate.js 도입

- 처음에는 contenteditable을 사용해 에디터를 직접 만들었습니다. 하지만 에디터와 툴킷까지 만들려면 공수가 너무 많이 들었습니다. 프로젝트 목표가 에디터를 만드는 것이 아니라 문서를 공유하고 버전을 비교하는 애플리케이션을 만드는 것이었기 때문에 프레임워크를 도입하기로 결정했습니다.
- React를 염두에 두고 만든 프레임워크이기 때문에 애플리케이션에 도입하기가 좋겠다고 생각했습니다. 프레임워크를 도입하자 dangerouslySetInnerHTML을 쓰지 않아도 됐고 이용자가 스크립트를 입력했을 때를 대비해서 설치한 dompurifier도 지울 수 있었습니다.
- 대신 통제권을 잃어서 힘든 점도 많았는데 데이터 형태가 달라지면서 버전 비교 알고리즘 짜기가 까다로워졌습니다.
- 이용자가 Enter를 치면 중복 id가 생기는 현상을 없애려 Enter를 칠 때 uuid로 id를 새로 부여하려 했으나 Slate.js는 이런 변화 시도를 막아놨습니다. 그래서 사후적으로 객체를 복사해 id를 가공해야 했습니다.
- 이 밖에 한글을 입력할 때 오류가 종종 생기는데 외부 프레임워크를 사용한 탓에 디버깅을 하지 못한 점이 아쉽습니다.

### 🖥 API 요청

- 구깃은 풀스택으로 개발한 첫 프로젝트입니다. 그래서 클라이언트와 서버 사이에 통신을 하는 데 시행착오를 겪기도 했습니다.
- 대표적으로 API 요청은 무조건 적은 게 좋다고 생각해 처음엔 왕복 한 번으로 과제 하나를 끝내려고 했습니다. 신규 쪽지를 만드는 상황을 사례로 들어 보겠습니다.
  - 처음에는 이렇게 설계했습니다.
    - [ ] 클라이언트: '브랜치 새로 만들고 쪽지 새로 만들어서 그 쪽지를 브랜치에 넣어 줘'
    - [ ] 서버: '브랜치 새로 만들고 쪽지 새로 만들어서 브랜치에 넣었어'
  - 프로젝트 중간에 아래와 같이 바꿨습니다. Url이 표현하는 내용과 클라이언트-서버 사이에 오가는 '대화'가 더 일치하게 됐다고 생각합니다.
    - [ ] 클라이언트: '브랜치 새로 만들어 줘'
    - [ ] 서버: '브랜치 새로 만들었어'
    - [ ] 클라이언트: '이 브랜치에 넣을 쪽지 새로 만들어 줘'
    - [ ] 서버: '쪽지 새로 만들어서 브랜치에 넣었어'

### 🗂 데이터 재활용

- 서버에서 넘겨받은 데이터를 클라이언트 쪽에서 관리할 때 시행착오를 겪었습니다.
- 처음엔 그때그때 사용성에 따라 데이터를 받자마자 가공했는데 개발을 진행하다 보니 같은 데이터를 다른 형태로 사용해야 할 때가 있었습니다. 그런데 처음 받았을 때 이미 가공을 해버려서 재사용도 힘들고 타입을 예측하기도 힘들었습니다.
- 이후 서버에서 받은 데이터를 원본대로 들고 있다가 필요한 컴포넌트에 넘겨주면 사용하는 쪽에서 데이터를 가공하는 방식으로 바꿨습니다.

---

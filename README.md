# NestJS 게시판 

### 주요 기능

- 사용자 인증 (회원가입, 로그인)
- JWT 기반 인증 시스템
- 게시글 CRUD 작업 (생성, 조회, 수정, 삭제)

### 기술 스택

- **백엔드**: NestJS
- **데이터베이스**: PostgreSQL
- **ORM**: TypeORM
- **인증**: JWT (JSON Web Token)
- **API 문서**: Swagger

## 프로젝트 구조

```
nestjs-board-app/
├── src/
│   ├── auth/                 # 인증 관련 모듈
│   ├── boards/               # 게시판 관련 모듈
│   └── configs/              # 애플리케이션 설정
└── config/                   # 환경별 설정 파일
```

## 데이터베이스 설계

- **User**: 사용자 정보 관리
  - 사용자 이름, 비밀번호 저장
  - 게시글과 1:N 관계 구성

- **Board**: 게시글 정보 관리
  - 제목, 내용, 상태 저장
  - 사용자와 N:1 관계 구성

## API 문서

```
http://localhost:3000/api
```

## 라이선스

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

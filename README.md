# Prisma Client
- Prisma를 이용해 Serverless 방식으로 배포한 상태.
- React에서 Query요청을 작성.


## Todo
- [x] Init App.
- [x] Settings apollo.
- [x] Deployed Prisma test to Query.
- [x] Routes, Theme, styled-components.
- [x] Layout + Navigation.
- [x] Create DevExpress-Components Part 1.
- [x] Create UpdatePayment.
- [x] Subscription Payments.
- [x] Create DeletePayment.
- [x] Setting App Title.
- [x] Add New Payment.
- [x] Login.
- [x] Grid Table.
- [x] Edit column set required.

## Bugs
- [ ] Add New Payment - Bug Found (새 Payment 추가시, requried가 아닌 경우에는 Validation을 하지 않음.)

## Install
- yarn create react-app ./ --template typescript
- yarn add react-apollo graphql graphql-tools apollo-boost
- yarn add react-router-dom @types/react-router-dom
- yarn add styled-components @types/styled-components
- yarn add devextreme devextreme-react
- yarn add apollo-link-ws subscriptions-transport-ws
- yarn add apollo-link apollo-link-http apollo-utilities apollo-client apollo-cache-inmemory

## Deploy
- now 배포시, [name명]을  package.json에 작성.
- git push시 배포된 곳에서 자동으로 코드 실행.
- https://iconmonstr.com/arrow-64-svg/
# ERD

## 비즈니스 시나리오 설정

예제 비즈니스: 온라인 쇼핑몰

- 사용자는 회원가입 후 제품을 검색하고 주문할 수 있따.
- 제품은 카테고리별로 관리하된다.
- 사용자는 여러 개의 제품을 장바구니에 담고 주문할 수 있다.
- 하나의 주문에는 여러 개의 제품이 포함될 수 있으며, 각 제품은 개별 수량을 가질 수 있다.
- 관리자는 사용자의 주문을 확인하고 배송 상태를 변경할 수 있다.

## entity, attribute

- user
  - id (PK)
  - name
  - email
  - password
  - created_at
- product
  - id (PK)
  - name
  - price
  - stock
  - created_at
  - category_id (FK) - 카테고리 참조
- category
  - id (PK)
  - name
- order
  - id
  - user-id (FK) - 주문한 사용자 참조
  - status - 주문 상태
- order_detail;
  - id
  - order_id (FK) - 주문 참조
  - product_id (FK) - 제품 참조
  - quantity - 주문한 제품 개수

## cardinality

- user - order 1:N
- order - order_detail 1:N
- product - order_detail N:M
- product - category 1:N

```mermaid

```

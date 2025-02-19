# ERD task

## 도서 대여 시스템

- 비즈니스 명세

  - 사용자는 도서를 대여할 수 있다.
  - 도서는 여러 번 대여 될 수 있지만, 한 번에 한 사용자만 대여할 수 있다.
  - 도서는 제목, 저자, 출판년도 등의 정보를 가진다.
  - 사용자는 이름, 이메일, 전화번호 등의 정보를 가진다.
  - 대여 기록에는 대여 날짜, 반납 기한이 포함된다.

  ++reservation 예약

## 도서 대여 시스템 기능 확장!!

- 비즈니스 명세
  - 도서 예약 시스템
    - 사용자가 원하는 도서가 대출 상태일 경우 예약을 걸어둘 수 있다.

## entity, attribute

- User
  - id (PK)
  - name
  - email
  - phone_number
  - created-at
  - updated-at
- Book
  - id (PK)
  - title
  - author
  - published_year
- Rental
  - id (PK)
  - user-id (FK)
  - book-id (FK)
  - return_due_date
  - return_date
- Reservation
  - id (PK)
  - user-id (FK)
  - book_id (FK)
  - created_at
  - status
- Fine

  - id (PK)
  - rental_id (FK)
  - overdue_days
  - fine_amount
  - is_paid

  ### cardinality

  - user - Rental 1:N
  - user - Reservation 1:N
  - book - Rental 1:N
  - book - Reservation 1:N
  - Rental - Fine 1:1

  ```mermaid
    erDiagram
      User ||--o{ Rental : "rents"
      User ||--o{ Reservation : "makes"
      Book ||--o{ Rental : "is rented"
      Book ||--o{ Reservation : "is reserved"
      Rental ||--|| Fine : "has fine"
  ```

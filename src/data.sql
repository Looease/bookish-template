DROP TABLE IF EXISTS member;
DROP TABLE IF EXISTS check_out_book;
DROP TABLE IF EXISTS book;

CREATE TABLE IF NOT EXISTS member (
    member_id       int primary key,
    first_name      varchar not null,
    last_name       varchar not null
    );

CREATE TABLE IF NOT EXISTS check_out_book (
    check_out_id       int primary key,
    book_id            int not null,
    member_id          int not null,
    check_out_date     date not null,
    return_date        date not null,
    CONSTRAINT fk_member_to_check_out FOREIGN KEY (member_id) REFERENCES member(member_id),
    CONSTRAINT fk_book_to_check_out FOREIGN KEY (book_id) REFERENCES book(book_id)
);

CREATE TABLE IF NOT EXISTS book (
    book_id             int primary key,
    book_name           varchar(32) not null,
    author_name         varchar not null, 
    book_quantity       int not null
    );

INSERT INTO member (member_id, first_name, last_name)
VALUES
(234, 'Perla', 'Kincey'),
(122, 'Lizabeth', 'Clemmen'),
(444, 'Shirleen', 'Craufurd'),
(666, 'Pyotr', 'Silvermann'),
(785, 'Lonna', 'Henken'),
(113, 'Ana', 'Hattiff'),
(989, 'Phyllys', 'Skupinski'),
(262, 'Hamid', 'O''Bee'),
(567,'Virginia', 'Kyneton'),
(894, 'Ikey','Shorrock'),
(909, 'Shirline', 'Whitchurch'),
(212, 'Morgan', 'Lunk'),
(576, 'Morgun', 'Pieracci'),
(443, 'Merrie', 'Durbin'),
(992, 'Merna', 'Wavish'),
(774, 'Tamarra', 'Wethers'),
(111, 'Betsey', 'Baldini'),
(776, 'Agnese', 'Martini'),
(657, 'Flemming', 'Repp'),
(888,'Andriana', 'Papis');


INSERT INTO book(book_id, book_name, author_name, book_quantity)
VALUES
(1, 'Sapiens','Yuval Noah Harari', 4),  
(2, 'The Girl With all the Gifts', 'Mike Carey', 2),   
(3, 'The Boy on the Bridge', 'Mike Carey', 2),   
(4, 'Twilight', 'Stephenie Meyer', 4),   
(5, 'Nineteen Eighty-Four', 'George Orwell', 4),   
(6, 'Wuthering Heights', 'Emily Bronte', 6),   
(7, 'The Chronicles of Narnia', 'C. S. Lewis', 6),   
(8, 'What Happened', 'Hilary Clinton', 1),   
(9, 'What I know for sure', 'Oprah Winfrey', 2),   
(10,'Great Expectations', 'Charles Dickens', 4),    
(11, 'Lean In', 'Cheryl Sandberg', 1),   
(12, 'The Power of Now', 'Eckhart Tolle',2),   
(13, 'Why we sleep', 'Matthew Walker', 2),   
(14, 'The Hobbit', 'J. R. R. Tolkien', 3),   
(15, 'The Handmaid’s Tale', 'Margaret Atwood', 3),   
(16,'The Picture of Dorian Grey', 'Oscar Wilde', 5),   
(17,'One Day', 'David Nicholls', 3),   
(18,'The Psyhcopath Test', 'Jon Ronson', 2),   
(19,'A Clockwork Orange', 'Anthony Burgess', 3),   
(20,'Life of Pi', 'Yann Martel', 5);

INSERT INTO check_out_book(check_out_id, book_id, member_id)
VALUES
()


CREATE TABLE IF NOT EXISTS check_out_book (
    check_out_id              serial primary key,
    book_id         varchar(16) not null,
    member_id      varchar(128),



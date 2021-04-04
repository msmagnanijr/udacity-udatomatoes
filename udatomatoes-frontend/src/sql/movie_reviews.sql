
CREATE TABLE movie_reviews (
     id MEDIUMINT NOT NULL AUTO_INCREMENT,
     movie_title VARCHAR(40) NOT NULL,
     movie_review VARCHAR(40) NOT NULL,
     movie_rating VARCHAR(40) NOT NULL,
     PRIMARY KEY (id)
);
package com.api.desafio_final.repository;

import com.api.desafio_final.entities.Post;
import com.api.desafio_final.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {
    Optional<List<Post>> findByUser(User user);



}

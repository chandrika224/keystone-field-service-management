package com.keystone.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.keystone.entity.User;
import com.keystone.enums.Role;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // =========================================================
    // FIND USER BY EMAIL
    // =========================================================

    Optional<User> findByEmail(String email);


    // =========================================================
    // CHECK EMAIL
    // =========================================================

    boolean existsByEmail(String email);


    // =========================================================
    // FIND USERS BY ROLES
    // =========================================================

    List<User> findByRoleIn(List<Role> roles);
    
    List<User> findByRole(Role role);
}
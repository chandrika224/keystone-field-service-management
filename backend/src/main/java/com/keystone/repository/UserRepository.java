package com.keystone.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.keystone.entity.User;
import com.keystone.enums.Role;

public interface UserRepository extends JpaRepository<User,Long>{
	
	Optional<User> findByEmail(String email);
	
	boolean existsByEmail(String email);
	
	List<User> findByRoleIn(List<Role> roles);
} 



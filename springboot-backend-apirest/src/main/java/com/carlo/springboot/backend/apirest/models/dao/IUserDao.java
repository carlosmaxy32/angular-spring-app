package com.carlo.springboot.backend.apirest.models.dao;

import org.springframework.data.repository.CrudRepository;

import com.carlo.springboot.backend.apirest.models.entity.User;

public interface IUserDao extends CrudRepository<User, Long>{
	public User findByUsername(String username);

}

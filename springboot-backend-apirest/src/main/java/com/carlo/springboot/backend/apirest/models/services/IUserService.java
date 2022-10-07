package com.carlo.springboot.backend.apirest.models.services;

import com.carlo.springboot.backend.apirest.models.entity.User;

public interface IUserService {
	public User findByUsername(String username);
}

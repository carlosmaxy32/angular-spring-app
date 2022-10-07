package com.carlo.springboot.backend.apirest.models.dao;

import org.springframework.data.repository.CrudRepository;

import com.carlo.springboot.backend.apirest.models.entity.Grade;

public interface IGradeDao extends CrudRepository<Grade, Long>{

}

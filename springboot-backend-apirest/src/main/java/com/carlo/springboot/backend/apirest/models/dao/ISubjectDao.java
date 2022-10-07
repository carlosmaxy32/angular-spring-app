package com.carlo.springboot.backend.apirest.models.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.carlo.springboot.backend.apirest.models.entity.Subject;

public interface ISubjectDao extends CrudRepository<Subject, Long>{
	public List<Subject> findByNameContainingIgnoreCase(String term);
}

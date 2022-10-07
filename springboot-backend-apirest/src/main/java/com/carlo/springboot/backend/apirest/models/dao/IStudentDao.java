package com.carlo.springboot.backend.apirest.models.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.carlo.springboot.backend.apirest.models.entity.Region;
import com.carlo.springboot.backend.apirest.models.entity.Student;

public interface IStudentDao extends JpaRepository<Student, Long> {

	@Query("from Region")
	public List<Region> findAllRegiones();
}

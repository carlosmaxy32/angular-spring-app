package com.carlo.springboot.backend.apirest.models.services;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.carlo.springboot.backend.apirest.models.entity.Grade;
import com.carlo.springboot.backend.apirest.models.entity.Region;
import com.carlo.springboot.backend.apirest.models.entity.Student;
import com.carlo.springboot.backend.apirest.models.entity.Subject;

public interface IStudentService {
	public List<Student> findAll();
	public Page<Student> findAll(Pageable pageable);
	public Student findById(Long id);
	public Student save(Student student);
	public void delete(Long id);
	public List<Region> findAllRegiones();
	public Grade findGradeById(Long id);
	public Grade saveGrade(Grade grade);
	public void deleteGradeById(Long id);
	public List<Subject> findSubjectByName(String term);
}

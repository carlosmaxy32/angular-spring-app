package com.carlo.springboot.backend.apirest.models.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.carlo.springboot.backend.apirest.models.dao.IGradeDao;
import com.carlo.springboot.backend.apirest.models.dao.IStudentDao;
import com.carlo.springboot.backend.apirest.models.dao.ISubjectDao;
import com.carlo.springboot.backend.apirest.models.entity.Grade;
import com.carlo.springboot.backend.apirest.models.entity.Region;
import com.carlo.springboot.backend.apirest.models.entity.Student;
import com.carlo.springboot.backend.apirest.models.entity.Subject;

@Service
public class StudentServiceImpl implements IStudentService{

	@Autowired
	private IStudentDao studentDao;
	
	@Autowired
	private IGradeDao gradeDao;
	
	@Autowired
	private ISubjectDao subjectDao;
	
	@Override
	@Transactional (readOnly = true)
	public List<Student> findAll() {
		return (List<Student>) studentDao.findAll();
	}
	
	@Override
	public Page<Student> findAll(Pageable pageable) {
		return studentDao.findAll(pageable);
	}
	
	@Override
	@Transactional (readOnly = true)
	public Student findById(Long id) {
		return studentDao.findById(id).orElse(null);
	}
	
	@Override
	@Transactional
	public Student save(Student student) {
		return studentDao.save(student);
	}
	
	@Override
	@Transactional
	public void delete(Long id) {
		studentDao.deleteById(id);
		
	}

	@Override
	@Transactional(readOnly = true)
	public List<Region> findAllRegiones() {
		return studentDao.findAllRegiones();
	}

	@Override
	@Transactional(readOnly = true)
	public Grade findGradeById(Long id) {
		return gradeDao.findById(id).orElse(null);
	}

	@Override
	@Transactional
	public Grade saveGrade(Grade grade) {
		return gradeDao.save(grade);
	}

	@Override
	@Transactional
	public void deleteGradeById(Long id) {
		gradeDao.deleteById(id);
	}

	@Override
	@Transactional(readOnly = true)
	public List<Subject> findSubjectByName(String term) {
		return subjectDao.findByNameContainingIgnoreCase(term);
	}
	
}

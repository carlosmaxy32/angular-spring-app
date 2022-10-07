package com.carlo.springboot.backend.apirest.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.carlo.springboot.backend.apirest.models.entity.Grade;
import com.carlo.springboot.backend.apirest.models.entity.Subject;
import com.carlo.springboot.backend.apirest.models.services.IStudentService;

@CrossOrigin(origins = {"http://localhost:4200", "*"})
@RestController
@RequestMapping("/api")
public class GradeRestController {
	
	@Autowired
	private IStudentService studentService;
	
	@Secured({"ROLE_ADMIN", "ROLE_USER"})
	@GetMapping("/grades/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Grade show(@PathVariable Long id) {
		return studentService.findGradeById(id);
	}
	
	@Secured({"ROLE_ADMIN"})
	@DeleteMapping("/grades/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		studentService.deleteGradeById(id);
	}
	
	@Secured({"ROLE_ADMIN"})
	@GetMapping("/grades/filtrar-asignatura/{term}")
	@ResponseStatus(HttpStatus.OK)
	public List<Subject> filtrarSubjects(@PathVariable String term) {
		return studentService.findSubjectByName(term);
	}
	
	@Secured({"ROLE_ADMIN"})
	@PostMapping("/grades")
	@ResponseStatus(HttpStatus.CREATED)
	public Grade created(@RequestBody Grade grade) {
		return studentService.saveGrade(grade);
	}
}

package com.carlo.springboot.backend.apirest.controllers;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.carlo.springboot.backend.apirest.models.entity.Region;
import com.carlo.springboot.backend.apirest.models.entity.Student;
import com.carlo.springboot.backend.apirest.models.services.IStudentService;
import com.carlo.springboot.backend.apirest.models.services.IUploadFileService;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/api")
public class StudentRestController {

	@Autowired
	private IStudentService studentService;
	
	@Autowired
	private IUploadFileService uploadFileService;
		
	@GetMapping("/students")
	public List<Student> index() {
		return studentService.findAll();
	}
	
	@GetMapping("/students/page/{page}")
	public Page<Student> index(@PathVariable Integer page) {
		return studentService.findAll(PageRequest.of(page, 4));
	}
	
	@Secured({"ROLE_ADMIN", "ROLE_USER"})
	@GetMapping("/students/{id}")
	public ResponseEntity<?> show(@PathVariable Long id) {
		
		Student student = null;
		Map<String, Object> responseMap = new HashMap<>();
		try {
			student=studentService.findById(id);
			
		} catch (DataAccessException e) {
			responseMap.put("mensaje", "Error al realizar la consulta en la base de datos");
			responseMap.put("error", e.getMessage().concat(":" ).concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(responseMap, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		if(student==null) {
			responseMap.put("mensaje", "El cliente id: ".concat(id.toString()).concat(" no existe en la base de datos"));
			return new ResponseEntity<Map<String, Object>>(responseMap, HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Student>(student,HttpStatus.OK);
	}
	
	@Secured("ROLE_ADMIN")
	@PostMapping("/students")
	public ResponseEntity<?> create(@Valid @RequestBody Student student, BindingResult result) {
		Student studentNew = null;
		Map<String, Object> responseMap = new HashMap<>();
		
		if (result.hasErrors()) {
			List<String> errors = result.getFieldErrors()
					.stream()
					.map(err -> "El campo '" + err.getField()+"' "+err.getDefaultMessage())
					.collect(Collectors.toList());
			responseMap.put("errors", errors);
			return new ResponseEntity<Map<String, Object>>(responseMap, HttpStatus.BAD_REQUEST);
		}
		
		try {
			studentNew=studentService.save(student);
			
		} catch (DataAccessException e) {
			responseMap.put("mensaje", "Error al realizar el insert en la base de datos");
			responseMap.put("error", e.getMessage().concat(":" ).concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(responseMap, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		responseMap.put("mensaje", "El alumno se creó exitosamente");
		responseMap.put("alumno", studentNew);
		return new ResponseEntity<Map<String, Object>>(responseMap, HttpStatus.CREATED);
	}
	
	@Secured("ROLE_ADMIN")
	@PutMapping("/students/{id}")
	public ResponseEntity<?> update (@Valid @RequestBody Student student, BindingResult result, @PathVariable Long id) {
		Student studentActual = studentService.findById(id);
		Student studentUpdated = null;
		Map<String, Object> responseMap = new HashMap<>();
		
		if (result.hasErrors()) {
			List<String> errors = result.getFieldErrors()
					.stream()
					.map(err -> "El campo '" + err.getField()+"' "+err.getDefaultMessage())
					.collect(Collectors.toList());
			responseMap.put("errors", errors);
			return new ResponseEntity<Map<String, Object>>(responseMap, HttpStatus.BAD_REQUEST);
		}
		
		if(studentActual==null) {
			responseMap.put("mensaje", "Error: no se pudo editar el alumno en la base de datos");
			return new ResponseEntity<Map<String, Object>>(responseMap, HttpStatus.NOT_FOUND);
		}
		try {
			studentActual.setName(student.getName());
			studentActual.setLastname(student.getLastname());
			studentActual.setEmail(student.getEmail());
			studentActual.setRegion(student.getRegion());
			studentUpdated=studentService.save(studentActual);
			
		} catch (DataAccessException e) {
			responseMap.put("mensaje", "Error al actualizar el alumno en la base de datos");
			responseMap.put("error", e.getMessage().concat(":" ).concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(responseMap, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		
		responseMap.put("mensaje", "El alumno se actualizó exitosamente");
		responseMap.put("alumno", studentUpdated);
		return new ResponseEntity<Map<String, Object>>(responseMap, HttpStatus.CREATED);
	}
	
	@Secured("ROLE_ADMIN")
	@DeleteMapping("/students/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id) {
		Map<String, Object> responseMap = new HashMap<>();
		try {
			Student student = studentService.findById(id);
			String nameLastPicture = student.getPicture();
			uploadFileService.eliminar(nameLastPicture);
			studentService.delete(id);			
		} catch (DataAccessException e) {
			responseMap.put("mensaje", "Error al eliminar el alumno en la base de datos");
			responseMap.put("error", e.getMessage().concat(":" ).concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(responseMap, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		responseMap.put("mensaje", "El alumno se eliminó exitosamente");
		return new ResponseEntity<Map<String, Object>>(responseMap, HttpStatus.OK);
	}
	
	@Secured({"ROLE_ADMIN", "ROLE_USER"})
	@PostMapping("/students/upload")
	public ResponseEntity<?> upload(@RequestParam("file") MultipartFile file, @RequestParam("id") Long id) {
		Map<String, Object> responseMap = new HashMap<>();
		Student student = studentService.findById(id);
		
		if(!file.isEmpty()) {
			String nameFile = null;
			try {
				nameFile = uploadFileService.copiar(file);
			} catch (IOException e) {
				responseMap.put("mensaje", "Error al subir la imagen.");
				responseMap.put("error", e.getMessage().concat(":" ).concat(e.getCause().getMessage()));
				return new ResponseEntity<Map<String, Object>>(responseMap, HttpStatus.INTERNAL_SERVER_ERROR);
			}
			
			String nameLastPicture = student.getPicture();
			uploadFileService.eliminar(nameLastPicture);
			
			student.setPicture(nameFile);
			studentService.save(student);
			responseMap.put("student", student);
			responseMap.put("mensaje", "La imagen se ha subido con éxito:: "+nameFile);
		}
		
		return new ResponseEntity<Map<String, Object>>(responseMap, HttpStatus.CREATED);
	}
	
	@GetMapping("/uploads/img/{namePicture:.+}")
	public ResponseEntity<Resource> viewPicture(@PathVariable String namePicture) {
		Resource resource = null;
		try {
			resource = uploadFileService.cargar(namePicture);
		} catch (MalformedURLException e) {
			e.printStackTrace();
		}
		HttpHeaders headers = new HttpHeaders();
		headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\""+resource.getFilename()+"\"");
		return new ResponseEntity<Resource>(resource, headers, HttpStatus.OK);
	}
	
	@Secured("ROLE_ADMIN")
	@GetMapping("/students/regiones")
	public List<Region> listarRegiones(){
		return studentService.findAllRegiones();
	}
}

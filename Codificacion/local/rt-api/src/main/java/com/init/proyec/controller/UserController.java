package com.init.proyec.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.init.proyec.DAO.UserDao;
import com.init.proyec.entity.Status0;
import com.init.proyec.entity.Status1;
import com.init.proyec.entity.User;

@RestController
@CrossOrigin(origins = "*")

public class UserController {
	
	private UserDao<User> userdao;

	public UserController(UserDao<User> userdao) {
		super();
		this.userdao = userdao;
	}
	
	@RequestMapping(value="/getuser/{email}", method = RequestMethod.GET)
	public List<User> listUsers(@PathVariable String email) {
        return userdao.getUser(email);
		
    }
	
	@RequestMapping(value="/postuser", method = RequestMethod.POST)
    public ResponseEntity<?> createUser(@RequestBody User user){
		 if (userdao.findByEmail(user.getEmail()) != null) {
	            return new ResponseEntity<Object>(new Status0(), HttpStatus.IM_USED);
	        }
        userdao.userRegister(user);
        return new ResponseEntity<Object>(new Status1(), HttpStatus.CREATED);
    }
	
	@RequestMapping(value="/putuser", method = RequestMethod.PUT)
    public ResponseEntity<?> updateUser(@RequestBody User user) {
        if (userdao.findById(user.getId()) == null) {
            return new ResponseEntity<Object>(new Status0(),HttpStatus.OK);
        }else {
        	userdao.updateUser(user);
            return new ResponseEntity<Object>(new Status1(), HttpStatus.OK);
        }
    }
	
	@RequestMapping(value="/putToken", method = RequestMethod.PUT)
    public ResponseEntity<?> updateToken(@RequestBody User user) {
        if (userdao.findById(user.getId()) == null) {
            return new ResponseEntity<Object>(new Status0(),HttpStatus.OK);
        }
        	userdao.updateToken(user);
            return new ResponseEntity<Object>(new Status1(), HttpStatus.OK);
        
    }

	

}



package com.init.proyec.DAO;


import java.util.List;

import com.init.proyec.entity.User;

/**
 * Métodos realizados por el usuario 
 * @author metricTime
 *
 * @param <T>
 */
public interface UserDao<T>{
	/**
	 * Busca a un usuario
	 * @param id
	 */
	User findById(Integer id);
	/**
	 * Busca a un usuario
	 * @param email
	 */
	User findByEmail(String email);
	/**
	 * Actualiza el token de un usuario al sistema
	 * @param user
	 */
	Integer updateToken(User user);
	/**
	 * Obtiene al usuario
	 * @param email
	 */
	List<T> getUser(String email);
	/**
	 * Registrar un usuario al sistema
	 * @param user
	 */
	Boolean userRegister(User user);
	/**
	 * Actualizar perfil de un usuario del sistema
	 * @param user
	 * @return
	 */
	 Integer updateUser(User user);
	
	
	
	
}

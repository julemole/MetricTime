package com.init.proyec.DAO;


/**
 * Métodos del token de un usuario 
 * @author metricTime
 *
 * @param <T>
 */
public interface TokenDao<T>{
	/**
	 * Generar un token aleatorio 
	 * @param token
	 * @return
	 */
	String generateToken(String token);

	/**
	 * Verificar que el token de usuario sea correcto
	 * @param token
	 * @return
	 */
	boolean verifyToken(String token);

}

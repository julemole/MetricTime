package com.init.proyec.DAO;

import java.util.List;
/**
 * Metodos realizados por un agente de un usuario
 * @author metricTime
 *
 * @param <T>
 */
public interface AgentDao<T> {
	/**
	 * Obtener los agentes conectados de un usuario
	 * @param id
	 * @return 
	 */
	List<T> getAgentsConnected(int id);
	/**
	 * Obtener el historial de agentes de un usuario
	 * @param id
	 * @return
	 */
	List<T> getHistoryAgents(int id);
	/**
	 * Obtener un agente por su identificador (uuid)
	 * @param id
	 * @return
	 */
	List<T> getAgents(String uuid);
	
}

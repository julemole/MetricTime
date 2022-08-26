package com.init.proyec.DAO;

import java.util.List;

/**
 * Metodos de las metricas de un Agente
 * @author metricTime
 *
 * @param <T>
 */
public interface MetricDao<T>{
	/**
	 * Obtener los tipos de metrica por un agente determinado
	 * @param uuid
	 * @return
	 */
	List<T> getTypeMetricsAgent(String uuid);
	/**
	 * Obtener una lista de las metricas de un agente determinado
	 * @param uuid
	 * @param type
	 * @return
	 */
	List<T> getListMetrics(String uuid, String type);

}

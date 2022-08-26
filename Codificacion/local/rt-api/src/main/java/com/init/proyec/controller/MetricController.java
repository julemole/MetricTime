package com.init.proyec.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.init.proyec.DAO.MetricDao;
import com.init.proyec.entity.Metric;

/**
 * Controla las peticiones del cliente y ejecuta las operaciones demandadas
 * @author metricTime
 * 
 */
@RestController
@CrossOrigin(origins = "http://localhost:4000")

public class MetricController {

	private MetricDao<Metric> metricDAO;

    /**
     * 
     * @param metricDAO
     * @param metricsDAO
     */
	public MetricController(MetricDao<Metric> metricDAO) {
		super();
		this.metricDAO = metricDAO;
	}

	/**
	 * 
	 * @param uuid
	 * @return
	 */
	@RequestMapping(value="/metrics/{uuid}", method = RequestMethod.GET)
	public List<Metric> listTypeMetricAgent(@PathVariable String uuid) {
	    return metricDAO.getTypeMetricsAgent(uuid);
	}
	/**
	 * 
	 * @param uuid
	 * @param type
	 * @return
	 */
	@RequestMapping(value="/metrics/{uuid}/{type}", method = RequestMethod.GET)
	public List<Metric> listMetricsAgent(@PathVariable String uuid, @PathVariable String type) {
	    return metricDAO.getListMetrics(uuid, type);
	}


}



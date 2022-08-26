package com.init.proyec.services;

import java.util.List;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;
import com.init.proyec.DAO.MetricDao;
import com.init.proyec.entity.Metric;
/**
 * Se encarga de implementar todas las acciones llamadas desde el controlador
 * @author metricTime
 *
 */
@Service
public class MetricServices implements MetricDao<Metric>{
	

	JdbcTemplate jdbcTemplate;
	
    /**
     * Conectar con jdbc
     * @param jdbcTemplate
     */
	public MetricServices(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

    /**
     * Implementar metodo de obtener los tipos de metricas existentes por agente de usuario
     */
	@Override
	public List<Metric> getTypeMetricsAgent(String uuid) {
		String sql = "SELECT type FROM metrics JOIN agents ON agents.id = metrics.agent_id WHERE agents.uuid LIKE ? GROUP BY type";
		return jdbcTemplate.query(sql, typeMapper, uuid);
	}

    /**
     * Implementar metodo de obtener lista de metricas por tipo de un agente de usuario
     */
	@Override
	public List<Metric> getListMetrics(String uuid, String type) {
		String sql = "SELECT * FROM (SELECT metrics.id, type , value , metrics.created_at FROM metrics INNER JOIN agents ON  metrics.agent_id = agents.id WHERE agents.uuid LIKE ? and  metrics.type LIKE ? ORDER BY metrics.created_at DESC) as metric_filter LIMIT 20";
		return jdbcTemplate.query(sql, metricMapper, new Object[]{uuid, type});
	}


    
    RowMapper<Metric> typeMapper = (rs, rowNum) -> {
        Metric metrics = new Metric();
        metrics.setType(rs.getString("type"));
        return metrics;
    };
    
    RowMapper<Metric> metricMapper = (rs, rowNum) -> {
        Metric metrics = new Metric();
        metrics.setId(rs.getInt("id"));
        metrics.setType(rs.getString("type"));
        metrics.setValue(rs.getDouble("value"));
        metrics.setCreatedat(rs.getTimestamp("created_at"));
        return metrics;
    };

}

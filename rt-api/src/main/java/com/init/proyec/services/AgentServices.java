package com.init.proyec.services;

import java.util.List;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;
import com.init.proyec.DAO.AgentDao;
import com.init.proyec.entity.Agent;

/**
 * Se encarga de implementar todas las acciones llamadas desde el controlador
 * @author metricTime
 *
 */
@Service
public class AgentServices implements AgentDao<Agent>{
	
	JdbcTemplate jdbcTemplate;
	
    /**
     * Conectar con jdbc
     * @param jdbcTemplate
     */
	public AgentServices(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}
    /**
     * Implementar metodo de obtener Agente
     */
	@Override
	public List<Agent> getAgents(String uuid) {
		
		String sql = "SELECT id, name, hostname, connected, pid FROM agents WHERE uuid LIKE ?";
		return jdbcTemplate.query(sql,agentMapper, uuid);
	}
	
    /**
     * Implementar metodo de obtener agentes conectados por usuario
     */
	@Override
	public List<Agent> getAgentsConnected(int id) {
		
		String sql = "SELECT uuid FROM agents WHERE user_id = ?  AND connected = true ORDER BY created_at DESC";
		return jdbcTemplate.query(sql,uuidMapper, id);
	}
    /**
     * Implementar metodo de obtener historial de agentes por usuario
     */
	@Override
	public List<Agent> getHistoryAgents(int id) {
		
		String sql = "SELECT uuid ,name , pid, hostname FROM agents WHERE user_id = ?  AND connected = false ORDER BY created_at DESC";
		return jdbcTemplate.query(sql,semiagentMapper, id);
	}
   

	
	RowMapper<Agent> agentMapper = (rs, rowNum) -> {
        Agent agent = new Agent();
        agent.setId(rs.getInt("id"));
        agent.setName(rs.getString("name"));
        agent.setHostname(rs.getString("hostname"));
        agent.setConnected(rs.getBoolean("Connected"));
        agent.setPid(rs.getInt("pid"));
        return agent;
    };
    
    RowMapper<Agent> uuidMapper = (rs, rowNum) -> {
        Agent agent = new Agent();
        agent.setUuid(rs.getString("uuid"));
        return agent;
    };
    
    RowMapper<Agent> semiagentMapper = (rs, rowNum) -> {
        Agent agent = new Agent();
        agent.setUuid(rs.getString("uuid"));
        agent.setName(rs.getString("name"));
        agent.setPid(rs.getInt("pid"));
        agent.setHostname(rs.getString("hostname"));
        return agent;
    };


}

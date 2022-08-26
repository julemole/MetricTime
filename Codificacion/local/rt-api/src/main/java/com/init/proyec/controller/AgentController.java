package com.init.proyec.controller;

import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.init.proyec.DAO.AgentDao;
import com.init.proyec.entity.Agent;

/**
 * Controla las peticiones del cliente y ejecuta las operaciones demandadas
 * @author metricTime
 * 
 */
@RestController
@CrossOrigin(origins = "*")

public class AgentController {

	private AgentDao<Agent> agentDAO;

    /**
     * 
     * @param agentDAO 
     * @param agentsDAO
     */
	public AgentController(AgentDao<Agent> agentDAO) {
		super();
		this.agentDAO = agentDAO;
	}

	/***
	 * 
	 * @param uuid
	 * @return
	 */
	@RequestMapping(value="/agent/{uuid}", method = RequestMethod.GET)
    public List<Agent> getAgente(@PathVariable String uuid) {
        return agentDAO.getAgents(uuid);
    }
	/***
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value="/agents/{id}", method = RequestMethod.GET)
	public List<Agent> listUserAgents(@PathVariable int id) {
		System.out.println(id);
        return agentDAO.getAgentsConnected(id);
    }
	/**
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value="/history/agents/{id}", method = RequestMethod.GET)
	public List<Agent> listUserAgentHistory(@PathVariable int id) {
        return agentDAO.getHistoryAgents(id);
    }

}

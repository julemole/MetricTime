package com.init.proyec.services;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCallback;
import org.springframework.stereotype.Service;
import org.springframework.jdbc.core.RowMapper;
import com.init.proyec.DAO.UserDao;
import com.init.proyec.entity.User;


@Service
public class UserServices implements UserDao<User> {
	
	JdbcTemplate jdbcTemplate;
	
	public UserServices(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}
	
	
	@SuppressWarnings("deprecation")
	@Override
	public User findById(Integer id){
        String sql = "SELECT * FROM users WHERE id = ?";
        try{
            return  (User) this.jdbcTemplate.queryForObject(sql, new Object[] { id },userMapper);
        }
        catch(EmptyResultDataAccessException ex){
            return null;
        }

    }
	
	@SuppressWarnings("deprecation")
	@Override
	public User findByEmail(String email){
        String sql = "SELECT * FROM users WHERE email = ?";
        try{
            return  (User) this.jdbcTemplate.queryForObject(sql, new Object[] {email},userMapper);
        }
        catch(EmptyResultDataAccessException ex){
            return null;
        }

    }
	
	@Override
	public Boolean userRegister(User user){
        String sql="insert into users(username,email,password,token) values(?,?,?,? )";
        return jdbcTemplate.execute(sql,new PreparedStatementCallback<Boolean>(){
            @Override
            public Boolean doInPreparedStatement(PreparedStatement ps)
                    throws SQLException, DataAccessException {

                ps.setString(1,user.getUsername());
                ps.setString(2,user.getEmail());
                ps.setString(3,user.getPassword());
                ps.setString(4,user.getToken());
                return ps.execute();
            }
        });
    }
	
	@Override
	public Integer updateUser(User user){
        String sql="UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?";
        return jdbcTemplate.update(sql, user.getUsername(),user.getEmail(),user.getPassword(),user.getId());
    }
	
	@Override
	public Integer updateToken(User user){
        String sql="UPDATE users SET token = ? WHERE id = ?";
        return jdbcTemplate.update(sql, user.getToken(),user.getId());
    }

	@Override
	public List<User> getUser(String correo) {
		String sql = "SELECT id, username, email, password, token FROM users WHERE email LIKE ?";
		return jdbcTemplate.query(sql,userMapper, correo);
	}
	

	RowMapper<User> userMapper = (rs, rowNum) -> {
        User user = new User();
        user.setId(rs.getInt("id"));
        user.setUsername(rs.getString("Username"));
        user.setEmail(rs.getString("email"));
        user.setPassword(rs.getString("password"));
        user.setToken(rs.getString("token"));
        return user;
    };
}

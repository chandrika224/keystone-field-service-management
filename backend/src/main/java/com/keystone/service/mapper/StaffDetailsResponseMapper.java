package com.keystone.service.mapper;

import org.springframework.stereotype.Component;

import com.keystone.dto.staff.StaffDetailsResponse;
import com.keystone.entity.User;

@Component
public class StaffDetailsResponseMapper {
	
	public StaffDetailsResponse mapToStaffDetailsResponse(
	        User user
	) {

	    StaffDetailsResponse response =
	            new StaffDetailsResponse();

	    response.setId(user.getId());

	    response.setEmployeeId(
	            user.getEmployeeId()
	    );

	    response.setFirstName(
	            user.getFirstName()
	    );

	    response.setLastName(
	            user.getLastName()
	    );

	    response.setEmail(
	            user.getEmail()
	    );

	    response.setPhone(
	            user.getPhone()
	    );

	    response.setRole(
	            user.getRole()
	    );

	    response.setSpecialization(
	            user.getSpecialization()
	    );

	    response.setActive(
	            user.isActive()
	    );

	    response.setJoinedDate(
	    	    user.getJoinedDate() != null
	    	        ? user.getJoinedDate().toString()
	    	        : null
	    	);

	    return response;
	}

}

package com.keystone.dto.staff;

import com.keystone.enums.Role;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StaffDetailsResponse {
	
	 private Long id;

	    private String employeeId;

	    private String firstName;

	    private String lastName;

	    private String email;

	    private String phone;

	    private Role role;

	    private String specialization;

	    private boolean active;

	    private String joinedDate;

}

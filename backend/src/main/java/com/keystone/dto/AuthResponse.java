package com.keystone.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
	private Long id;
	private String firstName;
	private String lastName;
	private String email;
	private String phone;
	private String address;
	private Role role;
	private String token;
	private String message;

    public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getAddress() {
		return address;
	}

    private String token;
    private String message;
}
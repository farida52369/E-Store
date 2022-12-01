package com.example.e_store.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String firstName;
    private String lastName;
    private String password;
    private String email;
    private String dateOfBirth;
    private String phoneNumber;
    private String gender;

    @Override
    public String toString() {
        return "User Info\n" + "Name: " + firstName + " " + lastName + "\n" +
                "Email: " + email + "\n" +
                "Date Of Birth: " + dateOfBirth + "\n" +
                "Phone Number: " + phoneNumber + "\n" +
                "Gender: " + gender + "\n";
    }
}

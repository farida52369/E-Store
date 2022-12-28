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
    private Boolean isManager;

    @Override
    public String toString() {
        return "User Info\n" + "Name: " + firstName + " " + lastName + "\nEmail: "
                + email + "\nDate Of Birth: " + dateOfBirth + "\nPhone Number: "
                + phoneNumber + "\nGender: " + gender + "\nIs Manager: " + isManager + "\n";
    }
}

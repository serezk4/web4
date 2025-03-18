package se.ifmo.account.controller.response.user;

import lombok.Value;
import se.ifmo.account.security.auth.model.CustomUserDetails;

@Value
public class UserDetailsResponse {
    CustomUserDetails userDetails;
}

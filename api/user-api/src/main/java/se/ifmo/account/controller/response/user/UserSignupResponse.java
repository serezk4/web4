package se.ifmo.account.controller.response.user;

import lombok.Value;
import se.ifmo.account.controller.request.user.UserSignupRequest;

import java.io.Serializable;

/**
 * Registration response for {@link UserSignupRequest}
 *
 * @version 1.0
 * @since 1.0
 */

@Value
public class UserSignupResponse implements Serializable {
    String username;
}

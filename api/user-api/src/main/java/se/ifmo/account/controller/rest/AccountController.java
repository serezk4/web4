package se.ifmo.account.controller.rest;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.log4j.Log4j2;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;
import se.ifmo.account.controller.response.ApiResponse;
import se.ifmo.account.controller.response.user.UserDetailsResponse;
import se.ifmo.account.controller.response.user.UserSecurityDetailsResponse;
import se.ifmo.account.security.auth.model.CustomUserDetails;

@RestController
@RequestMapping("/info")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Validated
@Log4j2
public class AccountController {
    UsersResource usersResource;
    RealmResource realmResource;

    @GetMapping("/me")
    public Mono<ResponseEntity<ApiResponse.Body<UserDetailsResponse>>> me(
            final @AuthenticationPrincipal Mono<CustomUserDetails> userDetails
    ) {
        return userDetails.map(UserDetailsResponse::new).map(ApiResponse::ok);
    }

    @GetMapping("/me/security")
    public Mono<ResponseEntity<ApiResponse.Body<UserSecurityDetailsResponse>>> security(
            final @AuthenticationPrincipal Mono<CustomUserDetails> userDetails
    ) {
        return userDetails
                .map(user -> usersResource.get(user.getSub()))
                .map(user -> ApiResponse.ok(
                        new UserSecurityDetailsResponse(
                                user.getUserSessions(),
                                user.credentials().stream()
                                        .map(UserSecurityDetailsResponse.CredentialsDto::new)
                                        .toList()
                        ))
                );
    }
}


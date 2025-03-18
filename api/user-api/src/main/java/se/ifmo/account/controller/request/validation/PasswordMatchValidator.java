package se.ifmo.account.controller.request.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import se.ifmo.account.controller.request.user.UserSignupRequest;

public class PasswordMatchValidator implements ConstraintValidator<PasswordMatch, UserSignupRequest> {
    @Override
    public boolean isValid(UserSignupRequest request, ConstraintValidatorContext context) {
        return request.getPassword().equals(request.getPasswordRepeat());
    }
}
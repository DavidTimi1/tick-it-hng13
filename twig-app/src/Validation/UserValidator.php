<?php
namespace Devid\TickitTwig\Validation;

class UserValidator {
    public static function validate(array $data): array {
        $errors = [];

        if (empty(trim($data['email'] ?? ''))) {
            $errors['email'] = 'Email is required.';
        } elseif (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = 'Invalid email format.';
        }

        if (empty(trim($data['password'] ?? ''))) {
            $errors['password'] = 'Password is required.';
        } elseif (strlen($data['password']) < 6) {
            $errors['password'] = 'Password must be at least 6 characters.';
        }

        return $errors;
    }
}

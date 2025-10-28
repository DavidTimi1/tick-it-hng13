<?php
namespace Devid\TickitTwig\Controllers;

use Devid\TickitTwig\Models\UserModel;
use Devid\TickitTwig\Validation\UserValidator;

class UserController {
    private UserModel $userModel;

    public function __construct() {
        $this->userModel = new UserModel();
    }

    public function signup(array $data): array {
        $errors = UserValidator::validate($data);
        if (!empty($errors)) {
            return ['success' => false, 'errors' => $errors];
        }

        $email = trim($data['email']);
        $password = trim($data['password']);

        if ($this->userModel->find($email)) {
            return ['success' => false, 'errors' => ['email' => 'Email already exists.']];
        }

        $created = $this->userModel->create($email, $password);
        return ['success' => $created];
    }

    public function login(array $data): array {
        $errors = UserValidator::validate($data);
        if (!empty($errors)) {
            return ['success' => false, 'errors' => $errors];
        }

        $email = trim($data['email']);
        $password = trim($data['password']);

        if ($this->userModel->verify($email, $password)) {
            $_SESSION['user'] = $email;
            return ['success' => true];
        }

        return ['success' => false, 'errors' => ['email' => 'Invalid credentials.']];
    }
}

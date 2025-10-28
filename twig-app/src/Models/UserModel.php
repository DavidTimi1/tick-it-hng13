<?php
namespace Devid\TickitTwig\Models;

class UserModel {
    private string $storageFile;

    public function __construct() {
        $this->storageFile = __DIR__ . '/../../storage/users.json';
        if (!file_exists($this->storageFile)) {
            file_put_contents($this->storageFile, json_encode([]));
        }
    }

    private function loadUsers(): array {
        return json_decode(file_get_contents($this->storageFile), true) ?? [];
    }

    private function saveUsers(array $users): void {
        file_put_contents($this->storageFile, json_encode($users, JSON_PRETTY_PRINT));
    }

    public function create(string $email, string $password): bool {
        $users = $this->loadUsers();

        if (isset($users[$email])) {
            return false; // user already exists
        }

        $users[$email] = [
            'email' => $email,
            'password' => password_hash($password, PASSWORD_BCRYPT),
        ];

        $this->saveUsers($users);
        return true;
    }

    public function find(string $email): ?array {
        $users = $this->loadUsers();
        return $users[$email] ?? null;
    }

    public function verify(string $email, string $password): bool {
        $user = $this->find($email);
        return $user && password_verify($password, $user['password']);
    }
}

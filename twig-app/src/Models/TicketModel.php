<?php
namespace Devid\TickitTwig\Models;

class TicketModel {
    private string $filePath;

    public function __construct(string $filePath = __DIR__ . '/../../storage/tickets.json') {
        $this->filePath = $filePath;

        // Ensure storage file exists
        if (!file_exists($this->filePath)) {
            file_put_contents($this->filePath, json_encode(['users' => []], JSON_PRETTY_PRINT));
        }
    }

    private function readData(): array {
        $json = file_get_contents($this->filePath);
        return json_decode($json, true) ?? ['users' => []];
    }

    private function writeData(array $data): void {
        file_put_contents($this->filePath, json_encode($data, JSON_PRETTY_PRINT));
    }

    public function getUserTickets(string $email): array {
        $data = $this->readData();
        $user = $this->findUser($data, $email);
        return $user['tickets'] ?? [];
    }

    public function saveUserTickets(string $email, array $tickets): void {
        $data = $this->readData();
        $userFound = false;

        foreach ($data['users'] as &$user) {
            if ($user['email'] === $email) {
                $user['tickets'] = $tickets;
                $userFound = true;
                break;
            }
        }

        if (!$userFound) {
            $data['users'][] = [
                'email' => $email,
                'tickets' => $tickets,
            ];
        }

        $this->writeData($data);
    }

    private function findUser(array $data, string $email): ?array {
        foreach ($data['users'] as $user) {
            if ($user['email'] === $email) return $user;
        }
        return null;
    }
}


// class TicketModel {
//     private string $filePath;

//     public function __construct(string $filePath = __DIR__ . '/../../storage/tickets.json') {
//         $this->filePath = $filePath;

//         // Ensure storage file exists
//         if (!file_exists($this->filePath)) {
//             file_put_contents($this->filePath, json_encode(['users' => []], JSON_PRETTY_PRINT));
//         }
//     }

//     private function readData(): array {
//         $json = file_get_contents($this->filePath);
//         return json_decode($json, true) ?? ['users' => []];
//     }

//     private function writeData(array $data): void {
//         file_put_contents($this->filePath, json_encode($data, JSON_PRETTY_PRINT));
//     }

//     public function getUserTickets(string $email): array {
//         $data = $this->readData();
//         $user = $this->findUser($data, $email);
//         return $user['tickets'] ?? [];
//     }

//     public function saveUserTickets(string $email, array $tickets): void {
//         $data = $this->readData();
//         $userFound = false;

//         foreach ($data['users'] as &$user) {
//             if ($user['email'] === $email) {
//                 $user['tickets'] = $tickets;
//                 $userFound = true;
//                 break;
//             }
//         }

//         if (!$userFound) {
//             $data['users'][] = [
//                 'email' => $email,
//                 'tickets' => $tickets,
//             ];
//         }

//         $this->writeData($data);
//     }

//     private function findUser(array $data, string $email): ?array {
//         foreach ($data['users'] as $user) {
//             if ($user['email'] === $email) {
//                 return $user;
//             }
//         }
//         return null;
//     }
// }


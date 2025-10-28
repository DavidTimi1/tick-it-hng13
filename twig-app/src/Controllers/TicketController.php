<?php
namespace Devid\TickitTwig\Controllers;

use Devid\TickitTwig\Models\TicketModel;
use Devid\TickitTwig\Validation\TicketValidator;

class TicketController {
    private TicketModel $model;
    private string $userEmail;

    public function __construct(string $userEmail) {
        $this->model = new TicketModel();
        $this->userEmail = $userEmail;
    }

    public function index(): array {
        return $this->model->getUserTickets($this->userEmail);
    }

    public function getTicketById(int $id): ?array {
        $tickets = $this->model->getUserTickets($this->userEmail);
        foreach ($tickets as $ticket) {
            if ($ticket['id'] === $id) {
                return $ticket;
            }
        }
        return null;
    }

    public function create(array $formData): array {
        $errors = TicketValidator::validate($formData);

        if (!empty($errors)) {
            return ['success' => false, 'errors' => $errors];
        }

        $tickets = $this->model->getUserTickets($this->userEmail);
        $newTicket = [
            'id' => time(),
            'title' => trim($formData['title']),
            'description' => trim($formData['description'] ?? ''),
            'status' => trim($formData['status']),
        ];

        $tickets[] = $newTicket;
        $this->model->saveUserTickets($this->userEmail, $tickets);

        return ['success' => true, 'message' => 'Ticket created successfully'];
    }

    public function update(int $id, array $formData): array {
        $errors = TicketValidator::validate($formData);

        if (!empty($errors)) {
            return ['success' => false, 'errors' => $errors];
        }

        $tickets = $this->model->getUserTickets($this->userEmail);
        $updated = false;

        foreach ($tickets as &$ticket) {
            if ($ticket['id'] === $id) {
                $ticket['title'] = trim($formData['title']);
                $ticket['description'] = trim($formData['description'] ?? '');
                $ticket['status'] = trim($formData['status']);
                $updated = true;
                break;
            }
        }

        if (!$updated) {
            return ['success' => false, 'message' => 'Ticket not found'];
        }

        $this->model->saveUserTickets($this->userEmail, $tickets);
        return ['success' => true, 'message' => 'Ticket updated successfully'];
    }

    public function delete(int $id): array {
        $tickets = $this->model->getUserTickets($this->userEmail);
        $filtered = array_filter($tickets, fn($t) => $t['id'] !== $id);

        $this->model->saveUserTickets($this->userEmail, array_values($filtered));
        return ['success' => true, 'message' => 'Ticket deleted successfully'];
    }
}


// class TicketController {
//     private TicketModel $model;
//     private string $userEmail;

//     public function __construct(string $userEmail) {
//         $this->model = new TicketModel();
//         $this->userEmail = $userEmail;
//     }

//     public function index(): array {
//         return $this->model->getUserTickets($this->userEmail);
//     }

//     public function create(array $formData): array {
//         $errors = TicketValidator::validate($formData);

//         // Description: optional, max 100 chars if provided
//         $description = trim($formData['description'] ?? '');
//         if (!empty($description) && strlen($description) > 100) {
//             $errors[] = 'Description must not exceed 100 characters.';
//         }

//         if (!empty($errors)) {
//             return ['success' => false, 'errors' => $errors];
//         }

//         $tickets = $this->model->getUserTickets($this->userEmail);
//         $newTicket = [
//             'id' => time(),
//             'title' => trim($formData['title']),
//             'description' => $description,
//             'status' => trim($formData['status']),
//         ];

//         $tickets[] = $newTicket;
//         $this->model->saveUserTickets($this->userEmail, $tickets);

//         return ['success' => true, 'message' => 'Ticket created successfully'];
//     }

//     public function update(int $id, array $formData): array {
//         $errors = TicketValidator::validate($formData);

//         // Description: optional, max 100 chars if provided
//         $description = trim($formData['description'] ?? '');
//         if (!empty($description) && strlen($description) > 100) {
//             $errors[] = 'Description must not exceed 100 characters.';
//         }

//         if (!empty($errors)) {
//             return ['success' => false, 'errors' => $errors];
//         }

//         $tickets = $this->model->getUserTickets($this->userEmail);
//         $updated = false;

//         foreach ($tickets as &$ticket) {
//             if ($ticket['id'] === $id) {
//                 $ticket['title'] = trim($formData['title']);
//                 $ticket['description'] = $description;
//                 $ticket['status'] = trim($formData['status']);
//                 $updated = true;
//                 break;
//             }
//         }

//         if (!$updated) {
//             return ['success' => false, 'message' => 'Ticket not found'];
//         }

//         $this->model->saveUserTickets($this->userEmail, $tickets);
//         return ['success' => true, 'message' => 'Ticket updated successfully'];
//     }

//     public function delete(int $id): array {
//         $tickets = $this->model->getUserTickets($this->userEmail);
//         $filtered = array_filter($tickets, fn($t) => $t['id'] !== $id);

//         $this->model->saveUserTickets($this->userEmail, array_values($filtered));
//         return ['success' => true, 'message' => 'Ticket deleted successfully'];
//     }
// }


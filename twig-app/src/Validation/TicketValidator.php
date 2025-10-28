<?php
namespace Devid\TickitTwig\Validation;

class TicketValidator {
    public static function validate(array $data): array {
        $errors = [];

        $title = trim($data['title'] ?? '');
        $description = trim($data['description'] ?? '');
        $status = trim($data['status'] ?? '');

        if ($title === '') {
            $errors['title'] = 'Title is required';
        }

        if ($description !== '' && strlen($description) > 100) {
            $errors['description'] = 'Description must not exceed 100 characters';
        }

        $validStatuses = ['open', 'in_progress', 'closed'];
        if (!in_array($status, $validStatuses, true)) {
            $errors['status'] = 'Invalid status';
        }

        return $errors;
    }
}


// class TicketValidator {
//     public static function validate(array $formData): array {
//         $errors = [];

//         $title = trim($formData['title'] ?? '');
//         $description = trim($formData['description'] ?? '');
//         $status = trim($formData['status'] ?? '');

//         if ($title === '') {
//             $errors['title'] = 'Title is required';
//         } elseif (strlen($title) < 3) {
//             $errors['title'] = 'Title must be at least 3 characters';
//         }

//         if (strlen($description) > 100) {
//             $errors['description'] = 'Description not exceed 100 characters';
//         }

//         if (!in_array($status, ['open', 'in_progress', 'closed'])) {
//             $errors['status'] = 'Invalid status';
//         }

//         return $errors;
//     }
// }

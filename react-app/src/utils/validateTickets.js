export function validateTickets(title, description, status) {
  // Normalize inputs
  const normalizedTitle = title?.trim();
  const normalizedDescription = description?.trim();
  const normalizedStatus = status?.trim();

  // Validation rules
  const MAX_TITLE_LENGTH = 100;
  const MAX_DESCRIPTION_LENGTH = 500;
  const VALID_STATUSES = ["open", "in_progress", "closed"];

  const errors = {
    title: !normalizedTitle
      ? "Title is required"
      : normalizedTitle.length > MAX_TITLE_LENGTH
      ? `Title must be less than ${MAX_TITLE_LENGTH} characters`
      : null,

    description:
      normalizedDescription?.length > MAX_DESCRIPTION_LENGTH
        ? `Description must be less than ${MAX_DESCRIPTION_LENGTH} characters`
        : null,

    status: !normalizedStatus
      ? "Status is required"
      : !VALID_STATUSES.includes(normalizedStatus)
      ? "Invalid status value"
      : null,
  };

  return errors;
}

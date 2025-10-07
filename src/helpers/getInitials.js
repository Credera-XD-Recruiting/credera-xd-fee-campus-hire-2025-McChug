const getInitials = fullName => {
  const parts = fullName.split(' ');
  if (parts.length === 1) {
    return parts[0][0]?.toUpperCase() || '?';
  }
  const firstName = parts[0];
  const lastName = parts[parts.length - 1];
  return `${firstName[0]}${lastName[0]}`.toUpperCase();
};

export default getInitials;

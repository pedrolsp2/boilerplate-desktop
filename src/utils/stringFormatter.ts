export const getInitials = (name: string) => {
  const nameArray = name.split(' ');

  const [firstName, lastName] = [nameArray[0], nameArray[nameArray.length - 1]];

  return nameArray.length > 1 ? `${firstName[0]}${lastName[0]}` : firstName[0];
};

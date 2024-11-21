export const getInitials = (name: string) => {
  if (!name) return null;
  const nameArray = name.split(' ');

  const [firstName, lastName] = [nameArray[0], nameArray[nameArray.length - 1]];

  return nameArray.length > 1 ? `${firstName[0]}${lastName[0]}` : firstName[0];
};

export const getUser = (email: string) => {
  if (!email) return null;
  return email.split('@')[0];
};

export const getInitalName = (name: string) => {
  if (!name) return null;
  const nameArray = name.split(' ');

  const [firstName, secondName] = [
    nameArray[0],
    nameArray[nameArray.length - 1],
  ];
  return nameArray.length > 1 ? `${firstName} ${secondName}` : firstName;
};

export const firstLettlerUper = (text: string) => {
  if (!text) return null;
  return text.charAt(0).toUpperCase() + text.slice(1);
};

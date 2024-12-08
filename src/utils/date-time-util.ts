const convertDate = (date: string): string => {
  return date.split("T")[0];
};

export { convertDate };

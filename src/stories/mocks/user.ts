const getUser = (overrides = {}) => {
  const defaultValues = {
    avatar: "https://i.ibb.co/vYFBKQ4/11.jpg",
    created_at: "Sat, 10 Jul 2021 13:14:28 GMT",
    email: "hossam@outlook.com",
    first_name: "Hossam",
    id: 1,
    job: "software dev",
    last_name: "Okasha",
    full_name: "Hossam Okasha",
    phone: null,
    username: "",
  };
  return Object.assign(defaultValues, overrides);
};
export default getUser;

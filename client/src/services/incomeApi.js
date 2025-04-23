import API from "./api";

export const fetchMonthlyIncome = async (month) => {
  const res = await API.get(`/income?month=${month}`);
  return res.data;
};

export const updateMonthlyIncome = async ({ amount, month }) => {
  const res = await API.post("/income", { amount, month });
  return res.data;
};

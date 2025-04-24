import API from "./api";

export const getCategorySuggestion = async (title) => {
  try {
    const res = await API.post("/ai/categorize", { title });
    return res.data.category;
  } catch (err) {
    console.error("AI Category Error:", err);
    return "Other";
  }
};

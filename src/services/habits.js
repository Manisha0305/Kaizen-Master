import api from "@/lib/api";

export const getHabits = async () => {
  const { data } = await api.get("/habits");
  return data;
};

export const createHabit = async (habit: any) => {
  const { data } = await api.post("/habits", habit);
  return data;
};

export const updateHabit = async (id: number, updates: any) => {
  await api.put(`/habits/${id}`, updates);
};

export const deleteHabitApi = async (id: number) => {
  await api.delete(`/habits/${id}`);
};

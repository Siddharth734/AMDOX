export const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-US", { month:"short", day:"numeric", year:"numeric" });

export const formatRelative = (d: string) => {
  const diff = Date.now() - new Date(d).getTime();
  const mins  = Math.floor(diff / 60000);
  if (mins < 60)  return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24)   return `${hrs}h ago`;
  return formatDate(d);
};

export const isOverdue = (dueDate: string) => new Date(dueDate) < new Date();

export const getDaysUntil = (dueDate: string) =>
  Math.ceil((new Date(dueDate).getTime() - Date.now()) / 86400000);

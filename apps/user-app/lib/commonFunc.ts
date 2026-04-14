export const convertModernDate = (txnDate: string) => {
  if (!txnDate) return "";

  const [day, month, year] = txnDate.split("/");

  const date = new Date(`${year}-${month}-${day}`);

  return date
    .toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    })
    .replace(",", "");
};
export const convertModernTime = (txnTime: string) => {
  if (!txnTime) return "";

  const [hours, minutes] = txnTime.split(":");

  const date = new Date();
  date.setHours(Number(hours));
  date.setMinutes(Number(minutes));

  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

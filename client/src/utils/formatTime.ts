export const formatTime = (minutes: number | undefined) => {
  if (!minutes) return "";
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours > 0 && mins > 0) {
    return `${hours}ч ${mins}мин`;
  } else if (hours > 0) {
    return `${hours}ч`;
  } else {
    return `${mins}мин`;
  }
};
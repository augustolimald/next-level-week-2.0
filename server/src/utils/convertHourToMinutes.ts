export default function convertHourToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return minutes + hours * 60;
}
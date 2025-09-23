const classes = [
  "bg-amber-500",
  "bg-rose-500",
  "bg-indigo-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-pink-500",
  "bg-purple-500",
  "bg-blue-500",
  "bg-red-500",
  "bg-teal-500",
  "bg-cyan-500",
  "bg-lime-500"
];

function hashString(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i);
  return Math.abs(h);
}

export function randomColor(seed: string) {
  if (!seed) return classes[0];
  const idx = hashString(seed.toString()) % classes.length;
  return classes[idx];
}

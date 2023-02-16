export default function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

export default function geneartePermitCode() {
  // Generate a random code of length 6
  const code = Math.random().toString(36).substring(2, 8);
  return code;
}

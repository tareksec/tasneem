import bcrypt from "bcryptjs";

/**
 * Hash a plain-text password using bcrypt with salt rounds = 10
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * Verify a plain-text password against a bcrypt hashed password
 */
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  if (!password || !hashedPassword) return false;
  return bcrypt.compare(password, hashedPassword);
}
